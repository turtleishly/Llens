import { Trophy, Medal, Award, Star, Check } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import { motion } from "framer-motion";

const prizes = [
    {
        icon: Trophy,
        position: "1ST PLACE",
        amount: "RM 16,000",
        color: "text-amber-500",
        glow: "rgba(245, 158, 11, 0.3)",
        benefits: [
            "Sunway Bursary",
            "Visit to Google's Office",
            "6 months Pixlr Premium",
            "Cert of Commendation",
        ],
    },
    {
        icon: Medal,
        position: "2ND PLACE",
        amount: "RM 12,000",
        color: "text-slate-400",
        glow: "rgba(148, 163, 184, 0.3)",
        benefits: [
            "Sunway Bursary",
            "Visit to Google's Office",
            "6 months Pixlr Premium",
            "Cert of Commendation",
        ],
    },
    {
        icon: Award,
        position: "3RD PLACE",
        amount: "RM 8,000",
        color: "text-amber-700",
        glow: "rgba(180, 83, 9, 0.3)",
        benefits: [
            "Sunway Bursary",
            "Visit to Google's Office",
            "6 months Pixlr Premium",
            "Cert of Commendation",
        ],
    },
    {
        icon: Star,
        position: "CONSOLATION",
        amount: "RM 5,000",
        color: "text-cyan-500",
        glow: "rgba(6, 182, 212, 0.3)",
        benefits: ["Sunway Bursary", "Cert of Commendation"],
    },
];

const PrizesV2 = () => {
    return (
        <section id="prizes" className="py-32 bg-black relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <BlurFade delay={0.1}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                            ASSET: <span className="text-cyan-500">PRIZES</span>
                        </h2>
                        <div className="flex justify-center gap-2">
                            <div className="w-12 h-1 bg-cyan-500/30" />
                            <div className="w-4 h-1 bg-cyan-400 animate-pulse" />
                            <div className="w-12 h-1 bg-cyan-500/30" />
                        </div>
                    </BlurFade>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {prizes.map((prize, index) => (
                        <BlurFade key={prize.position} delay={0.1 + index * 0.1}>
                            <motion.div
                                className="group relative p-8 bg-zinc-950/80 border border-zinc-800 hover:border-cyan-500/50 transition-all duration-500 flex flex-col h-full overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                            >
                                {/* Tech Background Decoration */}
                                <div className="absolute top-2 right-2 flex gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <div className="w-1 h-1 bg-cyan-500" />
                                    <div className="w-1 h-1 bg-cyan-500" />
                                    <div className="w-1 h-1 bg-cyan-500" />
                                </div>

                                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-cyan-500/5 blur-3xl rounded-full" />

                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`w-14 h-14 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-500/30 transition-colors`}>
                                        <prize.icon className={`w-8 h-8 ${prize.color}`} style={{ filter: `drop-shadow(0 0 10px ${prize.glow})` }} />
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase">
                                            {prize.position}
                                        </h3>
                                        <div className={`text-2xl font-black ${prize.color} italic tracking-tighter`}>
                                            {prize.amount}
                                        </div>
                                    </div>
                                </div>

                                <ul className="space-y-4 pt-6 border-t border-zinc-900 group-hover:border-cyan-500/20 transition-colors flex-grow">
                                    {prize.benefits.map((benefit) => (
                                        <li key={benefit} className="flex items-start gap-3 text-xs font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                            <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${prize.color}`} />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* ID Counter */}
                                <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono font-black text-zinc-600">
                                    <span>REF_ID_{index + 1}00</span>
                                    <span className="text-cyan-500/30 group-hover:text-cyan-500/60 transition-colors">STATUS: ACTIVE</span>
                                </div>
                            </motion.div>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PrizesV2;
