import { ArrowRight, UserPlus, GraduationCap, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import BlurFade from "@/components/ui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

const HowToApply = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: UserPlus,
      title: t("howToApply.steps.registerTeam.title"),
      items: [
        t("howToApply.steps.registerTeam.item1"),
        { text: t("howToApply.steps.registerTeam.item2"), link: "/naic/register" },
        t("howToApply.steps.registerTeam.item3"),
      ],
    },
    {
      icon: GraduationCap,
      title: t("howToApply.steps.learnBuild.title"),
      items: [
        t("howToApply.steps.learnBuild.item1"),
        t("howToApply.steps.learnBuild.item2"),
        t("howToApply.steps.learnBuild.item3"),
      ],
    },
    {
      icon: Send,
      title: t("howToApply.steps.submitPitch.title"),
      items: [
        t("howToApply.steps.submitPitch.item1"),
        t("howToApply.steps.submitPitch.item2"),
        t("howToApply.steps.submitPitch.item3"),
      ],
    },
  ];
  return (
    <section id="apply" className="bg-secondary/50 py-20 lg:py-32 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-glow">
            {t("howToApply.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("howToApply.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <BlurFade key={step.title} delay={BLUR_FADE_DELAY * index} inView>
              <Card
                className="group relative border-border/50 bg-background/50 hover:bg-background hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 h-full border-2 hover:border-primary/20"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center gap-6">
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-4 w-full">
                      <h3 className="text-2xl font-bold text-foreground">
                        {step.title}
                      </h3>
                      <ul className="space-y-3 text-left">
                        {step.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-muted-foreground leading-relaxed flex items-start gap-3"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                            <span className="text-sm md:text-base">
                              {typeof item === "string" ? (
                                item
                              ) : (
                                <Link
                                  to={item.link}
                                  className="text-primary hover:underline font-medium"
                                >
                                  {item.text}
                                </Link>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            className="h-14 px-10 rounded-full text-lg font-semibold bg-cyan-500 text-white hover:bg-cyan-600 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <Link to="/naic/register">
              {t("howToApply.registerNow")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowToApply;
