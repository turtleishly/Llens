import { AutoModelForCausalLM, AutoTokenizer, env } from "@xenova/transformers";

env.allowLocalModels = false;
env.allowRemoteModels = true;
env.useBrowserCache = true;

type WorkerRequest =
  | { type: "load"; modelId?: string }
  | { type: "tokenize"; text: string }
  | { type: "predict"; tokenIds: number[]; k: number }
  | { type: "generate"; text: string; maxNewTokens: number; temperature: number };

type WorkerResponse =
  | { type: "ready" }
  | { type: "tokenized"; tokens: string[]; tokenIds: number[] }
  | { type: "predictions"; predictions: { token: string; prob: number; tokenId: number }[] }
  | { type: "generated"; text: string; tokens: string[]; tokenIds: number[] }
  | { type: "error"; message: string };

let tokenizer: Awaited<ReturnType<typeof AutoTokenizer.from_pretrained>> | null = null;
let model: Awaited<ReturnType<typeof AutoModelForCausalLM.from_pretrained>> | null = null;
let isLoading = false;

const MODEL_ID = "Xenova/gpt2";

const post = (message: WorkerResponse) => {
  self.postMessage(message);
};

const loadModel = async (modelId = MODEL_ID) => {
  if (tokenizer && model) return;
  if (isLoading) return;
  isLoading = true;
  try {
    tokenizer = await AutoTokenizer.from_pretrained(modelId);
    model = await AutoModelForCausalLM.from_pretrained(modelId);
    post({ type: "ready" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load GPT-2";
    post({ type: "error", message });
  } finally {
    isLoading = false;
  }
};

const tokenizeText = async (text: string) => {
  if (!tokenizer) return;
  const tokenIds = tokenizer.encode(text);
  const tokens = tokenIds.map((id) =>
    tokenizer!.decode([id], { clean_up_tokenization_spaces: false })
  );
  post({ type: "tokenized", tokens, tokenIds });
};

const softmax = (values: Float32Array | number[]) => {
  let max = -Infinity;
  for (const v of values) {
    if (v > max) max = v;
  }

  const exps = new Float32Array(values.length);
  let sum = 0;
  for (let i = 0; i < values.length; i += 1) {
    const exp = Math.exp(values[i] - max);
    exps[i] = exp;
    sum += exp;
  }

  for (let i = 0; i < exps.length; i += 1) {
    exps[i] /= sum;
  }

  return exps;
};

const getTopK = (probs: Float32Array, k: number) => {
  const indices = Array.from(probs.keys());
  indices.sort((a, b) => probs[b] - probs[a]);
  return indices.slice(0, k).map((id) => ({ id, prob: probs[id] }));
};

const predictNextToken = async (tokenIds: number[], k: number) => {
  if (!tokenizer || !model) return;

  const inputText = tokenizer.decode(tokenIds, { clean_up_tokenization_spaces: false });
  const inputs = await tokenizer(inputText, { return_tensors: "np" });
  const outputs = await model.forward(inputs);
  const logits = outputs.logits;

  const vocabSize = logits.dims[2];
  const sequenceLength = logits.dims[1];
  const offset = (sequenceLength - 1) * vocabSize;
  const lastLogits = logits.data.slice(offset, offset + vocabSize) as Float32Array;

  const probs = softmax(lastLogits);
  const top = getTopK(probs, k).map(({ id, prob }) => ({
    tokenId: id,
    token: tokenizer!.decode([id], { clean_up_tokenization_spaces: false }),
    prob,
  }));

  post({ type: "predictions", predictions: top });
};

const sampleFromProbs = (probs: Float32Array) => {
  let total = 0;
  for (let i = 0; i < probs.length; i += 1) {
    total += probs[i];
  }

  if (total <= 0 || Number.isNaN(total)) {
    return 0;
  }

  let threshold = Math.random() * total;
  for (let i = 0; i < probs.length; i += 1) {
    threshold -= probs[i];
    if (threshold <= 0) {
      return i;
    }
  }

  return probs.length - 1;
};

const generateText = async (text: string, maxNewTokens: number, temperature: number) => {
  if (!tokenizer || !model) return;

  const safeTemperature = Number.isFinite(temperature)
    ? Math.min(1, Math.max(0, temperature))
    : 1;
  const contextText = text;
  const inputs = await tokenizer(contextText, { return_tensors: "np" });
  const inputIds = inputs.input_ids;

  const tokenIds: number[] = Array.from(inputIds.data as Int32Array);

  for (let step = 0; step < maxNewTokens; step += 1) {
    const stepInputs = await tokenizer(
      tokenizer.decode(tokenIds, { clean_up_tokenization_spaces: false }),
      { return_tensors: "np" }
    );
    const outputs = await model.forward(stepInputs);
    const logits = outputs.logits;

    const vocabSize = logits.dims[2];
    const sequenceLength = logits.dims[1];
    const offset = (sequenceLength - 1) * vocabSize;
    const lastLogits = logits.data.slice(offset, offset + vocabSize) as Float32Array;

    let nextId: number;
    if (safeTemperature === 0) {
      let maxLogit = -Infinity;
      let maxIndex = 0;
      for (let i = 0; i < lastLogits.length; i += 1) {
        if (lastLogits[i] > maxLogit) {
          maxLogit = lastLogits[i];
          maxIndex = i;
        }
      }
      nextId = maxIndex;
    } else {
      const scaled = new Float32Array(lastLogits.length);
      for (let i = 0; i < lastLogits.length; i += 1) {
        scaled[i] = lastLogits[i] / safeTemperature;
      }

      const probs = softmax(scaled);
      nextId = sampleFromProbs(probs);
    }
    tokenIds.push(nextId);
  }

  const fullText = tokenizer.decode(tokenIds, {
    skip_special_tokens: true,
    clean_up_tokenization_spaces: false,
  });
  const tokens = tokenIds.map((id) =>
    tokenizer!.decode([id], { clean_up_tokenization_spaces: false })
  );

  post({ type: "generated", text: fullText, tokens, tokenIds });
};

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const message = event.data;
  try {
    if (message.type === "load") {
      await loadModel(message.modelId);
      return;
    }

    if (!tokenizer || !model) {
      post({ type: "error", message: "Model not loaded" });
      return;
    }

    if (message.type === "tokenize") {
      await tokenizeText(message.text);
      return;
    }

    if (message.type === "predict") {
      await predictNextToken(message.tokenIds, message.k);
      return;
    }

    if (message.type === "generate") {
      await generateText(message.text, message.maxNewTokens, message.temperature);
    }
  } catch (error) {
    const messageText = error instanceof Error ? error.message : "Unexpected worker error";
    post({ type: "error", message: messageText });
  }
};
