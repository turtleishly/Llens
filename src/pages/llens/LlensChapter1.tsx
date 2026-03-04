import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChapterShell } from "@/components/llens/ChapterShell";
import { ChapterTopBar } from "@/components/llens/ChapterTopBar";
import { ChapterTwoPanel } from "@/components/llens/ChapterTwoPanel";
import { GuidedFlash } from "@/components/llens/GuidedFlash";
import { TokenChip } from "@/components/llens/TokenChip";
import { getLlensWorker, isLlensModelReady, preloadLlensModel } from "@/workers/llensWorkerSingleton";
import { useGuideFlash } from "@/hooks/useGuideFlash";

const fallbackTokenize = (value: string) => value.match(/\s+|[^\s]+/g) ?? [];

const chapter = {
  number: "01",
  title: "Token Foundations",
  summary: "Why models split text into pieces and how models perceive the world.",
};



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

export default function LlensChapter1() {
  const [text, setText] = useState("");
  const [tokens, setTokens] = useState<string[]>(fallbackTokenize(""));
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [hasCompletedTask, setHasCompletedTask] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const helpTimerRef = useRef<number | null>(null);
  // Track the previous value so confetti only fires on the false→true transition
  const prevIsTaskCompleteRef = useRef(false);

  const tokensMemo = useMemo(() => tokens, [tokens]);

  const { flash, registerRef, activeId } = useGuideFlash();

  const isTaskComplete = hasCompletedTask || text.toLowerCase() === "dog\n dog";

  useEffect(() => {
    preloadLlensModel();
    const worker = getLlensWorker();
    workerRef.current = worker;

    if (isLlensModelReady()) {
      setIsModelReady(true);
      setIsModelLoading(false);
      worker.postMessage({ type: "tokenize", text: "" });
    } else {
      setIsModelLoading(true);
    }

    const handler = (event: MessageEvent) => {
      const message = event.data as
        | { type: "ready" }
        | { type: "tokenized"; tokens: string[]; tokenIds: number[] }
        | { type: "error"; message: string };

      if (message.type === "ready") {
        setIsModelReady(true);
        setIsModelLoading(false);
        setErrorMessage(null);
        worker.postMessage({ type: "tokenize", text: "" });
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

    worker.addEventListener("message", handler);
    return () => {
      worker.removeEventListener("message", handler);
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

  useEffect(() => {
    if (!hasCompletedTask && text.toLowerCase() === "dog\n dog") {
      setHasCompletedTask(true);
    }
  }, [hasCompletedTask, text]);

  // Start 30-second help timer once the user begins typing on step 1
  useEffect(() => {
    if (stepIndex !== 1 || isTaskComplete || showHelp) {
      if (helpTimerRef.current !== null) {
        window.clearTimeout(helpTimerRef.current);
        helpTimerRef.current = null;
      }
      return;
    }
    if (text.length > 0 && helpTimerRef.current === null) {
      helpTimerRef.current = window.setTimeout(() => {
        helpTimerRef.current = null;
        setShowHelp(true);
      }, 30000);
    }
  }, [stepIndex, isTaskComplete, showHelp, text]);

  useEffect(() => {
    const justCompleted = isTaskComplete && !prevIsTaskCompleteRef.current;
    prevIsTaskCompleteRef.current = isTaskComplete;

    if (!justCompleted) return;

    setShowConfetti(true);
    setConfettiActive(false);

    const rafId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setConfettiActive(true));
    });

    const timeout = window.setTimeout(() => setShowConfetti(false), 1200);

    // Flash the completion message after the confetti settles
    const flashTimeout = window.setTimeout(() => flash("cool-box"), 600);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeout);
      window.clearTimeout(flashTimeout);
    };
  }, [isTaskComplete, flash]);

  const handleRetry = () => {
    if (!workerRef.current || isModelLoading) return;
    setIsModelLoading(true);
    setErrorMessage(null);
    workerRef.current.postMessage({ type: "load" });
  };

  // ── Sub-panels ────────────────────────────────────────────────────────────────

  const leftPanel = (
    <div className="space-y-4">
      <p className="text-sm uppercase tracking-[0.45em] text-muted-foreground">
        Chapter {chapter.number}
      </p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">{chapter.title}</h1>
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
        {chapter.summary}
      </p>

      {/* Step cards — relative/absolute stacking so height tracks the active card only */}
      <div className="relative">
        {/* Step 0 — intro */}
        <div
          className={`transition-all duration-700 ease-out ${
            stepIndex === 0 ? "relative opacity-100 translate-x-0" : "absolute inset-0 opacity-0 -translate-x-8 pointer-events-none"
          }`}
        >
          <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm space-y-4">
            <p className="text-2xl font-semibold text-foreground">Chapter 1: Tokenization</p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line text-left">
              Tokenization is how models like ChatGPT perceive our world. It may be words to us,
              but to ChatGPT, they actually just see integers! Even weirder, whether a word starts 
              with a space or not makes it a different token sometimes!{"\n\n"}
              (This is why it may not be so surprising that some models struggle to tell how many
              R&apos;s there are in Strawberry){"\n\n"}

              Let's try looking at the tokenizations of some text!
            </p>
            <Button
              size="lg"
              className="rounded-full px-8"
              onClick={() => {
                setStepIndex(1);
                // Flash the task card first, then draw eyes to the input
                window.setTimeout(() => flash("task-box"), 500);
                window.setTimeout(() => flash("input-box"), 1900);
              }}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Step 1 — task */}
        <div
          className={`transition-all duration-700 ease-out ${
            stepIndex === 1 ? "relative opacity-100 translate-x-0" : "absolute inset-0 opacity-0 translate-x-8 pointer-events-none"
          }`}
        >
          <GuidedFlash
            ref={registerRef("task-box")}
            isActive={activeId === "task-box"}
            className="rounded-2xl"
          >
          <div className="rounded-2xl bg-black/90 p-6 text-white shadow-sm space-y-4">
            {isTaskComplete ? (
              <GuidedFlash
                ref={registerRef("cool-box")}
                isActive={activeId === "cool-box"}
                className="rounded-xl"
              >
              <div className="space-y-3">
                <p className="text-xl font-semibold">Cool!</p>
                <p className="text-base text-white/80 leading-relaxed">
                  Notice how the dog with a space and without a space are two different tokens?
                  Look at the Integer representations — THAT&apos;s what the model &apos;sees&apos;!
                </p>
                <p className="text-base text-white/80 leading-relaxed">
                  Continue playing around with the tokenizer! Try &quot;Rakan tutor&quot;, and see
                  how the model wasn&apos;t trained on Malay text, so it doesn&apos;t support Malay words!
                </p>
              </div>
              </GuidedFlash>
            ) : (
              <>
                <p className="text-sm uppercase tracking-[0.45em] text-white/60">Task</p>
                <div className="flex flex-wrap items-center gap-2 text-xl font-semibold">
                  <span>Type EXACTLY:</span>
                  <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-lg">dog</span>
                  <span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white"
                    aria-label="newline"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4">
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
                  <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-lg flex items-center gap-1">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full bg-orange-300 ring-1 ring-orange-400/70"
                      aria-label="space"
                    />
                    dog
                  </span>
                </div>
                {/* Legend */}
                <div className="flex items-center gap-4 pt-1">
                  <p className="text-xs text-white/50 uppercase tracking-[0.3em]">Legend</p>
                  <span className="flex items-center gap-1.5 text-xs text-white/60">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-300 ring-1 ring-orange-400/70" />
                    space
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/60">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
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
                    newline
                  </span>
                </div>
                {showHelp && (
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      className="text-xs uppercase tracking-[0.35em] text-white/50 underline underline-offset-2 hover:text-white/80 transition-colors"
                      onClick={() => setText("dog\n dog")}
                    >
                      Help me
                    </button>
                    <span className="text-xs text-white/30">— fill in the answer for me</span>
                  </div>
                )}
              </>
            )}
          </div>
          </GuidedFlash>
        </div>
      </div>
    </div>
  );

  const rightPanel = (
    <div className="rounded-3xl border border-border/60 bg-card/90 p-6 md:p-8 shadow-sm space-y-5">
      {/* Input */}
      <GuidedFlash
        ref={registerRef("input-box")}
        isActive={activeId === "input-box"}
        className="rounded-2xl"
      >
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Interactive Input</p>
        <textarea
          className="min-h-[120px] w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      </GuidedFlash>

      {/* Token visualiser */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Token Visualiser</p>
          {!isModelReady && (
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {isModelLoading ? "Loading tokenizer... This may take a couple of minutes" : "Fallback mode"}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {tokensMemo.map((token, idx) => (
            <TokenChip key={`${token}-${idx}`} token={token} />
          ))}
        </div>
      </div>

      {/* Integer representations */}
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Integer Representations</p>
        {tokenIds.length === 0 ? (
          <p className="text-base text-muted-foreground">Token IDs appear once the tokenizer is ready.</p>
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

      {/* Error */}
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

      {/* Continue button — lives inside the right panel so it's visible without scrolling on desktop */}
      {isTaskComplete && (
        <div className="flex justify-center pt-2">
          <Button size="lg" className="rounded-full px-10" asChild>
            <Link to="/llens/chapter-2">Continue to Chapter 2</Link>
          </Button>
        </div>
      )}
    </div>
  );

  const footer = null;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <ChapterShell gradient="sky">
      {/* Confetti overlay */}
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

      <ChapterTopBar
        links={[{ label: "Skip to Playground", to: "/llens" }]}
        conditionalLink={
          isTaskComplete ? { label: "Next Chapter", to: "/llens/chapter-2" } : undefined
        }
      />

      {/* pt-16 on mobile keeps content below the fixed top bar */}
      <section className="relative min-h-screen flex items-center pt-16 pb-10 lg:pt-0 lg:pb-0">
        <ChapterTwoPanel
          step={stepIndex}
          leftPanel={leftPanel}
          rightPanel={rightPanel}
          footer={footer}
        />
      </section>
    </ChapterShell>
  );
}
