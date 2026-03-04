import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  getLlensWorker,
  isLlensModelReady,
  preloadLlensModel,
} from "@/workers/llensWorkerSingleton";

// Large pool of tokens — everyday words + mechanistic interpretability jargon
const TOKEN_POOL = [
  // Everyday / demo sentences
  "Barack", " Obama", " was", " born", " in", " Hawaii",
  " The", " cat", " sat", " on", " the", " mat",
  " Hello", ",", " world", "!",
  " 1024", " tokens", " per", " second",
  " The", " quick", " brown", " fox",
  " jumps", " over", " the", " lazy", " dog",
  " Once", " upon", " a", " time",
  " To", " be", " or", " not", " to", " be",
  " I", " think", ",", " therefore", " I", " am",
  " in", " a", " galaxy", " far", " far", " away",
  " It", " was", " the", " best", " of", " times",
  // Mechanistic interpretability
  " manifold", " abliteration", " residual", " stream",
  " attention", " head", " layer", " neuron", " activation",
  " embedding", " logit", " lens", " superposition",
  " polysemantic", " monosemantic", " feature", " circuit",
  " sparse", " autoencoder", " probe", " linear",
  " representation", " MLP", " transformer", " softmax",
  " query", " key", " value", " norm", " RMSNorm",
  " LayerNorm", " GELU", " SiLU", " gradient",
  " Jacobian", " eigenvalue", " singular", " value",
  " decomposition", " SVD", " PCA", " UMAP",
  " cosine", " similarity", " orthogonal", " basis",
  " subspace", " direction", " vector", " token",
  " context", " window", " causal", " mask",
  " positional", " encoding", " RoPE", " ALiBi",
  " KV", "-cache", " inference", " logits",
  " probability", " distribution", " entropy",
  " perplexity", " cross-entropy", " loss",
  " backpropagation", " weight", " matrix", " bias",
  " low-rank", " bottleneck", " information", " flow",
  " path", " patching", " activation", " patching",
  " causal", " tracing", " ablation", " knockout",
  " intervention", " faithfulness", " completeness",
  " disentangle", " polarity", " geometry", " topology",
  " Hessian", " Fisher", " KL", " divergence",
  " induction", " head", " copy", " suppression",
  " name-mover", " IOI", " task", " circuit",
  " in-context", " learning", " few-shot", " zero-shot",
  " chain-of-thought", " scratchpad", " CoT",
  " mechanistic", " interpretability", " alignment",
  " steering", " vector", " concept", " direction",
  " representation", " engineering", " probing",
  " dictionary", " learning", " feature", " splitting",
  " absorption", " dead", " neuron", " polysemanticity",
  " capacity", " privileged", " basis",
  " computation", " graph", " weight",
  " GPT", "-4", " Claude", " LLaMA", " Gemini",
  " parameters", " fine-tuning", " RLHF",
  " reward", " model", " policy", " gradient",
  " next", " token", " prediction",
  " dot-product", " attention", " scaled",
  " d_model", " d_ff", " n_heads", " n_layers",
  " vocab", " size", " context", " length",
  " ReLU", " nonlinearity", " residual", " connection",
  " skip", " connection", " pre-norm", " post-norm",
  " zero-ablation", " mean-ablation", " resample",
  " logit", " difference", " direct", " effect",
  " indirect", " effect", " total", " effect",
  " virtual", " weight", " composition",
  " Q-composition", " K-composition", " V-composition",
  " attention", " score", " softmax", " output",
  " OV-circuit", " QK-circuit", " eigenspectrum",
  " activation", " space", " representation",
  " linear", " map", " affine", " transformation",
  " token", " embedding", " positional", " bias",
  " unembedding", " matrix", " W_E", " W_U",
  " frozen", " weights", " adapter", " LoRA",
  " rank", " decomposition", " singular", " vectors",
  " left", " singular", " right", " singular",
  " feature", " geometry", " interference",
  " superposed", " features", " almost-orthogonal",
  " neuron", " basis", " sparse", " coding",
  " compressed", " sensing", " L1", " penalty",
  " sparsity", " coefficient", " top-k", " activation",
];

const DISPLAY_COUNT = 36;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function LlensStart() {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [visibleTokenCount, setVisibleTokenCount] = useState(0);
  const [sampleTokens, setSampleTokens] = useState<string[]>(() =>
    shuffleArray(TOKEN_POOL).slice(0, DISPLAY_COUNT)
  );
  const workerRef = useRef<Worker | null>(null);
  const tickRef = useRef<number | null>(null);

  // Kick off model preload and listen for the "ready" signal
  useEffect(() => {
    if (isLlensModelReady()) {
      setIsReady(true);
      return;
    }

    preloadLlensModel();
    const worker = getLlensWorker();
    workerRef.current = worker;

    const handler = (event: MessageEvent) => {
      if (event.data?.type === "ready") {
        setIsReady(true);
      }
    };

    worker.addEventListener("message", handler);
    return () => {
      worker.removeEventListener("message", handler);
      workerRef.current = null;
    };
  }, []);

  // Drive the token ticker animation while loading
  useEffect(() => {
    if (isReady) {
      setVisibleTokenCount(DISPLAY_COUNT);
      if (tickRef.current !== null) {
        window.clearInterval(tickRef.current);
        tickRef.current = null;
      }
      return;
    }

    // Reset and start ticking
    setVisibleTokenCount(0);
    tickRef.current = window.setInterval(() => {
      setVisibleTokenCount((prev) => {
        const next = prev + 1;
        if (next >= DISPLAY_COUNT) {
          // Reshuffle and loop back to keep animation going with new tokens
          setSampleTokens(shuffleArray(TOKEN_POOL).slice(0, DISPLAY_COUNT));
          return 0;
        }
        return next;
      });
    }, 120);

    return () => {
      if (tickRef.current !== null) {
        window.clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };
  }, [isReady]);

  return (
    <div className="group min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-20 opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            LLens
          </Link>
        </div>
        <div className="h-px w-full bg-border" />
      </div>

      <div className="text-center px-6 max-w-xl w-full space-y-10">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">
            LLens
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            What's happening inside ChatGPT?
          </h1>
        </div>

        {/* Loading indicator */}
        <div
          className={`transition-all duration-700 overflow-hidden ${
            isReady ? "max-h-0 opacity-0" : "max-h-48 opacity-100"
          }`}
        >
          <div className="space-y-4">
            {/* Scrolling token tape */}
            <div className="flex flex-wrap justify-center gap-1.5 min-h-[56px] overflow-hidden rounded-2xl border border-border/60 bg-muted/40 px-4 py-3">
              {sampleTokens.map((token, idx) => (
                <span
                  key={idx}
                  className={`rounded-md border px-2 py-0.5 text-xs font-mono transition-all duration-200 ${
                    idx < visibleTokenCount
                      ? idx % 2 === 0
                        ? "border-sky-300/60 bg-sky-100/70 text-foreground dark:bg-sky-900/30 opacity-100 scale-100"
                        : "border-amber-300/60 bg-amber-100/70 text-foreground dark:bg-amber-900/30 opacity-100 scale-100"
                      : "border-transparent bg-transparent text-transparent opacity-0 scale-90"
                  }`}
                >
                  {token}
                </span>
              ))}
            </div>

            {/* Pulsing status line */}
            <div className="flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Loading model into your browser…
              </p>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          className={`text-lg px-10 py-7 rounded-2xl transition-all duration-500 ${
            isReady ? "opacity-100 scale-100" : "opacity-40 scale-95 cursor-not-allowed"
          }`}
          disabled={!isReady}
          onClick={() => navigate("/llens/chapter-1")}
        >
          {isReady ? "Start" : "Loading…"}
        </Button>
      </div>
    </div>
  );
}
