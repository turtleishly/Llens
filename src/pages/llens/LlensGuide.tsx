import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const fallbackTokenize = (value: string) => value.match(/\s+|[^\s]+/g) ?? [];

const chapters = [
  {
    number: "01",
    title: "Token Foundations",
    summary:
      "Why models split text into pieces and how whitespace changes the story.",
  },
  {
    number: "02",
    title: "How LLM's Generate",
    summary:
      "Next-token prediction and why probability rankings are just the beginning.",
  },
  {
    number: "03",
    title: "Next Token Logic",
    summary:
      "Logits, probabilities, and the choices behind every continuation.",
  },
  {
    number: "04",
    title: "Generation Loops",
    summary:
      "Greedy vs sampling and how decoding shapes the final answer.",
  },
];

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae risus a lacus cursus facilisis. Vivamus laoreet urna at turpis varius, vel finibus ipsum pharetra. Integer semper, nisl ac laoreet facilisis, nisl nunc malesuada ipsum, vitae tincidunt felis turpis vel nisl.";

const tokenSteps = [
  {
    id: "intro",
    title: "Chapter 1: Tokenization",
    body:
      "Tokenization is how models like ChatGPT perceive our world. It may be words to us, but to ChatGPT, they actually just see integers! What's more, tokenization is weird in that if a word starts with a capital or not, it is a different token!\n\n(This is why it may not be so surprising that some models struggle to tell how many R's there are in Strawberry)",
  },
  {
    id: "interactive",
    title: "",
    body: "",
  },
];

const chapterTwoIntro =
  "LLM's generate text by simply looking at the tokens it has, and try to predict the next token! Let's see that in action through a guessing game!";

const chapterTwoContext =
  "When Mary and John went to the store, Mary handed the bag to";

const chapterTwoPredictions = [
  { token: "John", probability: 44.11, confidence: 0.84 },
  { token: "the", probability: 8.89, confidence: 0.24 },
  { token: "them", probability: 7.3, confidence: 0.2 },
  { token: "her", probability: 6.82, confidence: 0.18 },
  { token: "Mary", probability: 4.92, confidence: 0.12 },
];

const confettiPieces = [
  { x: -35, y: -25, rotate: -25, delay: 0, color: "bg-emerald-400", size: "h-2 w-2" },
  { x: 18, y: -32, rotate: 15, delay: 80, color: "bg-amber-300", size: "h-2 w-3" },
  { x: 30, y: -10, rotate: 40, delay: 120, color: "bg-sky-400", size: "h-2 w-2" },
  { x: -22, y: 8, rotate: -50, delay: 160, color: "bg-pink-400", size: "h-2 w-3" },
  { x: 8, y: 18, rotate: 20, delay: 200, color: "bg-indigo-400", size: "h-2 w-2" },
  { x: 36, y: 12, rotate: 65, delay: 240, color: "bg-orange-300", size: "h-2 w-2" },
  { x: -12, y: -18, rotate: -10, delay: 60, color: "bg-lime-400", size: "h-2 w-2" },
  { x: -40, y: 16, rotate: 35, delay: 140, color: "bg-fuchsia-400", size: "h-2 w-3" },
  { x: 2, y: -40, rotate: -35, delay: 100, color: "bg-cyan-300", size: "h-2 w-2" },
  { x: 24, y: 32, rotate: 55, delay: 220, color: "bg-rose-300", size: "h-2 w-2" },
  { x: -18, y: 30, rotate: -60, delay: 260, color: "bg-violet-400", size: "h-2 w-2" },
  { x: 44, y: -6, rotate: 25, delay: 180, color: "bg-yellow-300", size: "h-2 w-3" },
  { x: -28, y: -36, rotate: -5, delay: 40, color: "bg-teal-400", size: "h-2 w-2" },
  { x: 12, y: -20, rotate: 70, delay: 90, color: "bg-blue-400", size: "h-2 w-2" },
  { x: -6, y: 40, rotate: -30, delay: 280, color: "bg-red-400", size: "h-2 w-2" },
  { x: 20, y: -4, rotate: 10, delay: 130, color: "bg-green-400", size: "h-2 w-3" },
  { x: -32, y: 2, rotate: -70, delay: 210, color: "bg-orange-400", size: "h-2 w-2" },
  { x: 6, y: 26, rotate: 35, delay: 170, color: "bg-amber-400", size: "h-2 w-2" },
];

export default function LlensGuide() {
  const [text, setText] = useState("");
  const [tokens, setTokens] = useState<string[]>(fallbackTokenize(text));
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [hasCompletedTask, setHasCompletedTask] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [chapterTwoStep, setChapterTwoStep] = useState(0);
  const workerRef = useRef<Worker | null>(null);

  const tokensMemo = useMemo(() => tokens, [tokens]);
  const chapterTwoTokens = useMemo(() => fallbackTokenize(chapterTwoContext), []);
  const chapterTwoOptions = useMemo(
    () => chapterTwoPredictions.map((prediction) => prediction.token),
    []
  );
  const chapterTwoAnswer = useMemo(() => {
    if (!selectedPrediction) return null;
    return (
      chapterTwoOptions.find((option) => option !== selectedPrediction) ??
      chapterTwoOptions[0]
    );
  }, [chapterTwoOptions, selectedPrediction]);

  const createWorker = () => {
    const worker = new Worker(new URL("../../workers/llens.worker.ts", import.meta.url), {
      type: "module",
    });

    worker.onmessage = (event) => {
      const message = event.data as
        | { type: "ready" }
        | { type: "tokenized"; tokens: string[]; tokenIds: number[] }
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
        return;
      }

      if (message.type === "error") {
        setErrorMessage(message.message);
        setIsModelLoading(false);
      }
    };

    workerRef.current = worker;
    return worker;
  };

  useEffect(() => {
    const worker = createWorker();
    setIsModelLoading(true);
    worker.postMessage({ type: "load" });

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isModelReady || !workerRef.current) {
      setTokens(fallbackTokenize(text));
      setTokenIds([]);
      return;
    }

    const timeout = window.setTimeout(() => {
      workerRef.current?.postMessage({ type: "tokenize", text });
    }, 150);

    return () => window.clearTimeout(timeout);
  }, [text, isModelReady]);

  const currentStep = tokenSteps[stepIndex];
  const isTaskComplete = hasCompletedTask || text === "dog\n dog";

  useEffect(() => {
    if (!hasCompletedTask && text === "dog\n dog") {
      setHasCompletedTask(true);
    }
  }, [hasCompletedTask, text]);

  useEffect(() => {
    if (!isTaskComplete) {
      setShowConfetti(false);
      setConfettiActive(false);
      return;
    }

    setShowConfetti(true);
    setConfettiActive(false);

    const rafId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setConfettiActive(true));
    });

    const timeout = window.setTimeout(() => setShowConfetti(false), 1200);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeout);
    };
  }, [isTaskComplete]);

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-0 left-0 right-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <Link
            to="/"
            className="text-base font-semibold uppercase tracking-[0.35em] text-muted-foreground"
          >
            Rakan Tutor
          </Link>
          <Link
            to="/llens"
            className="text-sm uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition"
          >
            Skip to Playground
          </Link>
        </div>
        <div className="h-px w-full bg-border" />
      </div>

      <div className="h-screen snap-y snap-mandatory overflow-y-auto flex flex-col">
        <section className="relative h-screen shrink-0 snap-start flex items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-transparent" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-8">
            <p className="text-sm uppercase tracking-[0.55em] text-muted-foreground mb-5">
              Guided Exploration
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-7">
              LLens Chapters
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl leading-relaxed mb-12">
              Scroll to move through each chapter. Each section gives a visual cue
              before you jump into the interactive playground.
            </p>

            <div className="grid gap-7 md:grid-cols-2">
              {chapters.map((chapter) => (
                <div
                  key={chapter.number}
                  className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-sm"
                >
                  <p className="text-sm uppercase tracking-[0.45em] text-muted-foreground mb-3">
                    Chapter {chapter.number}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                    {chapter.title}
                  </h2>
                  <p className="text-base text-muted-foreground">{chapter.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {chapters.map((chapter, index) => {
          if (index === 0) {
            return (
              <section
                key={chapter.number}
                className="relative h-screen shrink-0 snap-start flex items-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-background to-transparent" />
                {showConfetti && (
                  <div className="pointer-events-none fixed inset-0 z-50">
                    {confettiPieces.map((piece, idx) => (
                      <span
                        key={`${piece.color}-${idx}`}
                        className={`absolute left-1/2 top-1/2 ${piece.size} ${piece.color} rounded-sm`}
                        style={{
                          opacity: confettiActive ? 1 : 0,
                          transform: confettiActive
                            ? `translate(${piece.x}vw, ${piece.y}vh) rotate(${piece.rotate}deg)`
                            : "translate(0, 0) rotate(0deg)",
                          transition: `transform 900ms ease-out ${piece.delay}ms, opacity 900ms ease-out ${piece.delay}ms`,
                        }}
                      />
                    ))}
                  </div>
                )}
                <div className="relative z-10 mx-auto w-full max-w-7xl px-8">
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                    <div
                      className={`transition-all duration-700 ease-out ${
                        stepIndex === 0
                          ? "lg:basis-full lg:max-w-4xl lg:mx-auto text-center"
                          : "lg:basis-2/5 lg:max-w-none lg:mx-0 text-left"
                      }`}
                    >
                      <p className="text-sm uppercase tracking-[0.45em] text-muted-foreground">
                        Chapter {chapter.number}
                      </p>
                      <h2 className="text-4xl md:text-6xl font-semibold">
                        {chapter.title}
                      </h2>
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {chapter.summary}
                      </p>
                      <div className="relative min-h-[240px]">
                        <div
                          className={`absolute inset-0 transition-all duration-700 ease-out ${
                            stepIndex === 0
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-8 pointer-events-none"
                          }`}
                        >
                          <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm space-y-4">
                            <p className="text-3xl font-semibold text-foreground">
                              {currentStep?.title}
                            </p>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                              {currentStep?.body}
                            </p>
                            <Button
                              size="lg"
                              className="rounded-full px-8"
                              onClick={() => setStepIndex(1)}
                            >
                              Next
                            </Button>
                          </div>
                        </div>

                        <div
                          className={`absolute inset-0 transition-all duration-700 ease-out ${
                            stepIndex === 1
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 translate-x-8 pointer-events-none"
                          }`}
                        >
                          <div className="rounded-2xl bg-black/90 p-6 text-base text-white shadow-sm space-y-4">
                            {isTaskComplete ? (
                              <div className="space-y-3">
                                <p className="text-xl font-semibold">Cool!</p>
                                <p className="text-base text-white/80 leading-relaxed">
                                  Notice how the dog with a space and without a space
                                  are two different tokens?
                                </p>
                                <p className="text-base text-white/80 leading-relaxed">
                                  Continue playing around with the tokenizer to see
                                  how words are tokenized! Try "Rakan tutor", and
                                  see how the model we are using wasn't trained on
                                  Malay text, and hence doesn't support Malay words!
                                </p>
                              </div>
                            ) : (
                              <>
                                <p className="text-sm uppercase tracking-[0.45em] text-white/60">
                                  Task
                                </p>
                                <div className="space-y-2 text-xl font-semibold">
                                  <div className="flex items-center gap-2">
                                    <span>Type</span>
                                    <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-lg">
                                      dog
                                    </span>
                                    <span>(enter)</span>
                                    <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-lg">
                                      (space) dog
                                    </span>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`transition-all duration-700 ease-out lg:basis-3/5 ${
                        stepIndex === 1
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-8 pointer-events-none lg:basis-0 lg:max-w-0 lg:overflow-hidden"
                      }`}
                    >
                      <div className="rounded-3xl border border-border/60 bg-card/90 p-6 md:p-8 shadow-sm space-y-5">
                        <div className="space-y-2">
                          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
                            Interactive Input
                          </p>
                          <textarea
                            className="min-h-[120px] w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
                              Token Visualiser
                            </p>
                            {!isModelReady && (
                              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                {isModelLoading ? "Loading tokenizer" : "Fallback mode"}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {tokensMemo.map((token, idx) => (
                              <span
                                key={`${token}-${idx}`}
                                title={JSON.stringify(token)}
                                className="rounded-xl border border-border/60 bg-background/70 px-3 py-1.5 text-sm"
                              >
                                <span className="inline-flex flex-wrap items-center gap-0.5">
                                  {renderTokenContent(token)}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
                            Integer Representations
                          </p>
                          {tokenIds.length === 0 ? (
                            <p className="text-base text-muted-foreground">
                              Token IDs appear once the tokenizer is ready.
                            </p>
                          ) : (
                            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                              {tokenIds.map((id, idx) => (
                                <div
                                  key={`${id}-${idx}`}
                                  className="rounded-xl border border-border/60 bg-background/70 px-3 py-2 text-sm text-center"
                                >
                                  {id}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {errorMessage && (
                          <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-base text-destructive">
                            <p className="mb-2">{errorMessage}</p>
                            <button
                              type="button"
                              className="text-sm uppercase tracking-[0.4em] text-destructive underline"
                              onClick={handleRetry}
                            >
                              Retry loading
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          if (index === 1) {
            return (
              <section
                key={chapter.number}
                className="relative h-screen shrink-0 snap-start flex items-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-background to-transparent" />
                <div className="relative z-10 mx-auto w-full max-w-7xl px-8">
                  <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
                    <div
                      className={`transition-all duration-700 ease-out ${
                        chapterTwoStep === 0
                          ? "lg:basis-full lg:max-w-4xl lg:mx-auto text-center"
                          : "lg:basis-2/5 lg:max-w-none lg:mx-0 text-left"
                      }`}
                    >
                      <div className="space-y-3">
                        <p className="text-sm uppercase tracking-[0.45em] text-muted-foreground">
                          Chapter {chapter.number}
                        </p>
                        <h2 className="text-4xl md:text-6xl font-semibold">
                          {chapter.title}
                        </h2>
                      </div>

                      <div className="relative min-h-[280px]">
                        <div
                          className={`absolute inset-0 transition-all duration-700 ease-out ${
                            chapterTwoStep === 0
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-8 pointer-events-none"
                          }`}
                        >
                          <div className="rounded-2xl border border-border/60 bg-card/85 p-7 shadow-sm space-y-5">
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                              {chapterTwoIntro}
                            </p>
                            <Button
                              size="lg"
                              className="rounded-full px-8"
                              onClick={() => setChapterTwoStep(1)}
                            >
                              Next
                            </Button>
                          </div>
                        </div>

                        <div
                          className={`absolute inset-0 transition-all duration-700 ease-out ${
                            chapterTwoStep === 1
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 translate-x-8 pointer-events-none"
                          }`}
                        >
                          <div className="rounded-2xl border border-border/60 bg-card/85 p-7 shadow-sm space-y-5">
                            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
                              Question
                            </p>
                            <p className="text-xl font-semibold">
                              Which do you think is the next generated token?
                            </p>
                            <div className="grid gap-3">
                              {chapterTwoOptions.map((option) => (
                                <Button
                                  key={option}
                                  variant={
                                    selectedPrediction === option
                                      ? "default"
                                      : "outline"
                                  }
                                  className="justify-start text-base"
                                  onClick={() => setSelectedPrediction(option)}
                                >
                                  {option}
                                </Button>
                              ))}
                            </div>
                            {chapterTwoAnswer && (
                              <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-base text-amber-900 dark:text-amber-200">
                                <span className="font-semibold">WRONG</span>,
                                the answer is
                                <span className="mx-2 rounded-full bg-amber-300/30 px-3 py-1 text-sm font-semibold">
                                  {chapterTwoAnswer}
                                </span>
                                because models don&apos;t necessarily predict the
                                highest probability token!
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`transition-all duration-700 ease-out lg:basis-3/5 ${
                        chapterTwoStep === 1
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-8 pointer-events-none lg:basis-0 lg:max-w-0 lg:overflow-hidden"
                      }`}
                    >
                      <div className="rounded-3xl border border-border/60 bg-card/90 p-8 md:p-10 shadow-sm space-y-6">
                        <div className="space-y-2">
                          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
                            Context
                          </p>
                          <div className="rounded-2xl border border-border/60 bg-background/60 px-5 py-4 text-base md:text-lg text-foreground">
                            {chapterTwoContext}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
                            Static Tokens
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {chapterTwoTokens.map((token, idx) => (
                              <span
                                key={`${token}-${idx}`}
                                title={JSON.stringify(token)}
                                className="rounded-xl border border-border/60 bg-background/70 px-3 py-1.5 text-sm md:text-base"
                              >
                                <span className="inline-flex flex-wrap items-center gap-0.5">
                                  {renderTokenContent(token)}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
                            Top-K Predictions
                          </p>
                          <div className="grid gap-3">
                            {chapterTwoPredictions.map((prediction, idx) => (
                              <div
                                key={`${prediction.token}-${idx}`}
                                className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/70 px-5 py-4 md:flex-row md:items-center md:justify-between"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                    {idx + 1}
                                  </span>
                                  <span className="text-lg font-semibold">
                                    &quot;{prediction.token}&quot;
                                  </span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="text-base text-muted-foreground">
                                    {prediction.probability.toFixed(2)}%
                                  </span>
                                  <div className="h-2 w-28 rounded-full bg-muted/60">
                                    <div
                                      className="h-full rounded-full bg-primary"
                                      style={{
                                        width: `${prediction.confidence * 100}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          return null;
        })}

        <section className="relative h-screen shrink-0 snap-start flex items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-transparent" />
          <div className="relative z-10 mx-auto w-full max-w-5xl px-8 text-center">
            <p className="text-sm uppercase tracking-[0.55em] text-muted-foreground mb-4">
              Ready
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold mb-6">
              Enter the Playground
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              Continue to the interactive LLens experience and explore tokens in
              real time.
            </p>
            <Button size="lg" className="text-xl px-12 py-8 rounded-2xl" asChild>
              <Link to="/llens">Start Unguided</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
