import { Link } from "react-router-dom";

const IRL_EXAMPLE_IMAGE = "/IRL%20example.png";
const MECHANISTIC_INTERPRETABILITY_URL = "https://www.google.com/search?q=mechanistic+interpretability&rlz=1C1GCEA_enMY1014MY1014&oq=mechanistic+int&gs_lcrp=EgZjaHJvbWUqBwgAEAAYgAQyBwgAEAAYgAQyBggBEEUYOTIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIGCAUQRRhBMgYIBhBFGD0yBggHEEUYPdIBCDQ3NzlqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8";

const KEY_BENEFITS = [
  {
    title: "Understand AI reliability limits",
    body: "See why a model can answer the same question differently across runs, especially when temperature is non-zero.",
  },
  {
    title: "Build intuition quickly",
    body: "Short guides make LLM concepts concrete and easy. Understand through hands-on experience!",
  },
  {
    title: "Challenge the 'AI is good at math' assumption",
    body: "You learn that confidence and correctness are different, and language models are not deterministic calculators.",
  },
  {
    title: "Accelerate scientific discovery",
    body: (
      <>
        LLens provides a transparent testing ground for AI research, enabling rapid iteration and experiments
        especially in the research field of{" "}
        <a
          href={MECHANISTIC_INTERPRETABILITY_URL}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Mechanistic Interpretability
        </a>
      </>
    ),
  },
];

export default function LlensProblem() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto w-full max-w-5xl px-6 pb-16 pt-12 md:pt-16">
        <header className="space-y-5">
          <Link
            to="/"
            className="inline-flex rounded-full border border-border/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to Start
          </Link>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">The Problem</p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              AI is everywhere, but most people still cannot explain what it is doing.
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              AI tools now write, summarize, answer, and automate across school, work, and daily life.
              Yet adoption has moved faster than understanding. Many users treat model outputs as truth,
              even though language models are probabilistic systems that can sound confident while being wrong.
              When people cannot inspect why a model behaves a certain way, they also struggle to debug,
              challenge, or improve that behavior.
            </p>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              The gap is no longer access to AI. The gap is literacy about how AI generates answers and where
              its failure modes come from. LLens focuses on this gap by making tokenization, prediction, and
              generation steps visible enough for non-experts to reason about.
            </p>
          </div>
        </header>

        <section className="mt-12 space-y-4 rounded-2xl border border-border/60 bg-card/70 p-5 md:p-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">How is understanding useful?</p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Understanding model behavior can be helpful at unexpected times!
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              This screenshot captures a real case where a friend asked Meta AI for something inappropriate,
              Meta AI then refuses all (benign) requests, but is then fixed after I applied delimiters ( ``` ).
            </p>
          </div>
          <figure className="overflow-hidden rounded-xl border border-border/60 bg-background/60">
            <img
              src={IRL_EXAMPLE_IMAGE}
              alt="Real-world example showing how understanding LLM behavior helped fix a broken Meta AI WhatsApp response"
              className="h-auto w-full"
            />
          </figure>
        </section>

        <section className="mt-12 space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">Key Benefits</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Why this understanding matters</h2>
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
      </main>
    </div>
  );
}
