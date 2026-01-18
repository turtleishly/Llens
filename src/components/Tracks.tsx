import { Building2, Cpu, Lightbulb, Monitor, Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Note: Using the same pixel art placeholder due to generation limits, but structure is ready for unique assets
const pixelPlaceholder = "/Users/ashvin/.gemini/antigravity/brain/ee42de6e-04ab-4d7c-b1ae-2a6b7c92cc1e/pixel_architecture_1767989119118.png";

const tracks = [
  {
    emoji: "💻",
    title: "Computing",
    description: "Architect the next generation of algorithms and high-performance computing frameworks.",
    bgColor: "bg-[#E6F4F1] dark:bg-cyan-950/20",
    href: "/tracks#computing"
  },
  {
    emoji: "⚙️",
    title: "Engineering",
    description: "Optimize complex systems and automate precision manufacturing with intelligent models.",
    bgColor: "bg-[#FDF6E3] dark:bg-amber-950/20",
    href: "/tracks#engineering"
  },
  {
    emoji: "💡",
    title: "Innovation",
    description: "Create disruptive solutions that challenge the boundaries of current technology.",
    bgColor: "bg-[#F0F4E8] dark:bg-emerald-950/20",
    href: "/tracks#innovation"
  },
  {
    emoji: "🎨",
    title: "Generated Art",
    description: "Explore the intersection of human creativity and machine-generated aesthetics.",
    bgColor: "bg-[#F5F0F9] dark:bg-purple-950/20",
    href: "/tracks#art"
  },
  {
    emoji: "🏛️",
    title: "Architecture",
    description: "Reimagine sustainable urban spaces and parametric structures using AI-driven design.",
    bgColor: "bg-[#FBE9E9] dark:bg-rose-950/20",
    href: "/tracks#architecture"
  },
];

import { Link } from "react-router-dom";
import BlurFade from "@/components/ui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

const Tracks = () => {
  return (
    <section id="tracks" className="relative py-32 bg-background px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4 text-left">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              2026 Competition Tracks
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed font-light">
              Explore our five distinct paths. Each designed to challenge different skills and passions.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full px-8 py-6 group">
            <Link to="/tracks">
              View All Track Details
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tracks.map((track, i) => (
            <BlurFade key={track.title} delay={BLUR_FADE_DELAY * i} inView>
              <Link to={track.href} className="block h-full">
                <div
                  className={`group relative rounded-[3rem] p-10 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${track.bgColor} h-full border border-black/5 dark:border-white/5`}
                >
                  {/* Emoji Section */}
                  <div className="mb-10 flex justify-between items-start">
                    <span className="text-7xl leading-none transition-transform duration-500 group-hover:scale-110 select-none">
                      {track.emoji}
                    </span>
                    <ArrowRight className="w-10 h-10 text-foreground/10 group-hover:text-foreground/40 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="space-y-4 text-left">
                      <h3 className="text-3xl font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed font-light line-clamp-3">
                        {track.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;
