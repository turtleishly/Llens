import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import natureHero from "@/assets/nature-hero.png";
import sunwayLogo from "@/assets/sunway-logo.png";
import rakanTutorLogo from "@/assets/rakan-tutor-logo.png";
import BlurFade from "@/components/ui/blur-fade";
import DitheredBackground from "@/components/DitheredBackground";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BLUR_FADE_DELAY = 0.04;

type FloatingEmojiItem = {
  emoji: string;
  color: string;
  rotate: number;
  delay: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

const floatingEmojiItems: FloatingEmojiItem[] = [
  { emoji: "💻", color: "#9FBBC7", top: "18%", left: "5%", rotate: -12, delay: 0.1 },
  { emoji: "⚙️", color: "#E7B12C", top: "40%", left: "10%", rotate: 10, delay: 0.2 },
  { emoji: "💡", color: "#B1C17B", top: "30%", right: "5%", rotate: 8, delay: 0.3 },
  { emoji: "🎨", color: "#B2A2D3", top: "50%", right: "8%", rotate: -15, delay: 0.4 },
  { emoji: "🏛️", color: "#EF6A6A", bottom: "35%", left: "5%", rotate: -5, delay: 0.5 },
];

const Hero = () => {
  const titleWords = "The National AI Competition".split(" ");

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 px-4 md:px-8 bg-[linear-gradient(135deg,hsl(var(--hero-bg-from))_0%,hsl(var(--hero-bg-via))_45%,hsl(var(--hero-bg-to))_100%)] overflow-hidden">
      <DitheredBackground className="z-0" />
      <div className="container relative z-10 max-w-5xl mx-auto">
        {/* Centered Content */}
        <div className="flex flex-col items-center text-center space-y-12">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground leading-[1.1] md:leading-[1.05]">
              <div className="flex flex-wrap justify-center gap-x-[0.2em]">
                {titleWords.map((word, i) => (
                  <BlurFade key={i} delay={BLUR_FADE_DELAY * i} blur="10px">
                    {word}
                  </BlurFade>
                ))}
              </div>
              <BlurFade delay={BLUR_FADE_DELAY * titleWords.length} blur="10px">
                <span
                  className="text-primary font-handwriting font-bold italic inline-block rotate-[-3deg] text-7xl md:text-9xl mt-2 pb-2"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  2026
                </span>
              </BlurFade>
            </h1>

            <BlurFade delay={BLUR_FADE_DELAY * (titleWords.length + 2)}>
              <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-light">
                Join Malaysia's largest AI competition for youths. <br className="hidden md:block" />
                <span className="text-sm font-medium text-muted-foreground/60 block mt-4 uppercase tracking-[0.2em]">
                  Approved by Kementerian Pendidikan Malaysia
                </span>
              </p>
            </BlurFade>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
            <BlurFade delay={BLUR_FADE_DELAY * (titleWords.length + 4)}>
              <Button
                asChild
                className="h-16 px-12 rounded-full text-xl font-semibold bg-cyan-500 text-white hover:bg-cyan-600 hover:scale-105 transition-all duration-300 shadow-xl shadow-cyan-500/20"
              >
                <Link to="/register">Register Now</Link>
              </Button>
            </BlurFade>
          </div>

          {/* Organisers Section restored with new aesthetic */}
          <BlurFade delay={BLUR_FADE_DELAY * (titleWords.length + 7)}>
            <div className="pt-8 flex flex-col items-center gap-6">
              <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.4em]">
                Organised By
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <a
                  href="https://rakantutor.org"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Rakan Tutor website"
                  className="bg-white rounded-2xl px-8 py-4 shadow-sm border border-black/5 hover:shadow-md transition-shadow"
                >
                  <img src={rakanTutorLogo} alt="Rakan Tutor" className="h-20 md:h-24 w-auto object-contain" />
                </a>
                <a
                  href="https://sunway.edu.my"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Sunway University website"
                  className="bg-white rounded-2xl px-8 py-4 shadow-sm border border-black/5 hover:shadow-md transition-shadow"
                >
                  <img src={sunwayLogo} alt="Sunway University" className="h-20 md:h-24 w-auto object-contain" />
                </a>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Floating Emoji Cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none hidden md:block">
        {floatingEmojiItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -15, 0],
              rotate: [item.rotate, item.rotate + 5, item.rotate]
            }}
            transition={{
              opacity: { duration: 0.8, delay: item.delay, ease: "easeOut" },
              scale: { duration: 0.8, delay: item.delay, ease: "backOut" },
              y: { duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: item.delay + Math.random() },
              rotate: { duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: item.delay + Math.random() }
            }}
            style={{
              position: 'absolute',
              backgroundColor: item.color,
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
            }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] flex items-center justify-center shadow-xl z-20 opacity-90"
          >
            <span className="text-3xl md:text-4xl">{item.emoji}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
