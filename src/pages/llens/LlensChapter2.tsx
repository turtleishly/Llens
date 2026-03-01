import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChapterShell } from "@/components/llens/ChapterShell";
import { ChapterTopBar } from "@/components/llens/ChapterTopBar";

export default function LlensChapter2() {
  const navigate = useNavigate();

  return (
    <ChapterShell gradient="amber">
      <ChapterTopBar
        links={[
          { label: "Previous Chapter", to: "/llens/chapter-1" },
          { label: "Skip to Playground", to: "/llens" },
        ]}
      />

      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="relative z-10 max-w-2xl w-full text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.45em] text-muted-foreground">
            Chapter 02
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            How LLM&apos;s Generate
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            LLM&apos;s generate text by simply looking at the tokens it has, and try to
            predict the next token! Let&apos;s see that in action through a guessing game!
          </p>
          <Button
            size="lg"
            className="rounded-full px-10 py-6 text-base"
            onClick={() => navigate("/llens/chapter-2/game")}
          >
            Next
          </Button>
        </div>
      </section>
    </ChapterShell>
  );
}
