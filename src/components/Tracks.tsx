import { Building2, Cpu, Lightbulb, Monitor, Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Note: Using the same pixel art placeholder due to generation limits, but structure is ready for unique assets
const pixelPlaceholder = "/Users/ashvin/.gemini/antigravity/brain/ee42de6e-04ab-4d7c-b1ae-2a6b7c92cc1e/pixel_architecture_1767989119118.png";

const tracks = [
  {
    emoji: "💻",
    title: "Computing",
    description: "Architect the next generation of algorithms and high-performance computing frameworks.",
    bgColor: "bg-[#9FBBC7]", // Bold Steel Blue
  },
  {
    emoji: "⚙️",
    title: "Engineering",
    description: "Optimize complex systems and automate precision manufacturing with intelligent models.",
    bgColor: "bg-[#E7B12C]", // Bold Golden Yellow
  },
  {
    emoji: "💡",
    title: "Innovation",
    description: "Create disruptive solutions that challenge the boundaries of current technology.",
    bgColor: "bg-[#B1C17B]", // Bold Moss Green
  },
  {
    emoji: "🎨",
    title: "Generated Art",
    description: "Explore the intersection of human creativity and machine-generated aesthetics.",
    bgColor: "bg-[#B2A2D3]", // Bold Lavender/Purple
  },
  {
    emoji: "🏛️",
    title: "Architecture",
    description: "Reimagine sustainable urban spaces and parametric structures using AI-driven design.",
    bgColor: "bg-[#EF6A6A]", // More vibrant Coral/Red for better pop
  },
];

import BlurFade from "@/components/ui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

const Tracks = () => {
  return (
    <section id="tracks" className="relative py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4 text-left">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              2026 Competition Tracks
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed font-light">
              Work on areas that get you excited. Choose from many problem statements to build on.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tracks.map((track, i) => (
            <BlurFade key={track.title} delay={BLUR_FADE_DELAY * i} inView>
              <div
                className={`group relative rounded-[3rem] p-10 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${track.bgColor} h-full border border-black/5`}
              >
                {/* Emoji Section */}
                <div className="mb-10 flex justify-start">
                  <span className="text-7xl leading-none transition-transform duration-500 group-hover:scale-110 select-none">
                    {track.emoji}
                  </span>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="space-y-4 text-left">
                    <h3 className="text-3xl font-bold tracking-tight text-[#2E2D2B]">
                      {track.title}
                    </h3>
                    <p className="text-base text-[#2E2D2B]/80 leading-relaxed font-light line-clamp-3">
                      {track.description}
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;
