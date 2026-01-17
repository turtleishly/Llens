import { CheckCircle, UserPlus, GraduationCap, Send, ArrowRight } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import { motion } from "framer-motion";

const steps = [
    {
        icon: CheckCircle,
        title: "Eligibility",
        items: [
            "Form a team of 4 students (Secondary or Tertiary categories).",
            "All members must be studying in Malaysia (Gov, Private, or Int schools).",
        ],
    },
    {
        icon: UserPlus,
        title: "Registration",
        items: [
            "Log on to linktr.ee/nationalAIcompetition or click 'Register Now'.",
            "Get your Competition Booklet with full protocol details.",
        ],
    },
    {
        icon: GraduationCap,
        title: "Masterclass",
        items: [
            "Attend the prepared online Masterclasses: 31 March - 2 April 2026.",
            "Complimentary access ($250 value) for all registered units.",
        ],
    },
    {
        icon: Send,
        title: "Submission",
        items: [
            "Proposal deadline: 4 May 2026. Finalists out: 15 May 2026.",
            "Grand Finals: 13 June 2026 at Sunway University Command Hub.",
        ],
    },
];

const RegistrationV2 = () => {
    return (
        <section id="register" className="py-32 bg-black relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:w-1/3 text-left space-y-12 lg:sticky lg:top-32">
                        <BlurFade delay={0.1}>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                UPLINK: <br /><span className="text-cyan-500">PROCESS</span>
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed font-light mb-10">
                                Protocol instructions for units participating in the 2026 Engagement.
                            </p>

                            <div className="space-y-6">
                                <div className="p-8 bg-zinc-950 border border-zinc-900 border-l-cyan-500 border-l-4 group hover:border-cyan-500/50 transition-all flex items-center gap-6">
                                    <div className="w-20 h-20 bg-white p-2 shrink-0 group-hover:scale-105 transition-transform">
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://linktr.ee/nationalAIcompetition" alt="Register QR" className="w-full h-full" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-cyan-500 mb-1 tracking-[0.2em]">DIRECT_LINK</p>
                                        <p className="text-cyan-100 font-mono text-xs truncate max-w-[120px]">naic.link/join</p>
                                    </div>
                                </div>
                            </div>
                        </BlurFade>
                    </div>

                    <div className="lg:w-2/3 grid gap-6">
                        {steps.map((step, index) => (
                            <BlurFade key={step.title} delay={0.2 + index * 0.05} inView>
                                <motion.div
                                    className="group relative flex flex-col md:flex-row items-center gap-8 p-10 bg-zinc-950/50 border border-zinc-900 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden"
                                    whileHover={{ x: 10 }}
                                >
                                    {/* Number Watermark */}
                                    <div className="absolute top-0 right-0 text-[10rem] font-black text-cyan-500/[0.02] italic pointer-events-none group-hover:text-cyan-500/[0.04] transition-colors leading-none pr-4">
                                        STEP_0{index + 1}
                                    </div>

                                    <div className="relative z-10 w-20 h-20 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-cyan-500/30 transition-all duration-300">
                                        <step.icon className="w-10 h-10 text-cyan-500" />
                                    </div>

                                    <div className="relative z-10 flex-1 text-center md:text-left">
                                        <h3 className="text-2xl font-black text-white italic tracking-tighter mb-4 uppercase group-hover:text-cyan-400 transition-colors">
                                            {step.title}
                                        </h3>
                                        <ul className="space-y-2">
                                            {step.items.map((item, i) => (
                                                <li key={i} className="text-zinc-400 text-sm md:text-base font-light flex items-start gap-3 justify-center md:justify-start">
                                                    <span className="w-1 h-1 rounded-full bg-cyan-500/50 mt-2 shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrationV2;
