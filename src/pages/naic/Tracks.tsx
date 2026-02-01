import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Paintbrush, Lightbulb, Monitor, Settings, Building2, ArrowRight, CheckCircle2, Video } from "lucide-react";
import { useTranslation } from "react-i18next";

const BLUR_FADE_DELAY = 0.05;

const TracksPage = () => {
    const { t } = useTranslation();

    const tracksData = [
        {
            id: "innovation",
            title: t("tracksDetail.innovation.title"),
            icon: <Lightbulb className="w-8 h-8" />,
            color: "from-amber-500 to-orange-500",
            bgColor: "bg-amber-500/10",
            borderColor: "border-amber-500/20",
            overview: t("tracksDetail.innovation.overview"),
            theme: t("tracksDetail.innovation.theme"),
            whoIsThisFor: t("tracksDetail.innovation.whoIsThisFor"),
            deliverables: t("tracksDetail.innovation.deliverables"),
            examples: [
                t("tracksDetail.innovation.example1"),
                t("tracksDetail.innovation.example2")
            ],
            judging: [
                { title: t("tracksDetail.innovation.judging1.title"), description: t("tracksDetail.innovation.judging1.desc") },
                { title: t("tracksDetail.innovation.judging2.title"), description: t("tracksDetail.innovation.judging2.desc") },
                { title: t("tracksDetail.innovation.judging3.title"), description: t("tracksDetail.innovation.judging3.desc") }
            ]
        },
        {
            id: "engineering",
            title: t("tracksDetail.engineering.title"),
            icon: <Settings className="w-8 h-8" />,
            color: "from-blue-500 to-indigo-500",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
            overview: t("tracksDetail.engineering.overview"),
            theme: t("tracksDetail.engineering.theme"),
            whoIsThisFor: t("tracksDetail.engineering.whoIsThisFor"),
            deliverables: t("tracksDetail.engineering.deliverables"),
            examples: [
                t("tracksDetail.engineering.example1"),
                t("tracksDetail.engineering.example2")
            ],
            judging: [
                { title: t("tracksDetail.engineering.judging1.title"), description: t("tracksDetail.engineering.judging1.desc") },
                { title: t("tracksDetail.engineering.judging2.title"), description: t("tracksDetail.engineering.judging2.desc") },
                { title: t("tracksDetail.engineering.judging3.title"), description: t("tracksDetail.engineering.judging3.desc") }
            ]
        },
        {
            id: "genai",
            title: t("tracksDetail.genai.title"),
            icon: <Video className="w-8 h-8" />,
            color: "from-pink-500 to-rose-500",
            bgColor: "bg-pink-500/10",
            borderColor: "border-pink-500/20",
            overview: t("tracksDetail.genai.overview"),
            theme: t("tracksDetail.genai.theme"),
            whoIsThisFor: t("tracksDetail.genai.whoIsThisFor"),
            deliverables: t("tracksDetail.genai.deliverables"),
            examples: [
                t("tracksDetail.genai.example1"),
                t("tracksDetail.genai.example2")
            ],
            judging: [
                { title: t("tracksDetail.genai.judging1.title"), description: t("tracksDetail.genai.judging1.desc") },
                { title: t("tracksDetail.genai.judging2.title"), description: t("tracksDetail.genai.judging2.desc") },
                { title: t("tracksDetail.genai.judging3.title"), description: t("tracksDetail.genai.judging3.desc") }
            ]
        },
        {
            id: "computing",
            title: t("tracksDetail.computing.title"),
            icon: <Monitor className="w-8 h-8" />,
            color: "from-cyan-500 to-blue-500",
            bgColor: "bg-cyan-500/10",
            borderColor: "border-cyan-500/20",
            overview: t("tracksDetail.computing.overview"),
            theme: t("tracksDetail.computing.theme"),
            whoIsThisFor: t("tracksDetail.computing.whoIsThisFor"),
            deliverables: t("tracksDetail.computing.deliverables"),
            examples: [
                t("tracksDetail.computing.example1"),
                t("tracksDetail.computing.example2")
            ],
            judging: [
                { title: t("tracksDetail.computing.judging1.title"), description: t("tracksDetail.computing.judging1.desc") },
                { title: t("tracksDetail.computing.judging2.title"), description: t("tracksDetail.computing.judging2.desc") },
                { title: t("tracksDetail.computing.judging3.title"), description: t("tracksDetail.computing.judging3.desc") }
            ]
        },
        {
            id: "architecture",
            title: t("tracksDetail.architecture.title"),
            icon: <Building2 className="w-8 h-8" />,
            color: "from-emerald-500 to-teal-500",
            bgColor: "bg-emerald-500/10",
            borderColor: "border-emerald-500/20",
            overview: t("tracksDetail.architecture.overview"),
            theme: t("tracksDetail.architecture.theme"),
            whoIsThisFor: t("tracksDetail.architecture.whoIsThisFor"),
            deliverables: t("tracksDetail.architecture.deliverables"),
            examples: [
                t("tracksDetail.architecture.example1"),
                t("tracksDetail.architecture.example2")
            ],
            judging: [
                { title: t("tracksDetail.architecture.judging1.title"), description: t("tracksDetail.architecture.judging1.desc") },
                { title: t("tracksDetail.architecture.judging2.title"), description: t("tracksDetail.architecture.judging2.desc") },
                { title: t("tracksDetail.architecture.judging3.title"), description: t("tracksDetail.architecture.judging3.desc") }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-32 pb-20 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    {/* Hero Section */}
                    <BlurFade delay={BLUR_FADE_DELAY}>
                        <div className="text-center mb-20">
                            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4 text-center">
                                {t("tracksDetail.hero.subtitle")}
                            </h2>
                            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 text-center">
                                {t("tracksDetail.hero.title")} <span className="text-primary">{t("tracksDetail.hero.titleHighlight")}</span>
                            </h1>
                            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-center">
                                {t("tracksDetail.hero.desc")}
                            </p>
                            <div className="mt-8">
                                <Button asChild size="lg" className="rounded-full">
                                    <Link to="/naic/register">
                                        Register Now
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </BlurFade>

                    {/* Navigation between tracks */}
                    <BlurFade delay={BLUR_FADE_DELAY * 2}>
                        <div className="flex flex-wrap justify-center gap-4 mb-20">
                            {tracksData.map((track) => (
                                <a
                                    key={track.id}
                                    href={`#${track.id}`}
                                    className="px-6 py-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all font-medium"
                                >
                                    {track.title}
                                </a>
                            ))}
                        </div>
                    </BlurFade>

                    {/* Tracks Content */}
                    <div className="space-y-32">
                        {tracksData.map((track, index) => (
                            <section id={track.id} key={track.id} className="scroll-mt-32">
                                <BlurFade delay={BLUR_FADE_DELAY * (index + 3)}>
                                    <div className="grid lg:grid-cols-2 gap-12 items-start text-left">
                                        <div className="space-y-8">
                                            <div className="inline-flex items-center gap-4 p-3 rounded-2xl bg-primary/10 text-primary mb-2">
                                                {track.icon}
                                                <h2 className="text-3xl font-bold tracking-tight uppercase" style={{ fontFamily: "'Orbitron', sans-serif" }}>{track.title}</h2>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-3 text-left">{t("tracksDetail.headers.challengeOverview")}</h3>
                                                    <p className="text-xl leading-relaxed text-foreground/90 text-left">
                                                        {track.overview}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-3 text-left">{t("tracksDetail.headers.whoIsThisFor")}</h3>
                                                    <p className="text-lg text-muted-foreground text-left">
                                                        {track.whoIsThisFor}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-3 text-left">{t("tracksDetail.headers.keyDeliverables")}</h3>
                                                    <p className="text-lg text-muted-foreground leading-relaxed text-left">
                                                        {track.deliverables}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className={`p-8 rounded-3xl border ${track.borderColor} ${track.bgColor} backdrop-blur-sm`}>
                                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-left">
                                                    {t("tracksDetail.headers.exampleSubmission")}
                                                </h3>
                                                <div className="grid gap-4">
                                                    {track.examples.map((example, i) => (
                                                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-border/50 text-left">
                                                            <div className="mt-1">
                                                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                                            </div>
                                                            <p className="font-medium text-left">{example}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                <h3 className="text-xl font-bold mt-10 mb-6 text-left">{t("tracksDetail.headers.judgingCriteria")}</h3>
                                                <div className="grid gap-6">
                                                    {track.judging.map((criterion, i) => (
                                                        <div key={i} className="flex gap-4 text-left">
                                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                                                {i + 1}
                                                            </div>
                                                            <div className="text-left">
                                                                <h4 className="font-bold text-left">{criterion.title}</h4>
                                                                <p className="text-sm text-muted-foreground text-left">{criterion.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="p-8 rounded-3xl bg-primary dark:bg-zinc-950 border border-primary/20 dark:border-zinc-800 text-primary-foreground dark:text-white shadow-2xl overflow-hidden relative group text-left">
                                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity">
                                                    {track.icon}
                                                </div>
                                                <h3 className="text-xl font-bold mb-4 text-left">{track.theme ? t("tracksDetail.headers.trackTheme") : t("tracksDetail.headers.defaultTheme")}</h3>
                                                <div className="text-primary-foreground/80 dark:text-zinc-400 mb-8 leading-relaxed text-left">
                                                    {track.theme ? (
                                                        <p className="text-2xl font-bold italic text-white animate-in fade-in slide-in-from-bottom-2 duration-700 text-left">
                                                            "{track.theme}"
                                                        </p>
                                                    ) : (
                                                        <p className="text-left">
                                                            {t("tracksDetail.headers.exclusiveAnnouncement")}
                                                        </p>
                                                    )}
                                                </div>
                                                <Button asChild className="w-full bg-background text-foreground hover:bg-background/90 rounded-full py-6 text-lg font-bold uppercase transition-transform hover:scale-[1.02]">
                                                    <Link to="/naic/register">
                                                        {t("nav.registerNow")} <ArrowRight className="ml-2 w-5 h-5" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </BlurFade>
                                {index < tracksData.length - 1 && (
                                    <div className="mt-32 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                                )}
                            </section>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <BlurFade delay={BLUR_FADE_DELAY * 8}>
                        <div className="mt-40 text-center p-12 md:p-20 rounded-[3rem] bg-gradient-to-b from-primary/10 to-transparent border border-primary/20">
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 italic text-center">{t("tracksDetail.cta.ready")}</h2>
                            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 text-center">
                                {t("tracksDetail.cta.join")}
                            </p>
                            <Button asChild size="lg" className="rounded-full px-12 py-8 text-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                                <Link to="/naic/register">{t("tracksDetail.cta.registerTeam")}</Link>
                            </Button>
                        </div>
                    </BlurFade>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TracksPage;
