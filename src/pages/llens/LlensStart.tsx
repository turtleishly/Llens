import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { preloadLlensModel } from "@/workers/llensWorkerSingleton";

export default function LlensStart() {
  const navigate = useNavigate();

  useEffect(() => {
    preloadLlensModel();
  }, []);

  return (
    <div className="group min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-20 opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Rakan Tutor
          </Link>
        </div>
        <div className="h-px w-full bg-border" />
      </div>

      <div className="text-center px-6">
        <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground mb-6">
          LLens
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight">
          What's happening inside ChatGPT?
        </h1>
        <Button
          size="lg"
          className="text-lg px-10 py-7 rounded-2xl"
          onClick={() => navigate("/llens/chapter-1")}
        >
          Start
        </Button>
      </div>
    </div>
  );
}
