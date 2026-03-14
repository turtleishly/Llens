import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getLlensWorker,
  isLlensModelReady,
  preloadLlensModel,
} from "@/workers/llensWorkerSingleton";

const TOKEN_POOL = [
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
  " manifold", " abliteration", " residual", " stream",
  " attention", " head", " layer", " neuron", " activation",
  " embedding", " logit", " lens", " superposition",
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
  " induction", " head", " copy", " suppression",
  " in-context", " learning", " few-shot", " zero-shot",
  " chain-of-thought", " scratchpad", " CoT",
  " mechanistic", " interpretability", " alignment",
  " steering", " vector", " concept", " direction",
  " representation", " engineering", " probing",
  " dictionary", " learning", " feature", " splitting",
  " GPT", "-4", " Claude", " LLaMA", " Gemini",
  " parameters", " fine-tuning", " RLHF",
  " reward", " model", " policy", " gradient",
  " next", " token", " prediction",
  " d_model", " d_ff", " n_heads", " n_layers",
  " vocab", " size", " context", " length",
  " residual", " connection", " pre-norm", " post-norm",
  " logit", " difference", " direct", " effect",
  " virtual", " weight", " composition",
  " OV-circuit", " QK-circuit", " eigenspectrum",
  " token", " embedding", " positional", " bias",
  " unembedding", " matrix", " W_E", " W_U",
  " frozen", " weights", " adapter", " LoRA",
  " compressed", " sensing", " L1", " penalty",
  " sparsity", " coefficient", " top-k", " activation",
];

const DISPLAY_COUNT = 36;

const HOW_IT_WORKS = [
  {
    title: "1) Load a lightweight GPT-2 model",
    body: "LLens loads a simple GPT-2 model directly in your browser so you can experiment without sending prompts to a backend.",
  },
  {
    title: "2) Inspect tokens and predictions",
    body: "You explore how text is split into tokens, then see how those tokens shape next-token probabilities and final outputs.",
  },
  {
    title: "3) Build intuition through interaction",
    body: "Interactive chapters show why model outputs can vary and how randomness settings like temperature can change answers.",
  },
];

const KEY_BENEFITS = [
  {
    title: "Understand AI reliability limits",
    body: "See why a model can answer the same question differently across runs, especially when temperature is non-zero.",
  },
  {
    title: "See what models actually process",
    body: "You type words, but the model operates on token IDs and probabilities. LLens makes that representation visible.",
  },
  {
    title: "Challenge the ‘AI is good at math’ assumption",
    body: "You learn that confidence and correctness are different, and language models are not deterministic calculators.",
  },
  {
    title: "Build intuition quickly",
    body: "Short guided chapters turn abstract LLM concepts into concrete interactions you can test yourself.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is LLens?",
    a: "LLens is an interactive learning experience that helps you understand how language models tokenize text and generate outputs.",
  },
  {
    q: "Do I need coding experience?",
    a: "No. LLens is designed for beginners and only requires curiosity about how AI systems work.",
  },
  {
    q: "What model does LLens use?",
    a: "LLens uses a lightweight GPT-2 style model for demonstration so the mechanics remain easy to explore.",
  },
  {
    q: "Where does the model run?",
    a: "The model runs in your browser, which keeps the experience responsive and easy to access.",
  },
  {
    q: "Why does loading take time?",
    a: "Your browser needs to download and initialize model files before interaction can begin.",
  },
  {
    q: "Can the same prompt give different answers?",
    a: "Yes. Sampling and temperature can produce different outputs from the same prompt.",
  },
  {
    q: "Will LLens teach me tokenization?",
    a: "Yes. Chapter 1 focuses on tokenization, including how whitespace can change token boundaries.",
  },
  {
    q: "Is this meant for production AI usage?",
    a: "No. LLens is an educational tool built to explain core LLM behavior.",
  },
  {
    q: "Can I view the source code?",
    a: "Yes, the source is available on GitHub so you can inspect and extend the project.",
  },
  {
    q: "How long does the experience take?",
    a: "Most learners can complete the guided flow in one short session, then revisit sections for deeper practice.",
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
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
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    if (isLlensModelReady()) {
      setIsReady(true);
      return;
    }

    preloadLlensModel();
    const worker = getLlensWorker();

    const handler = (event: MessageEvent) => {
      if (event.data?.type === "ready") {
        setIsReady(true);
      }
    };

    worker.addEventListener("message", handler);
    return () => {
      worker.removeEventListener("message", handler);
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      setVisibleTokenCount(DISPLAY_COUNT);
      if (tickRef.current !== null) {
        window.clearInterval(tickRef.current);
        tickRef.current = null;
      }
      return;
    }

    setVisibleTokenCount(0);
    tickRef.current = window.setInterval(() => {
      setVisibleTokenCount((prev) => {
        const next = prev + 1;
        if (next >= DISPLAY_COUNT) {
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
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Link
            to="/"
            className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
          >
            LLens
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Benefits
            </a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-24 md:pt-28">
        <section className="flex justify-center py-8 md:py-12">
          <div className="text-center max-w-xl w-full space-y-10">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">
                LLens
              </p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                What&apos;s happening inside ChatGPT?
              </h1>
            </div>

            <div
              className={`transition-all duration-700 overflow-hidden ${
                isReady ? "max-h-0 opacity-0" : "max-h-48 opacity-100"
              }`}
            >
              <div className="space-y-4">
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

                <div className="flex items-center justify-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                    Loading model into your browser...
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className={`text-lg px-10 py-7 rounded-2xl transition-all duration-500 ${
                  isReady ? "opacity-100 scale-100" : "opacity-40 scale-95 cursor-not-allowed"
                }`}
                disabled={!isReady}
                onClick={() => navigate("/llens/chapter-1")}
              >
                {isReady ? "Start" : "Loading..."}
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="w-full rounded-2xl border-2 border-amber-400/70 bg-amber-100/80 px-8 py-8 text-lg font-semibold text-amber-950 shadow-sm transition-colors hover:bg-amber-200"
                onClick={() => navigate("/llens")}
              >
                Skip tutorial! I know this stuff!
              </Button>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="space-y-6 pt-20">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">How It Works</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Learn with a real, simple model setup</h2>
            <p className="max-w-3xl text-muted-foreground">
              LLens loads a simple GPT-2 model and guides you through tokenization and generation.
              Explore the source code on{" "}
              <a
                href="https://github.com/turtleishly/Llens"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border/60 bg-card/70 p-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="benefits" className="space-y-6 pt-20">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">Key Benefits</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">A better perspective on LLM behavior</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {KEY_BENEFITS.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border/60 bg-card/70 p-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="space-y-6 pt-20">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">FAQ</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card/70 px-5">
            <Accordion type="single" collapsible>
              {FAQ_ITEMS.map((item, idx) => (
                <AccordionItem key={item.q} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} LLens</p>
          <a
            href="https://github.com/turtleishly"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
          >
            github.com/turtleishly
          </a>
            Contact me at aidendev16(at)gmail(.)com
        </div>
      </footer>
    </div>
  );
}
