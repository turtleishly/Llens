import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Confetti from "react-confetti";
import { GuidedFlash } from "@/components/llens/GuidedFlash";
import { getLlensWorker, isLlensModelReady, preloadLlensModel } from "@/workers/llensWorkerSingleton";

const fallbackTokenize = (value: string) => value.match(/\s+|[^\s]+/g) ?? [];

type QuestRule = "append-any" | "min-token-increase" | "high-temperature-run";

type Quest = {
  id: string;
  title: string;
  prompt: string;
  objective: string;
  sampleGeneration: string;
  explanation: string;
  maxNewTokens: number;
  temperature: number;
  rule: QuestRule;
  minTokenIncrease?: number;
};

type GuideStep = {
  id: string;
  target:
    | "generate"
    | "tokens"
    | "temperature"
    | "interactiveTokens"
    | "topKPredictions"
    | "examples";
  text: string;
};

const quests: Quest[] = [
  {
    id: "first-step",
    title: "Example 1",
    prompt: "User: What is the Date today?\n\nAssistant:",
    objective: "How to get a chatbot and not an autocomplete?",
    sampleGeneration: "",
    explanation:
      "This is how the usual chatbots you chat with are made! They have special <User> and <Assistant> tokens that are hidden away from you! ",
    maxNewTokens: 10,
    temperature: 0,
    rule: "append-any",
  },
  {
    id: "longer-continuation",
    title: "Example 2",
    prompt: "User: How many of the letter r are there in the word 'strawberry'?\nAssistant: There are",
    objective: "How many R's in strawberry?",
    sampleGeneration: "",
    explanation:
      "Models struggle with this because remember, they actually just see integers! They don't inherently understand that the words they know are composed of letters!",
    maxNewTokens: 10,
    temperature: 0,
    rule: "min-token-increase",
    minTokenIncrease: 3,
  },
  {
    id: "temperature-shift",
    title: "Example 3",
    prompt: "When Adam and Kon went to the store, Adam gave the bag to",
    objective: "Are they just saying common sentences? Are they just memorizing their training data?",
    sampleGeneration: "",
    explanation:
      "No! The model isn't just memorizing! It actually learnt an algorithm to identify the indirect object in the sentence! Try this with different names!",
    maxNewTokens: 1,
    temperature: 0,
    rule: "high-temperature-run",
  },
];

const guideSteps: GuideStep[] = [
  {
    id: "guide-generate",
    target: "generate",
    text: "The model we've loaded is a very simple (dumb!) version of ChatGPT. It is only good at autocompleting sentences for now. Try pressing Generate!",
  },
  {
    id: "guide-tokens",
    target: "tokens",
    text: "This is the number of tokens to generate in one go! Try generating 5 tokens at once.",
  },
  {
    id: "guide-temperature",
    target: "temperature",
    text: "temperature is the fancy name we gave to \"randomness\". The closer this number is to 1, the more random the model will be. So far, we've been generating with temperature 0, meaning we ALWAYS take the most probable token. Try generating 1 token with temperature 0 (You WILL see `Podesta` being generated! )",
  },
  {
    id: "guide-temperature-random",
    target: "temperature",
    text: "Now try generating 10 tokens with temperature 1!",
  },
  {
    id: "guide-interactive-tokens",
    target: "interactiveTokens",
    text: "Now click through some of the tokens you just generated with temperature 1, you'll find that the next generated token doesn't always match the most confident token!",
  },
  {
    id: "guide-mismatch-found",
    target: "topKPredictions",
    text: "There, you found it!",
  },
  {
    id: "guide-examples",
    target: "examples",
    text: "load some of our interesting examples if you want some inspiration!",
  },
];

export default function LlensHome() {
  const [isTopBarHidden, setIsTopBarHidden] = useState(false);
  const [text, setText] = useState("Barack");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [predictions, setPredictions] = useState<{ token: string; prob: number }[]>([]);
  const [tokens, setTokens] = useState<string[]>(fallbackTokenize(text));
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [maxNewTokens, setMaxNewTokens] = useState(1);
  const [temperature, setTemperature] = useState(0.0);
  const [tokensError, setTokensError] = useState<string | null>(null);
  const [tempError, setTempError] = useState<string | null>(null);
  const [activeQuestId, setActiveQuestId] = useState<string>(quests[0].id);
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiSize, setConfettiSize] = useState({ width: 0, height: 0 });
  const [newTokenStartIndex, setNewTokenStartIndex] = useState<number | null>(null);
  const [activeExplanationQuestId, setActiveExplanationQuestId] = useState<string | null>(null);
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  const [flashingExplanationQuestId, setFlashingExplanationQuestId] = useState<string | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(true);
  const [guideStepIndex, setGuideStepIndex] = useState(0);
  const [guideMismatchDetails, setGuideMismatchDetails] = useState<{
    generatedToken: string;
    topProbabilityToken: string;
  } | null>(null);
  const [guidePosition, setGuidePosition] = useState<{
    top: number;
    left: number;
    width: number;
    arrowLeft: number;
    arrowDirection: "up" | "down";
  } | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const generateGuideTargetRef = useRef<HTMLDivElement | null>(null);
  const tokensGuideTargetRef = useRef<HTMLDivElement | null>(null);
  const temperatureGuideTargetRef = useRef<HTMLDivElement | null>(null);
  const interactiveTokensGuideTargetRef = useRef<HTMLDivElement | null>(null);
  const topKGuideTargetRef = useRef<HTMLDivElement | null>(null);
  const examplesGuideTargetRef = useRef<HTMLDivElement | null>(null);
  const [activeGuideFlashId, setActiveGuideFlashId] = useState<string | null>(null);
  const pendingGuideMismatchRef = useRef<{ expectedNextToken: string } | null>(null);
  const isGuideOpenRef = useRef(isGuideOpen);
  const currentGuideStepIdRef = useRef<string | null>(guideSteps[0]?.id ?? null);
  const generationRequestRef = useRef<{
    inputText: string;
    inputTokenCount: number;
    questId: string | null;
    temperatureAtRun: number;
  } | null>(null);

  const tokensMemo = useMemo(() => tokens, [tokens]);

  const createWorker = () => {
    const worker = getLlensWorker();

    const requestLatestPredictions = (nextTokenIds: number[]) => {
      if (nextTokenIds.length === 0) {
        setSelectedIndex(null);
        setPredictions([]);
        return;
      }

      setSelectedIndex(nextTokenIds.length - 1);
      setIsWorking(true);
      worker.postMessage({ type: "predict", tokenIds: nextTokenIds, k: 5 });
    };

    const handler = (event: MessageEvent) => {
      const message = event.data as
        | { type: "ready" }
        | { type: "tokenized"; tokens: string[]; tokenIds: number[] }
        | { type: "predictions"; predictions: { token: string; prob: number }[] }
        | { type: "generated"; text: string; tokens: string[]; tokenIds: number[] }
        | { type: "error"; message: string };

      if (message.type === "ready") {
        setIsModelReady(true);
        setIsModelLoading(false);
        setErrorMessage(null);
        worker.postMessage({ type: "tokenize", text });
        return;
      }

      if (message.type === "tokenized") {
        setTokens(message.tokens);
        setTokenIds(message.tokenIds);
        requestLatestPredictions(message.tokenIds);
        return;
      }

      if (message.type === "predictions") {
        setPredictions(message.predictions);
        setIsWorking(false);

        if (
          isGuideOpenRef.current &&
          currentGuideStepIdRef.current === "guide-interactive-tokens" &&
          pendingGuideMismatchRef.current
        ) {
          const expected = pendingGuideMismatchRef.current.expectedNextToken;
          const predictedTop = message.predictions[0]?.token ?? "";

          if (predictedTop !== expected) {
            setGuideMismatchDetails({
              generatedToken: expected,
              topProbabilityToken: predictedTop,
            });
            setShowConfetti(true);
            window.setTimeout(() => setShowConfetti(false), 2200);
            setGuideStepIndex(5);
          }

          pendingGuideMismatchRef.current = null;
        }

        return;
      }

      if (message.type === "generated") {
        setText(message.text);
        setTokens(message.tokens);
        setTokenIds(message.tokenIds);
        requestLatestPredictions(message.tokenIds);

        // Flash the newly generated token chips during the guide phase
        if (isGuideOpenRef.current && generationRequestRef.current) {
          const startIdx = generationRequestRef.current.inputTokenCount;
          const newCount = message.tokens.length - startIdx;
          const startFlash = () => {
            setNewTokenStartIndex(startIdx);
            window.setTimeout(
              () => setNewTokenStartIndex(null),
              // keep state alive long enough for staggered animations to finish
              1200 + newCount * 150,
            );
          };

          const target = interactiveTokensGuideTargetRef.current;
          const rect = target?.getBoundingClientRect();
          const isVisible = !!rect && rect.top >= 0 && rect.bottom <= window.innerHeight;

          if (target && !isVisible) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            window.setTimeout(startFlash, 280);
          } else {
            startFlash();
          }
        }

        generationRequestRef.current = null;
        return;
      }

      if (message.type === "error") {
        setErrorMessage(message.message);
        setIsModelLoading(false);
        setIsWorking(false);
      }
    };

    worker.addEventListener("message", handler);
    workerRef.current = worker;
    return { worker, handler };
  };

  useEffect(() => {
    const syncWindowSize = () => {
      setConfettiSize({ width: window.innerWidth, height: window.innerHeight });
    };

    syncWindowSize();
    window.addEventListener("resize", syncWindowSize);

    const hideTimeout = window.setTimeout(() => {
      setIsTopBarHidden(true);
    }, 1200);

    const { worker, handler } = createWorker();

    if (isLlensModelReady()) {
      // Model already loaded while on the start screen — skip the wait
      setIsModelReady(true);
      setIsModelLoading(false);
      worker.postMessage({ type: "tokenize", text });
    } else {
      setIsModelLoading(true);
      preloadLlensModel(); // no-op if already requested
    }

    return () => {
      window.removeEventListener("resize", syncWindowSize);
      window.clearTimeout(hideTimeout);
      // Don't terminate — worker is shared; just detach our listener
      worker.removeEventListener("message", handler);
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isModelReady || !workerRef.current) {
      setTokens(fallbackTokenize(text));
      return;
    }

    const timeout = window.setTimeout(() => {
      workerRef.current?.postMessage({ type: "tokenize", text });
    }, 150);

    return () => window.clearTimeout(timeout);
  }, [text, isModelReady]);

  useEffect(() => {
    isGuideOpenRef.current = isGuideOpen;
    currentGuideStepIdRef.current = isGuideOpen ? guideSteps[guideStepIndex]?.id ?? null : null;
  }, [isGuideOpen, guideStepIndex]);

  useEffect(() => {
    if (!isGuideOpen) {
      setActiveGuideFlashId(null);
      return;
    }

    const currentStep = guideSteps[guideStepIndex];
    if (!currentStep) {
      setActiveGuideFlashId(null);
      return;
    }

    // Set active flash without scrolling - will continuously flash
    setActiveGuideFlashId(currentStep.target);
  }, [guideStepIndex, isGuideOpen]);

  useEffect(() => {
    if (!isGuideOpen) return;

    const currentStep = guideSteps[guideStepIndex];
    if (!currentStep) return;

    const updateGuidePosition = () => {
      const viewportWidth = window.innerWidth;
      const popupWidth = Math.min(360, Math.max(260, viewportWidth - 24));
      const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

      if (currentStep.target === "generate") {
        const rect = generateGuideTargetRef.current?.getBoundingClientRect();
        if (!rect) {
          setGuidePosition(null);
          return;
        }

        const targetCenterX = rect.left + rect.width / 2;
        const left = clamp(targetCenterX - popupWidth / 2, 12, viewportWidth - popupWidth - 12);
        const arrowLeft = clamp(targetCenterX - left, 18, popupWidth - 18);

        setGuidePosition({
          top: Math.max(12, rect.top - 190),
          left,
          width: popupWidth,
          arrowLeft,
          arrowDirection: "down",
        });
        return;
      }

      if (currentStep.target === "tokens") {
        const rect = tokensGuideTargetRef.current?.getBoundingClientRect();
        if (!rect) {
          setGuidePosition(null);
          return;
        }

        const targetCenterX = rect.left + rect.width / 2;
        const left = clamp(targetCenterX - popupWidth / 2, 12, viewportWidth - popupWidth - 12);
        const arrowLeft = clamp(targetCenterX - left, 18, popupWidth - 18);

        setGuidePosition({
          top: Math.max(12, rect.top - 180),
          left,
          width: popupWidth,
          arrowLeft,
          arrowDirection: "down",
        });
        return;
      }

      if (currentStep.target === "temperature") {
        const rect = temperatureGuideTargetRef.current?.getBoundingClientRect();
        if (!rect) {
          setGuidePosition(null);
          return;
        }

        const targetCenterX = rect.left + rect.width / 2;
        const left = clamp(targetCenterX - popupWidth / 2, 12, viewportWidth - popupWidth - 12);
        const arrowLeft = clamp(targetCenterX - left, 18, popupWidth - 18);

        setGuidePosition({
          top: Math.max(12, rect.top - 230),
          left,
          width: popupWidth,
          arrowLeft,
          arrowDirection: "down",
        });
        return;
      }

      if (currentStep.target === "interactiveTokens") {
        const rect = interactiveTokensGuideTargetRef.current?.getBoundingClientRect();
        if (!rect) {
          setGuidePosition(null);
          return;
        }

        const targetCenterX = rect.left + rect.width / 2;
        const left = clamp(targetCenterX - popupWidth / 2, 12, viewportWidth - popupWidth - 12);
        const arrowLeft = clamp(targetCenterX - left, 18, popupWidth - 18);

        setGuidePosition({
          top: Math.max(12, rect.top - 180),
          left,
          width: popupWidth,
          arrowLeft,
          arrowDirection: "down",
        });
        return;
      }

      if (currentStep.target === "topKPredictions") {
        const rect = topKGuideTargetRef.current?.getBoundingClientRect();
        if (!rect) {
          setGuidePosition(null);
          return;
        }

        const targetCenterX = rect.left + rect.width / 2;
        const left = clamp(targetCenterX - popupWidth / 2, 12, viewportWidth - popupWidth - 12);
        const arrowLeft = clamp(targetCenterX - left, 18, popupWidth - 18);

        setGuidePosition({
          top: Math.max(12, rect.top - 170),
          left,
          width: popupWidth,
          arrowLeft,
          arrowDirection: "down",
        });
        return;
      }

      if (currentStep.target === "examples") {
        const rect = examplesGuideTargetRef.current?.getBoundingClientRect();
        if (!rect) {
          setGuidePosition(null);
          return;
        }

        const targetCenterX = rect.left + rect.width / 2;
        const left = clamp(targetCenterX - popupWidth / 2, 12, viewportWidth - popupWidth - 12);
        const arrowLeft = clamp(targetCenterX - left, 18, popupWidth - 18);

        setGuidePosition({
          top: Math.min(window.innerHeight - 180, rect.bottom + 14),
          left,
          width: popupWidth,
          arrowLeft,
          arrowDirection: "up",
        });
      }
    };

    updateGuidePosition();
    window.addEventListener("resize", updateGuidePosition);
    window.addEventListener("scroll", updateGuidePosition, true);

    return () => {
      window.removeEventListener("resize", updateGuidePosition);
      window.removeEventListener("scroll", updateGuidePosition, true);
    };
  }, [isGuideOpen, guideStepIndex]);

  const handleGenerate = () => {
    if (!workerRef.current || !isModelReady) return;

    if (isGuideOpen && currentGuideStep?.id === "guide-generate") {
      setMaxNewTokens(5);
      setGuideStepIndex(1);
    }

    if (isGuideOpen && currentGuideStep?.id === "guide-tokens" && maxNewTokens === 5) {
      setMaxNewTokens(1);
      setTemperature(0);
      setGuideStepIndex(2);
    }

    if (
      isGuideOpen &&
      currentGuideStep?.id === "guide-temperature" &&
      maxNewTokens === 1 &&
      temperature === 0
    ) {
      setMaxNewTokens(10);
      setTemperature(1);
      setGuideStepIndex(3);
    }

    if (
      isGuideOpen &&
      currentGuideStep?.id === "guide-temperature-random" &&
      maxNewTokens === 10 &&
      temperature === 1
    ) {
      setGuideStepIndex(4);
    }

    setIsWorking(true);
    generationRequestRef.current = {
      inputText: text,
      inputTokenCount: tokenIds.length,
      questId: activeQuestId,
      temperatureAtRun: temperature,
    };
    const clampedTokens = Math.max(1, Math.min(20, maxNewTokens || 1));
    workerRef.current.postMessage({ type: "generate", text, maxNewTokens: clampedTokens, temperature });
  };

  const handleActivateQuest = (quest: Quest) => {
    setActiveQuestId(quest.id);
    setCompletedQuestIds((current) => {
      if (current.includes(quest.id)) return current;
      return [...current, quest.id];
    });
    setText(quest.prompt);
    setMaxNewTokens(quest.maxNewTokens);
    setTemperature(quest.temperature);
    setSelectedIndex(null);
    setPredictions([]);

    // Flash the View Explanation button 3 times
    setFlashingExplanationQuestId(quest.id);
    window.setTimeout(() => setFlashingExplanationQuestId(null), 3300); // 3 flashes at ~1.1s each
  };


  const handleTokenClick = (index: number) => {
    if (isGuideOpen && currentGuideStep?.id === "guide-interactive-tokens") {
      const nextToken = tokensMemo[index + 1];
      if (nextToken) {
        pendingGuideMismatchRef.current = { expectedNextToken: nextToken };
      }
    }

    setSelectedIndex(index);
    if (!workerRef.current || !isModelReady || tokenIds.length === 0) {
      setPredictions([]);
      return;
    }
    setIsWorking(true);
    const contextIds = tokenIds.slice(0, index + 1);
    workerRef.current.postMessage({ type: "predict", tokenIds: contextIds, k: 5 });
  };

  const handleRetry = () => {
    if (!workerRef.current || isModelLoading) return;
    setIsModelLoading(true);
    setErrorMessage(null);
    workerRef.current.postMessage({ type: "load" });
  };

  const renderTokenContent = (token: string) => {
    return Array.from(token).map((char, index) => {
      if (char === " ") {
        return (
          <span
            key={`space-${index}`}
            className="inline-block h-2.5 w-2.5 rounded-full bg-orange-200 ring-1 ring-orange-300/70"
            aria-hidden="true"
          />
        );
      }

      if (char === "\n") {
        return (
          <span
            key={`newline-${index}`}
            className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-orange-100 text-orange-600 ring-1 ring-orange-200"
            aria-label="newline"
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3">
              <path
                d="M6 8h8a4 4 0 0 1 0 8H9m0 0 3-3m-3 3 3 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        );
      }

      if (char === "\t") {
        return (
          <span
            key={`tab-${index}`}
            className="inline-flex items-center text-[10px] font-semibold text-orange-400"
          >
            ⇥
          </span>
        );
      }

      return (
        <span key={`char-${index}`} className="text-foreground">
          {char}
        </span>
      );
    });
  };

  const selectedToken = selectedIndex === null ? null : tokensMemo[selectedIndex];
  const selectedContext = selectedIndex === null ? "" : tokensMemo.slice(0, selectedIndex + 1).join("");
  const activeQuest = quests.find((quest) => quest.id === activeQuestId) ?? quests[0];
  const currentGuideStep = isGuideOpen ? guideSteps[guideStepIndex] : null;
  const activeExplanationQuest = activeExplanationQuestId
    ? quests.find((quest) => quest.id === activeExplanationQuestId) ?? null
    : null;

  const isGenerateGuideStepActive = currentGuideStep?.target === "generate";
  const isTokensGuideStepActive = currentGuideStep?.target === "tokens";
  const isTemperatureGuideStepActive = currentGuideStep?.target === "temperature";
  const isInteractiveTokensGuideStepActive = currentGuideStep?.target === "interactiveTokens";
  const isTopKGuideStepActive = currentGuideStep?.target === "topKPredictions";
  const isGuideLocked = isGuideOpen;
  const isQuestBarActive = !isGuideOpen;
  const isGuideGenerateStep =
    currentGuideStep?.id === "guide-generate" ||
    currentGuideStep?.id === "guide-tokens" ||
    currentGuideStep?.id === "guide-temperature" ||
    currentGuideStep?.id === "guide-temperature-random";

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Override guide-flash animation to repeat infinitely for LlensHome only */}
      <style>{`
        .min-h-screen .animate-guide-flash {
          animation: guide-flash 1.2s ease-out infinite;
        }
      `}</style>
      
      {showConfetti && confettiSize.width > 0 && confettiSize.height > 0 && (
        <Confetti
          width={confettiSize.width}
          height={confettiSize.height}
          recycle={false}
          numberOfPieces={220}
          gravity={0.24}
        />
      )}

      <div className="fixed top-0 left-0 right-0 z-30 h-14 group">
        <div
          className={`absolute top-0 left-0 right-0 transition-transform duration-700 ${
            isTopBarHidden ? "-translate-y-full" : "translate-y-0"
          } group-hover:translate-y-0`}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link
              to="/"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground"
            >
              LLens
            </Link>
            {isGuideOpen && (
              <button
                type="button"
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => { setGuideStepIndex(guideSteps.length - 1); }}
              >
                Skip Guide
              </button>
            )}
          </div>
          <div className="h-px w-full bg-border" />
        </div>
      </div>

      <main className="relative">
        <section className="pt-20 pb-6 px-4 md:px-6">
          <div className="container max-w-6xl mx-auto">
            <GuidedFlash
              ref={examplesGuideTargetRef}
              isActive={isGuideOpen && activeGuideFlashId === "examples"}
              className="rounded-3xl"
            >
              <div className="rounded-3xl border border-border/60 bg-card/80 p-4 md:p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-lg md:text-xl font-semibold">Examples</h2>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {completedQuestIds.length}/{quests.length} completed
                </span>
              </div>

              <div className={`overflow-x-auto pb-1 transition ${isQuestBarActive ? "" : "opacity-70"}`}>
                <div className="flex min-w-max gap-3">
                  {quests.map((quest) => {
                    const isActive = quest.id === activeQuest.id;
                    const isCompleted = completedQuestIds.includes(quest.id);

                    return (
                      <div
                        key={quest.id}
                        className={`w-[280px] rounded-2xl border p-4 transition ${
                          isCompleted
                            ? "border-emerald-300/60 bg-emerald-100/50 dark:border-emerald-500/40 dark:bg-emerald-900/20"
                            : isActive
                              ? "border-primary/50 bg-primary/5"
                              : "border-border/60 bg-background/50"
                        }`}
                      >
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <h3 className="text-sm font-semibold text-foreground">{quest.title}</h3>
                          {isCompleted && (
                            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
                              (DONE)
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground">{quest.objective}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{quest.sampleGeneration}</p>

                        <div className="mt-3 flex items-center gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant={isActive ? "default" : "outline"}
                            disabled={!isQuestBarActive}
                            onClick={() => handleActivateQuest(quest)}
                          >
                            Load Example
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            disabled={!isQuestBarActive}
                            onClick={() => {
                              setActiveExplanationQuestId(quest.id);
                              setIsExplanationOpen(true);
                            }}
                            className={flashingExplanationQuestId === quest.id ? "animate-guide-flash-token" : ""}
                            style={flashingExplanationQuestId === quest.id ? { animationIterationCount: 3 } : undefined}
                          >
                            View Explanation
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              </div>
            </GuidedFlash>
          </div>
        </section>

        <section className="px-4 md:px-6 pb-24">
          <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-3xl border border-border/60 bg-card/80 p-6 md:p-8 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <h2 className="text-xl md:text-2xl font-semibold">Step 1 — Input</h2>
                    <div className="flex items-center gap-3 flex-wrap">
                      <GuidedFlash
                        ref={tokensGuideTargetRef}
                        isActive={isGuideOpen && activeGuideFlashId === "tokens"}
                        className={isTokensGuideStepActive ? "rounded-lg ring-2 ring-primary/80 ring-offset-2 ring-offset-background" : "rounded-lg"}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Tokens</span>
                            <Input
                              type="number"
                              min={1}
                              max={20}
                              value={maxNewTokens === 0 ? "" : maxNewTokens}
                              onChange={(event) => {
                                const raw = event.target.value;
                                const val = raw === "" ? 0 : Number(raw);
                                setMaxNewTokens(val);
                                if (raw === "" || val < 1) setTokensError("Enter a value between 1 and 20");
                                else if (val > 20) setTokensError("Max is 20 tokens");
                                else setTokensError(null);
                              }}
                              disabled={isGuideLocked}
                              className={`w-20 text-center ${tokensError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                            />
                          </div>
                          {tokensError && <p className="text-[11px] text-destructive">{tokensError}</p>}
                        </div>
                      </GuidedFlash>
                      <GuidedFlash
                        ref={temperatureGuideTargetRef}
                        isActive={isGuideOpen && activeGuideFlashId === "temperature"}
                        className={isTemperatureGuideStepActive ? "rounded-lg ring-2 ring-primary/80 ring-offset-2 ring-offset-background" : "rounded-lg"}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Temp</span>
                            <Input
                              type="number"
                              min={0}
                              max={1}
                              step={0.05}
                              value={temperature}
                              disabled={isGuideLocked}
                              onChange={(event) => {
                                const next = Number(event.target.value);
                                if (Number.isNaN(next)) {
                                  setTemperature(0);
                                  setTempError(null);
                                  return;
                                }
                                setTemperature(next);
                                if (next < 0 || next > 1) setTempError("Must be between 0 and 1");
                                else setTempError(null);
                              }}
                              className={`w-20 text-center ${tempError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                            />
                          </div>
                          {tempError && <p className="text-[11px] text-destructive">{tempError}</p>}
                        </div>
                      </GuidedFlash>
                      <GuidedFlash
                        ref={generateGuideTargetRef}
                        isActive={isGuideOpen && activeGuideFlashId === "generate"}
                        className={isGenerateGuideStepActive ? "rounded-full ring-2 ring-primary/80 ring-offset-2 ring-offset-background" : "rounded-full"}
                      >
                        <Button
                          onClick={handleGenerate}
                          disabled={!isModelReady || isWorking || (isGuideOpen && !isGuideGenerateStep) || !!tokensError || !!tempError}
                        >
                          {isWorking ? "Working..." : "Generate"}
                        </Button>
                      </GuidedFlash>
                    </div>
                  </div>
                  <Textarea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    disabled={isGuideLocked}
                    className="min-h-[120px] text-base"
                    placeholder="Type context here..."
                  />
                  <p className="text-sm text-muted-foreground">
                    Tokens are colored and clickable below. The model loads automatically and runs locally in your browser.
                  </p>
                  {errorMessage && (
                    <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                      <p className="mb-2">{errorMessage}</p>
                      <button
                        type="button"
                        className="text-xs uppercase tracking-[0.35em] text-destructive underline"
                        onClick={handleRetry}
                      >
                        Retry loading
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <GuidedFlash
                ref={interactiveTokensGuideTargetRef}
                isActive={isGuideOpen && activeGuideFlashId === "interactiveTokens"}
                className="rounded-3xl"
              >
                <div
                  className={`rounded-3xl border border-border/60 bg-card/80 p-6 md:p-8 shadow-sm ${
                    isInteractiveTokensGuideStepActive
                      ? "ring-2 ring-primary/80 ring-offset-2 ring-offset-background"
                      : ""
                  }`}
                >
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Step 2 — Interactive Tokens</h2>
                <div className="flex flex-wrap gap-1 leading-loose">
                  {tokensMemo.map((token, index) => {
                    const isSelected = index === selectedIndex;
                    const bg = index % 2 === 0 ? "bg-sky-100/70 dark:bg-sky-900/30" : "bg-amber-100/70 dark:bg-amber-900/30";
                    return (
                      <button
                        key={`${token}-${index}`}
                        type="button"
                        disabled={isGuideLocked && !isInteractiveTokensGuideStepActive}
                        onClick={() => handleTokenClick(index)}
                        style={
                          newTokenStartIndex !== null && index >= newTokenStartIndex
                            ? { animationDelay: `${(index - newTokenStartIndex) * 150}ms` }
                            : undefined
                        }
                        className={`rounded-md border px-2 py-1 text-sm font-mono transition ${bg} ${
                          isSelected ? "border-primary text-primary" : "border-border/60 text-foreground"
                        } ${
                          newTokenStartIndex !== null && index >= newTokenStartIndex
                            ? "animate-guide-flash-token"
                            : ""
                        }`}
                      >
                        <span className="inline-flex flex-wrap items-center gap-0.5">
                          {renderTokenContent(token)}
                        </span>
                      </button>
                    );
                  })}
                </div>
                </div>
              </GuidedFlash>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <GuidedFlash
                ref={topKGuideTargetRef}
                isActive={isGuideOpen && activeGuideFlashId === "topKPredictions"}
                className="rounded-3xl"
              >
                <div
                  className={`rounded-3xl border border-border/60 bg-card/80 p-6 md:p-8 shadow-sm ${
                    isTopKGuideStepActive ? "ring-2 ring-primary/80 ring-offset-2 ring-offset-background" : ""
                  }`}
                >
                <h2 className="text-xl md:text-2xl font-semibold mb-2">Step 3 — Top‑5 Predictions</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {selectedIndex === null
                    ? "Click a token to see next‑token probabilities."
                    : `Context ending with “${selectedToken}”`}
                </p>

                {selectedIndex !== null && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 text-xs font-mono text-muted-foreground">
                      {selectedContext}
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-border/60">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/60 text-muted-foreground">
                          <tr>
                            <th className="px-3 py-2 text-left">Rank</th>
                            <th className="px-3 py-2 text-left">Token</th>
                            <th className="px-3 py-2 text-left">Probability</th>
                            <th className="px-3 py-2 text-left">Confidence</th>
                          </tr>
                        </thead>
                        <tbody>
                          {predictions.map((prediction, idx) => (
                            <tr key={`${prediction.token}-${idx}`} className="border-t border-border/60">
                              <td className="px-3 py-2">{idx + 1}</td>
                              <td className="px-3 py-2 font-mono">'{prediction.token}'</td>
                              <td className="px-3 py-2">{(prediction.prob * 100).toFixed(2)}%</td>
                              <td className="px-3 py-2">
                                <div className="h-2 w-full rounded-full bg-muted">
                                  <div
                                    className="h-2 rounded-full bg-primary"
                                    style={{ width: `${Math.round(prediction.prob * 100)}%` }}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                </div>
              </GuidedFlash>
            </div>
          </div>
        </section>
      </main>

      {isExplanationOpen && activeExplanationQuest && (
        <aside className="fixed bottom-4 right-4 z-40 w-[calc(100%-2rem)] max-w-md rounded-2xl border border-orange-700/80 bg-orange-900/95 p-5 text-orange-50 shadow-2xl backdrop-blur">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-orange-200/80">
                Example Insight
              </p>
              <h3 className="text-base font-semibold">{activeExplanationQuest.title}</h3>
            </div>
            <button
              type="button"
              className="text-xs uppercase tracking-[0.3em] text-orange-200/80 hover:text-orange-50"
              onClick={() => setIsExplanationOpen(false)}
            >
              Close
            </button>
          </div>

          <p className="text-sm text-orange-100 leading-relaxed">
            {activeExplanationQuest.explanation}
          </p>
        </aside>
      )}

      {currentGuideStep && guidePosition && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div
            className="absolute pointer-events-auto rounded-2xl border border-primary/40 bg-card p-4 shadow-2xl"
            style={{ top: guidePosition.top, left: guidePosition.left, width: guidePosition.width }}
          >
            <p className="text-sm leading-relaxed text-foreground">{currentGuideStep.text}</p>

            {currentGuideStep.id === "guide-mismatch-found" && guideMismatchDetails && (
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                Notice how `{guideMismatchDetails.generatedToken}` is the generated token, but `{guideMismatchDetails.topProbabilityToken}` is the most probable token! <br /><br /> You're ready to explore on your own now!
              </p>
            )}

            {currentGuideStep.id === "guide-mismatch-found" && (
              <div className="mt-3 flex items-center justify-end">
                <Button type="button" size="sm" onClick={() => setGuideStepIndex(6)}>
                  Next
                </Button>
              </div>
            )}

            {currentGuideStep.id === "guide-examples" && (
              <div className="mt-3 flex items-center justify-end">
                <Button type="button" size="sm" onClick={() => setIsGuideOpen(false)}>
                  Complete
                </Button>
              </div>
            )}

            <div
              className={`absolute h-4 w-4 rotate-45 bg-card ${
                guidePosition.arrowDirection === "up"
                  ? "-top-2 border-l border-t border-primary/40"
                  : "-bottom-2 border-r border-b border-primary/40"
              }`}
              style={{ left: guidePosition.arrowLeft - 8 }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
