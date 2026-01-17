import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BlurFade from "@/components/ui/blur-fade";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import heroAiV2 from "/naic_ai_logo_transparent.png";
import sunwayLogo from "@/assets/sunway-logo.png";
import rakanTutorLogo from "@/assets/rakan-tutor-logo.png";

const BLUR_FADE_DELAY = 0.04;

const HeroV2 = () => {
    const titleWords = "The National AI Competition".split(" ");

    return (
        <section className="relative min-h-screen lg:h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden bg-black transition-colors duration-500">
            {/* Cyberpunk Background Elements */}
            <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
            <div className="absolute inset-0 circuit-bg opacity-10 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150 pointer-events-none" />

            {/* Background Glows - Refined with radial gradients for softer edges */}
            <div
                className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none animate-pulse-neon"
                style={{ background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%)' }}
            />
            <div
                className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none animate-pulse-neon"
                style={{ background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.15) 0%, transparent 70%)', animationDelay: '1s' }}
            />
            <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.05) 0%, transparent 80%)' }}
            />

            {/* Edge Frames - Pushed down to clear navbar */}
            <div className="absolute inset-4 md:inset-8 top-20 md:top-24 border border-cyan-500/10 pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30" />
            </div>

            {/* Technical Data Overlays - Adjusted for navbar spacing */}
            <div className="absolute top-36 left-12 hidden lg:block space-y-1 pointer-events-none opacity-60" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                <p className="tech-label">SYS_STATUS: ACTIVE</p>
                <p className="tech-label">CORE_TEMP: NOMINAL</p>
                <p className="tech-label">UPLINK_ESTABLISHED: 100%</p>
            </div>
            <div className="absolute bottom-12 right-8 hidden lg:block text-right space-y-1 pointer-events-none opacity-60" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                <p className="tech-label">LATENCY: 12ms</p>
                <p className="tech-label">PACKET_LOSS: 0.00%</p>
                <p className="tech-label">ENCRYPTION: AES-256</p>
            </div>

            <div className="container relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
                {/* AI Logo */}
                <BlurFade delay={0.1}>
                    <div className="relative inline-block mb-6">
                        <motion.img
                            src={heroAiV2}
                            alt="AI Logo"
                            className="w-full max-w-[160px] md:max-w-[200px] h-auto"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>
                </BlurFade>

                {/* Main Title */}
                <div className="mb-6">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-white uppercase leading-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        <div className="flex flex-col items-center gap-y-0.5">
                            <div className="flex flex-wrap justify-center gap-x-[0.3em]">
                                <BlurFade delay={BLUR_FADE_DELAY * 0} blur="10px">
                                    <span className="block">The</span>
                                </BlurFade>
                                <BlurFade delay={BLUR_FADE_DELAY * 1} blur="10px">
                                    <span className="block">National</span>
                                </BlurFade>
                                <BlurFade delay={BLUR_FADE_DELAY * 2} blur="10px">
                                    <span className="block">AI</span>
                                </BlurFade>
                            </div>
                            <BlurFade delay={BLUR_FADE_DELAY * 3} blur="10px">
                                <span className="block">Competition</span>
                            </BlurFade>
                        </div>
                        <BlurFade delay={BLUR_FADE_DELAY * 4} blur="10px">
                            <span className="text-cyan-400/80 font-black inline-block text-5xl md:text-6xl lg:text-8xl mt-1 cursor-default tracking-tight">
                                2026
                            </span>
                        </BlurFade>
                    </h1>
                </div>

                {/* Subtitle: Using Outfit for better readability */}
                <div className="space-y-10 max-w-2xl mx-auto">
                    <BlurFade delay={BLUR_FADE_DELAY * (titleWords.length + 2)}>
                        <p className="text-base md:text-xl text-cyan-50/80 font-medium tracking-wide uppercase leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            Malaysia's largest AI competition for youths.
                        </p>
                    </BlurFade>

                    {/* Cyber-Register Button - Smaller button */}
                    <BlurFade delay={0.5}>
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group">
                                {/* Neon Glow Wrapper */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>

                                <Button
                                    asChild
                                    className="relative h-12 px-8 rounded-lg bg-black border border-cyan-500/50 text-cyan-400 font-bold text-lg uppercase tracking-[0.1em] hover:bg-cyan-950 transition-all hover:scale-105 active:scale-95"
                                    style={{ fontFamily: "'Syne', sans-serif" }}
                                >
                                    <Link to="/register" className="flex items-center gap-2">
                                        <span className="relative">
                                            REGISTER NOW
                                        </span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </div>

            {/* Decorative Cyber Lines */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-[10%] left-[5%] w-[1px] h-[300px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
                <div className="absolute top-[20%] right-[10%] w-[1px] h-[400px] bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
                <div className="absolute bottom-[15%] left-[15%] w-[1px] h-[250px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />

                {/* Scanning Line Effect */}
                <motion.div
                    className="absolute left-0 w-full h-[2px] bg-cyan-500/20 blur-sm"
                    animate={{ top: ['-10%', '110%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
            </div>
        </section>
    );
};

export default HeroV2;
