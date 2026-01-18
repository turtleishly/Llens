import { Calendar } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

const timelineEvents = [
  {
    date: "April 2, 2026",
    event: "Registration Deadline",
    description: "Final call for teams to register. Ensure your team of 4 is ready and your teacher advisor is onboarded."
  },
  {
    date: "April - May 2026",
    event: "AI Masterclass & Building",
    description: "Receive the competition topics, participate in free AI masterclasses, and work on your project submission."
  },
  {
    date: "May 24, 2026",
    event: "First Round Submission",
    description: "Submit your team's project for the online preliminary round for judging."
  },
  {
    date: "June 2026",
    event: "Announcement of Finalists",
    description: "The top 60 teams will be announced and invited to the grand finals at Sunway University."
  },
  {
    date: "July 19, 2026",
    event: "Grand Finals at Sunway University",
    description: "Compete in the in-person final round. Transportation provided by Sunway University for shortlisted participants."
  },
];

const Timeline = () => {
  return (
    <section id="timeline" className="py-24 relative transition-colors duration-300 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold font-display text-center text-foreground mb-16">
          Timeline
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
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 glass-card rounded-2xl p-6 hover:border-border/50 transition-colors">
                      <p className="text-sm font-bold tracking-[0.2em] text-muted-foreground mb-1 uppercase">
                        {item.date}
                      </p>
                      <p className="text-foreground font-display text-lg font-medium mb-2">{item.event}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
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
