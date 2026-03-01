import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChapterShell } from "@/components/llens/ChapterShell";
import { ChapterTopBar } from "@/components/llens/ChapterTopBar";
import { ChapterTwoPanel } from "@/components/llens/ChapterTwoPanel";
import { TokenChip } from "@/components/llens/TokenChip";

const chapter = {
  number: "02",
  title: "How LLM's Generate",
};

const chapterTwoContext =
  "When Mary and John went to the store, Mary handed the bag to";

const chapterTwoStaticTokens = [
  "When",
  " Mary",
  " and",
  " John",
  " went",
  " to",
  " the",
  " store",
  ",",
  " Mary",
  " handed",
  " the",
  " bag",
  " to",
];

const chapterTwoPredictions = [
  { token: "John", probability: 44.11, confidence: 0.84 },
  { token: "the", probability: 8.89, confidence: 0.24 },
  { token: "them", probability: 7.3, confidence: 0.2 },
  { token: "her", probability: 6.82, confidence: 0.18 },
  { token: "Mary", probability: 4.92, confidence: 0.12 },
];

export default function LlensChapter2Game() {
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);

  const chapterTwoTokens = useMemo(() => chapterTwoStaticTokens, []);
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
  const hasLockedAnswer = selectedPrediction !== null;

  // ── Sub-panels ───────────────────────────────────────────────────────────

  const leftPanel = (
    <div className="space-y-4">
      <p className="text-sm uppercase tracking-[0.45em] text-muted-foreground">
        Chapter {chapter.number}
      </p>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold">{chapter.title}</h1>

      <div className="rounded-2xl border border-border/60 bg-card/85 p-6 shadow-sm space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Question</p>
        <p className="text-lg font-semibold">Which do you think is the next generated token?</p>
        <div className="grid gap-3">
          {chapterTwoOptions.map((option) => (
            <Button
              key={option}
              variant={selectedPrediction === option ? "default" : "outline"}
              className="justify-start text-sm md:text-base"
              disabled={hasLockedAnswer}
              onClick={() => {
                if (hasLockedAnswer) return;
                setSelectedPrediction(option);
              }}
            >
              {option}
            </Button>
          ))}
        </div>
        {chapterTwoAnswer && (
          <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm md:text-base text-amber-900 dark:text-amber-200">
            <span className="font-semibold">WRONG</span>, the answer is
            <span className="mx-2 rounded-full bg-amber-300/30 px-3 py-1 text-sm font-semibold">
              {chapterTwoAnswer}
            </span>
            because models don&apos;t always predict the highest probability token!{" "}
            <br />
            (Actually, you will always get this exercise wrong)
            <br />
            <br />
            Which tokens are actually selected depends on <code>temperature</code>. More on
            that later!
            <br />
            <br />
            That&apos;s why, sometimes even though models are very sure of the right answer,
            they &quot;hallucinate&quot; and give out the wrong answers!
          </div>
        )}
      </div>
    </div>
  );

  const rightPanel = (
    <div className="rounded-3xl border border-border/60 bg-card/90 p-6 md:p-8 shadow-sm space-y-5">
      {/* Context */}
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Context</p>
        <div className="rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm md:text-base text-foreground">
          {chapterTwoContext}
        </div>
      </div>

      {/* Static tokens */}
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Static Tokens</p>
        <div className="flex flex-wrap gap-2">
          {chapterTwoTokens.map((token, idx) => (
            <TokenChip key={`${token}-${idx}`} token={token} />
          ))}
        </div>
      </div>

      {/* Predictions */}
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Top-5 Predictions</p>
        <div className="grid gap-3">
          {chapterTwoPredictions.map((prediction, idx) => (
            <div
              key={`${prediction.token}-${idx}`}
              className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-background/70 px-4 py-3 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {idx + 1}
                </span>
                <span className="text-base font-semibold">&quot;{prediction.token}&quot;</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {prediction.probability.toFixed(2)}%
                </span>
                <div className="h-2 w-24 rounded-full bg-muted/60">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${prediction.confidence * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA after answering */}
      {hasLockedAnswer && (
        <div className="flex justify-end pb-2">
          <Button size="lg" className="rounded-full px-10" asChild>
            <Link to="/llens">Enter the Playground</Link>
          </Button>
        </div>
      )}
    </div>
  );

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <ChapterShell gradient="amber">
      <ChapterTopBar
        links={[
          { label: "Previous", to: "/llens/chapter-2" },
          { label: "Skip to Playground", to: "/llens" },
        ]}
      />

      {/* pt-16 on mobile clears the fixed top bar */}
      <section className="relative min-h-screen flex items-center pt-16 pb-10 lg:pt-0 lg:pb-0">
        <ChapterTwoPanel
          step={1}
          leftPanel={leftPanel}
          rightPanel={rightPanel}
        />
      </section>
    </ChapterShell>
  );
}
