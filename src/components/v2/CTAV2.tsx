import { Button } from "@/components/ui/button";
import BlurFade from "@/components/ui/blur-fade";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const CTAV2 = () => {
    return <section className="relative py-40 overflow-hidden bg-black">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] pointer-events-none animate-pulse" style={{
            background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%)'
        }} />

        <div className="container relative z-10 mx-auto px-6 text-center">
            <div className="max-w-5xl mx-auto space-y-16">
                <BlurFade inView>
                    <h2 className="text-6xl font-black tracking-tighter text-white uppercase leading-[0.8] md:text-7xl" style={{
                        fontFamily: "'Orbitron', sans-serif"
                    }}>DO YOU ACCEPT
                        PROTOCOL?<br />
                        <span className="text-cyan-500 neon-text-cyan">PROTOCOL?</span>
                    </h2>
                </BlurFade>

                <BlurFade inView delay={0.2}>
                    <p className="text-2xl md:text-3xl text-zinc-400 font-light max-w-3xl mx-auto leading-tight">Register in 5 mins</p>
                </BlurFade>

                <BlurFade inView delay={0.3}>
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative group">
                            {/* Neon Glow Wrapper */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>

                            <Button asChild className="relative h-24 px-16 rounded-lg bg-black border-2 border-cyan-500 text-cyan-400 font-black text-4xl uppercase tracking-tighter hover:bg-cyan-950 transition-all hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.5)]" style={{
                                fontFamily: "'Orbitron', sans-serif"
                            }}>
                                <Link to="/register" className="flex items-center gap-3">
                                    REGISTER NOW
                                    <motion.span animate={{
                                        x: [0, 5, 0]
                                    }} transition={{
                                        duration: 1.5,
                                        repeat: Infinity
                                    }}>
                                        _
                                    </motion.span>
                                </Link>
                            </Button>

                            {/* Tech Corner Accents */}
                            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
                        </div>
                    </div>
                </BlurFade>

                <BlurFade inView delay={0.4}>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-cyan-500/40 font-black uppercase tracking-[0.5em] text-[10px] font-mono">
                            DEADLINE: 02_APRIL_2026 // TIME: 23:59_MYT
                        </p>
                        <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                    </div>
                </BlurFade>
            </div>
        </div>

        {/* Scanning Line Effect */}
        <motion.div className="absolute left-0 w-full h-[1px] bg-cyan-500/10 blur-sm" animate={{
            top: ['0%', '100%']
        }} transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
        }} />
    </section>;
};
export default CTAV2;