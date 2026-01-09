import { Calendar } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

const timelineEvents = [
  { date: "31 Mar - 2 Apr 2026", event: "Masterclass (by category)" },
  { date: "4 May 2026 (Monday)", event: "Proposal Submission Deadline" },
  { date: "15 May 2026, 4:00 PM (Friday)", event: "Announcement of Finalists" },
  { date: "13 Jun 2026, 8:30 AM - 2:00 PM", event: "Grand Finals at Sunway University" },
];

const Timeline = () => {
  return (
    <section id="timeline" className="py-24 relative transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold font-display text-center text-foreground mb-16">
          ROADMAP TO VICTORY
        </h2>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line with gradient */}
            {/* Vertical line with gradient - Subtler */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-border/50 via-border/30 to-transparent hidden md:block" />

            <div className="space-y-8">
              {timelineEvents.map((item, index) => (
                <BlurFade key={index} delay={BLUR_FADE_DELAY * index} inView>
                  <div
                    className="flex items-start gap-4 md:gap-8 group"
                  >
                    <div className="relative z-10 w-12 h-12 shrink-0 rounded-full bg-background border border-border flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 glass-card rounded-2xl p-6 hover:border-border/50 transition-colors">
                      <p className="text-sm font-bold tracking-[0.2em] text-muted-foreground mb-1 uppercase">
                        {item.date}
                      </p>
                      <p className="text-foreground font-display text-lg font-medium">{item.event}</p>
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

export default Timeline;
