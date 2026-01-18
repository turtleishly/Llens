import { Trophy, Medal, Award, Star, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlurFade from "@/components/ui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

const prizes = [
  {
    icon: Trophy,
    position: "1ST PLACE",
    amount: "RM 16,000",
    color: "text-amber-500 dark:text-yellow-400",
    amountColor: "text-amber-600 dark:text-yellow-400",
    glow: "shadow-yellow-500/20",
    gradient: "from-yellow-500/10 to-transparent",
    benefits: [
      "Sunway Bursary",
      "Cert of Commendation",
    ],
  },
  {
    icon: Medal,
    position: "2ND PLACE",
    amount: "RM 12,000",
    color: "text-slate-600 dark:text-slate-300",
    amountColor: "text-slate-700 dark:text-slate-300",
    glow: "shadow-slate-400/20",
    gradient: "from-slate-400/10 to-transparent",
    benefits: [
      "Sunway Bursary",
      "Cert of Commendation",
    ],
  },
  {
    icon: Award,
    position: "3RD PLACE",
    amount: "RM 8,000",
    color: "text-amber-700 dark:text-amber-600",
    amountColor: "text-amber-800 dark:text-amber-600",
    glow: "shadow-amber-900/20",
    gradient: "from-amber-700/10 to-transparent",
    benefits: [
      "Sunway Bursary",
      "Cert of Commendation",
    ],
  },
  {
    icon: Star,
    position: "CONSOLATION",
    amount: "RM 5,000",
    color: "text-primary",
    amountColor: "text-primary",
    glow: "shadow-primary/20",
    gradient: "from-primary/10 to-transparent",
    benefits: ["Sunway Bursary", "Cert of Commendation"],
  },
];

const Prizes = () => {
  return (
    <section id="prizes" className="py-24 lg:py-32 relative px-4 md:px-8">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-foreground">
            Prizes & awards
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Big prizes for standout teams.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {prizes.map((prize, index) => (
            <BlurFade key={prize.position} delay={BLUR_FADE_DELAY * index} inView>
              <div
                className="group relative glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 h-full"
              >
                {/* Top Gradient */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${prize.gradient} opacity-50`} />

                <div className={`absolute inset-0 bg-gradient-to-b ${prize.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="p-8 text-center h-full flex flex-col relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 dark:bg-black/50 border border-black/5 dark:border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${prize.color}`}>
                    <prize.icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-lg font-bold font-display text-muted-foreground mb-2 tracking-widest">
                    {prize.position}
                  </h3>
                  <div className={`text-3xl md:text-4xl font-bold font-display mb-8 ${prize.amountColor || prize.color} drop-shadow-sm`}>
                    {prize.amount}
                  </div>

                  <div className="mt-auto space-y-3 text-left pl-2 border-l border-black/10 dark:border-white/10">
                    {prize.benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="text-sm text-muted-foreground flex items-start gap-3 group-hover:text-foreground transition-colors"
                      >
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${prize.color}`} />
                        <span>{benefit}</span>
                      </div>
                    ))}
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

export default Prizes;
