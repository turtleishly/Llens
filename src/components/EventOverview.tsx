import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 2300, suffix: "+", label: "participants in 2025" },
  { value: 25, suffix: "+", label: "industry mentors" },
  { value: 10, label: "winning teams per track" },
];

const CountUp = ({ value, suffix }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const durationMs = 1200;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));
          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-extrabold text-foreground">
      {displayValue}
      {suffix || ""}
    </div>
  );
};

const EventOverview = () => {
  return (
    <section className="relative py-20 bg-background px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              Overview
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              A nationwide AI challenge for student teams to design, build, and present practical solutions.
              Expect hands-on problem solving, expert feedback, and workshops that sharpen your approach.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src="/naic2025photo.jpg"
              alt="Competition overview graphic"
              className="w-full max-w-md h-auto rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventOverview;
