import { Calendar } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import { motion } from "framer-motion";

const timelineEvents = [
    {
        date: "31 Mar - 2 Apr 2026",
        event: "Masterclass (by category)",
        description: "Attend specialized workshops tailored to each competition track. Learn essential skills and tools from industry experts."
    },
    {
        date: "4 May 2026 (Monday)",
        event: "Proposal Submission Deadline",
        description: "Submit your team's project proposal outlining your approach, methodology, and expected outcomes."
    },
    {
        date: "15 May 2026, 4:00 PM (Friday)",
        event: "Announcement of Finalists",
        description: "Top teams from each category will be selected to advance to the Grand Finals at Sunway University."
    },
    {
        date: "13 Jun 2026, 8:30 AM - 2:00 PM",
        event: "Grand Finals at Sunway University",
        description: "Present your final project to judges and compete for prizes. Network with mentors, sponsors, and fellow innovators."
    },
];

const CompetitionFlowV2 = () => {
    return (
        <section id="timeline" className="py-32 bg-black relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <BlurFade delay={0.1}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                            PHASE: <span className="text-cyan-500">CHRONOS</span>
                        </h2>
                        <div className="flex justify-center gap-2">
                            <div className="w-12 h-1 bg-cyan-500/30" />
                            <div className="w-4 h-1 bg-cyan-400 animate-pulse" />
                            <div className="w-12 h-1 bg-cyan-500/30" />
                        </div>
                    </BlurFade>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Technical Timeline Line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-900 overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent opacity-20"
                                animate={{ y: ['-100%', '100%'] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        <div className="space-y-16">
                            {timelineEvents.map((item, index) => (
                                <BlurFade key={index} delay={0.2 + index * 0.05} inView>
                                    <div className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse text-right'}`}>

                                        {/* Point on line */}
                                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20">
                                            <div className="w-4 h-4 rounded-full bg-zinc-950 border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                                        </div>

                                        <div className="hidden md:block flex-1" />

                                        <div className="flex-1 w-full md:w-auto">
                                            <motion.div
                                                className="group relative p-8 bg-zinc-950/50 border border-zinc-900 hover:border-cyan-500/30 transition-all duration-300"
                                                whileHover={{ y: -5 }}
                                            >
                                                {/* Date Label */}
                                                <div className={`flex items-center gap-2 mb-4 ${index % 2 === 0 ? 'justify-start' : 'md:justify-end'}`}>
                                                    <Calendar className="w-4 h-4 text-cyan-400" />
                                                    <span className="text-[10px] font-mono font-black text-cyan-500 uppercase tracking-[0.2em]">
                                                        {item.date}
                                                    </span>
                                                </div>

                                                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-2 group-hover:text-cyan-400 transition-colors">
                                                    {item.event}
                                                </h3>
                                                <p className="text-zinc-400 font-light leading-relaxed">
                                                    {item.description}
                                                </p>

                                                {/* Tech ID */}
                                                <div className="absolute -bottom-2 right-4 px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[8px] font-mono text-zinc-600 group-hover:border-cyan-500/20 group-hover:text-cyan-500/40">
                                                    UID: {index + 1}0X_SEC
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </BlurFade>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompetitionFlowV2;
