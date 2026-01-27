import { Building2, Cpu, Lightbulb, Monitor, Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BlurFade from "@/components/ui/blur-fade";
import { useTranslation } from "react-i18next";

const BLUR_FADE_DELAY = 0.04;

const Tracks = () => {
  const { t } = useTranslation();

  const tracks = [
    {
      emoji: "💡",
      title: t("tracks.innovation.title"),
      description: t("tracks.innovation.description"),
      bgColor: "bg-[#F0F4E8] dark:bg-emerald-950/20",
      href: "/tracks#innovation"
    },
    {
      emoji: "⚙️",
      title: t("tracks.engineering.title"),
      description: t("tracks.engineering.description"),
      bgColor: "bg-[#FDF6E3] dark:bg-amber-950/20",
      href: "/tracks#engineering"
    },
    {
      emoji: "🎬",
      title: t("tracks.genai.title"),
      description: t("tracks.genai.description"),
      bgColor: "bg-[#F5F0F9] dark:bg-purple-950/20",
      href: "/tracks#genai"
    },
    {
      emoji: "💻",
      title: t("tracks.computing.title"),
      description: t("tracks.computing.description"),
      bgColor: "bg-[#E6F4F1] dark:bg-cyan-950/20",
      href: "/tracks#computing"
    },
    {
      emoji: "🏛️",
      title: t("tracks.architecture.title"),
      description: t("tracks.architecture.description"),
      bgColor: "bg-[#FBE9E9] dark:bg-rose-950/20",
      href: "/tracks#architecture"
    },
  ];

  return (
    <section id="tracks" className="relative py-32 bg-background px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-6 text-left">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                {t("tracks.title")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed font-light">
                {t("tracks.subtitle")}
              </p>
            </div>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/register">
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <Button asChild variant="outline" className="rounded-full px-8 py-6 group">
            <Link to="/tracks">
              {t("tracks.cta")}
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
