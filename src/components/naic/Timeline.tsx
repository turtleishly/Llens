import { Calendar } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import { useTranslation } from "react-i18next";

const BLUR_FADE_DELAY = 0.04;

const Timeline = () => {
  const { t } = useTranslation();

  const timelineEvents = [
    {
      date: t("timeline.event1.date"),
      event: t("timeline.event1.name"),
      description: t("timeline.event1.desc")
    },
    {
      date: t("timeline.event2.date"),
      event: t("timeline.event2.name"),
      description: t("timeline.event2.desc")
    },
    {
      date: t("timeline.event3.date"),
      event: t("timeline.event3.name"),
      description: t("timeline.event3.desc")
    },
    {
      date: t("timeline.event4.date"),
      event: t("timeline.event4.name"),
      description: t("timeline.event4.desc")
    },
    {
      date: t("timeline.event5.date"),
      event: t("timeline.event5.name"),
      description: t("timeline.event5.desc")
    },
    {
      date: t("timeline.event6.date"),
      event: t("timeline.event6.name"),
      description: t("timeline.event6.desc")
    },
  ];

  return (
    <section id="timeline" className="py-24 relative transition-colors duration-300 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold font-display text-center text-foreground mb-16">
          {t("timeline.title")}
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
                      <p className="text-sm font-bold tracking-[0.2em] text-muted-foreground mb-1 uppercase text-left">
                        {item.date}
                      </p>
                      <p className="text-foreground font-display text-lg font-medium mb-2 text-left">{item.event}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed text-left">{item.description}</p>
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
