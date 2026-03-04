import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function LlensConclusion() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden px-6">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[120px]" />
      </div>

      {/* Top nav */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
          >
            LLens
          </Link>
        </div>
        <div className="h-px w-full bg-border" />
      </div>

      <div className="max-w-2xl w-full space-y-12 py-24">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            Conclusion
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            I hope I've managed to change your&nbsp;perspective of&nbsp;LLMs!
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Many people think{" "}
            <span className="text-foreground font-medium">'AI is good at math'</span> because they
            link AI to machines — but now that you know the answer to the math question you asked
            ChatGPT or Gemini could very well change depending on{" "}
            <span className="text-foreground font-medium">
              random chance (temperature!)
            </span>
            , I hope you've gained a new perspective on just how unreliable AI systems could be!
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border" />

        {/* Call-to-actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-2xl px-8 py-6 text-base">
            <Link to="/">Back to Home</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-2xl px-8 py-6 text-base">
            <Link to="/llens">Explore Again</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
