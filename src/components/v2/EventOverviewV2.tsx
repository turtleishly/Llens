import { useRef, useEffect, useState } from "react";
import heroGraphic from "@/assets/hero-graphic.png";

const stats = [
    { value: 2300, suffix: "+", label: "participants in 2025" },
    { value: 25, suffix: "+", label: "industry mentors" },
    { value: 10, label: "winning teams" },
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
        <div ref={ref} className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-none neon-text-cyan">
            {displayValue}
            {suffix || ""}
        </div>
    );
};

const EventOverviewV2 = () => {
    return (
        <section id="overview" className="relative py-32 bg-black overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col-reverse md:flex-row items-center gap-16 lg:gap-24">
                    <div className="w-full md:w-1/2 space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                DATA: <br /><span className="text-cyan-500">OVERVIEW</span>
                            </h2>
                            <div className="flex gap-2">
                                <div className="w-24 h-2 bg-cyan-500/50" />
                                <div className="w-8 h-2 bg-cyan-400 animate-pulse" />
                            </div>
                        </div>

                        <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light max-w-xl">
                            A nationwide AI challenge for student teams to design, build, and present practical solutions.
                            Expect hands-on problem solving, expert feedback, and workshops that sharpen your approach.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                            {stats.map((stat, index) => (
                                <div key={stat.label} className="space-y-3 p-8 bg-zinc-950 border border-zinc-900 border-l-cyan-500/30 border-l-4 group hover:border-cyan-500/50 transition-colors relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-cyan-500/20 group-hover:text-cyan-500/40">
                                        SEC_0{index + 1}
                                    </div>
                                    <CountUp value={stat.value} suffix={stat.suffix} />
                                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] leading-tight group-hover:text-cyan-500/60 transition-colors">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 relative group">
                        <div
                            className="absolute inset-0 -z-10 group-hover:scale-110 transition-transform duration-700 animate-pulse"
                            style={{ background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%)' }}
                        />
                        <img
                            src={heroGraphic}
                            alt="Competition overview graphic"
                            className="w-full max-w-lg mx-auto drop-shadow-[0_0_50px_rgba(6,182,212,0.3)] transition-all duration-500 group-hover:rotate-1 group-hover:scale-105"
                        />
                        {/* Tech Corners */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventOverviewV2;
