import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import DitheredBackground from "@/components/DitheredBackground";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Privacy() {
    const { t } = useTranslation();
    const updated = "January 19, 2026";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const tableOfContents = [
        { id: "tl-dr", title: t("privacy.sections.tldr.title") },
        { id: "minors", title: t("privacy.sections.minors.title") },
        { id: "intro", title: t("privacy.sections.intro.title") },
        { id: "what-we-collect", title: t("privacy.sections.collect.title") },
        { id: "how-we-use", title: t("privacy.sections.use.title") },
        { id: "media", title: t("privacy.sections.media.title") },
        { id: "disclosure", title: t("privacy.sections.disclosure.title") },
        { id: "security", title: t("privacy.sections.security.title") },
        { id: "contact", title: t("privacy.sections.contact.title") },
    ];

    const pdpaLink = (
        <a
            href="https://sunway.edu.my/personal-data-protection-notice-for-sunway-education-group"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-500 underline underline-offset-4 hover:text-cyan-600 transition-colors"
        >
            Personal Data Protection Act (PDPA) 2010
        </a>
    );

    return (
        <div className="min-h-screen bg-background transition-colors duration-300">
            <Header />

            <main className="relative">
                {/* Hero Section with specialized background */}
                <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-20 px-4 md:px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--hero-bg-from))_0%,hsl(var(--hero-bg-via))_45%,hsl(var(--hero-bg-to))_100%)]">
                        <DitheredBackground className="z-0" />
                    </div>

                    <div className="container relative z-10 max-w-4xl mx-auto">
                        <BlurFade delay={0}>
                            <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 tracking-tight font-display">
                                {t("privacy.hero.title")}
                            </h1>
                        </BlurFade>

                        <BlurFade delay={0.05}>
                            <p className="text-center text-muted-foreground mb-8 font-medium uppercase tracking-[0.2em] text-xs">
                                {t("privacy.hero.date", { date: updated })}
                            </p>
                        </BlurFade>

                        <BlurFade delay={0.1}>
                            <p className="text-xl md:text-2xl text-center text-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
                                {t("privacy.hero.desc")}
                            </p>
                        </BlurFade>
                    </div>
                </section>

                {/* Content Section */}
                <section className="px-4 md:px-6 py-20 relative z-10">
                    <div className="container max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 text-left">

                            {/* Table of Contents - Glass Style */}
                            <aside className="hidden lg:block">
                                <div className="sticky top-28 glass p-8 rounded-[2rem] border border-border/50 shadow-sm text-left">
                                    <h3 className="font-bold text-sm uppercase tracking-[0.2em] text-foreground mb-6 font-display text-left">
                                        {t("privacy.tocTitle")}
                                    </h3>
                                    <nav className="flex flex-col gap-3 text-left">
                                        {tableOfContents.map((item) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className="text-base text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all py-1 font-light text-left"
                                            >
                                                {item.title}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </aside>

                            {/* Main Content */}
                            <div className="space-y-24 text-left">
                                <BlurFade inView delay={0.1}>
                                    <section id="tl-dr" className="space-y-6 text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("privacy.sections.tldr.title")}</h2>
                                        <p className="text-muted-foreground leading-relaxed font-light text-xl text-left">
                                            {t("privacy.sections.tldr.desc")}
                                        </p>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="minors" className="space-y-6 font-light text-muted-foreground leading-relaxed text-lg text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("privacy.sections.minors.title")}</h2>
                                        <p className="text-left">
                                            {t("privacy.sections.minors.desc")}
                                        </p>
                                        <ul className="list-disc pl-6 space-y-3 text-left">
                                            {(t("privacy.sections.minors.items", { returnObjects: true }) as string[]).map((item, i) => (
                                                <li key={i} className="text-left">{item}</li>
                                            ))}
                                        </ul>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="intro" className="space-y-6 text-muted-foreground font-light leading-relaxed text-lg text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("privacy.sections.intro.title")}</h2>
                                        <p className="text-left">
                                            {t("privacy.sections.intro.p1")}
                                        </p>
                                        <p className="text-left">
                                            {t("privacy.sections.intro.p2").split("{{pdpaLink}}")[0]}
                                            {pdpaLink}
                                            {t("privacy.sections.intro.p2").split("{{pdpaLink}}")[1]}
                                        </p>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="what-we-collect" className="space-y-8 text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("privacy.sections.collect.title")}</h2>
                                        <p className="text-muted-foreground font-light leading-relaxed text-lg text-left">
                                            {t("privacy.sections.collect.desc")}
                                        </p>
                                        <ul className="space-y-6 text-left">
                                            {(t("privacy.sections.collect.items", { returnObjects: true }) as Array<{ label: string; desc: string }>).map((item, i) => (
                                                <li key={i} className="flex gap-4 text-left">
                                                    <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0 text-left" />
                                                    <div className="text-left">
                                                        <span className="text-foreground font-semibold text-lg block text-left">{item.label}</span>
                                                        <span className="text-muted-foreground font-light text-lg text-left">{item.desc}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="how-we-use" className="space-y-6 text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("privacy.sections.use.title")}</h2>
                                        <p className="text-muted-foreground font-light leading-relaxed text-lg text-left">{t("privacy.sections.use.desc")}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                            {(t("privacy.sections.use.items", { returnObjects: true }) as string[]).map((item, i) => (
                                                <div key={i} className="p-6 rounded-2xl bg-secondary/30 border border-border/50 font-light text-muted-foreground text-left">
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="media" className="space-y-6 font-light text-muted-foreground leading-relaxed text-lg text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("privacy.sections.media.title")}</h2>
                                        <p className="text-left">
                                            {t("privacy.sections.media.desc")}
                                        </p>
                                        <ul className="list-disc pl-6 space-y-3 text-left">
                                            {(t("privacy.sections.media.items", { returnObjects: true }) as string[]).map((item, i) => (
                                                <li key={i} className="text-left">{item}</li>
                                            ))}
                                        </ul>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="disclosure" className="space-y-6 font-light text-muted-foreground leading-relaxed text-lg text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("privacy.sections.disclosure.title")}</h2>
                                        <p className="text-left">{t("privacy.sections.disclosure.desc")}</p>
                                        <ul className="list-disc pl-6 space-y-3 text-left">
                                            {(t("privacy.sections.disclosure.items", { returnObjects: true }) as string[]).map((item, i) => (
                                                <li key={i} className="text-left">
                                                    <strong className="text-foreground font-medium text-left">{item.split(':')[0]}:</strong>{item.split(':')[1]}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="security" className="space-y-6 font-light text-muted-foreground leading-relaxed text-lg text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("privacy.sections.security.title")}</h2>
                                        <p className="text-left">
                                            {t("privacy.sections.security.desc")}
                                        </p>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="contact" className="space-y-8 border-t border-border pt-16 text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("privacy.sections.contact.title")}</h2>
                                        <div className="space-y-6 text-left">
                                            <p className="text-muted-foreground font-light leading-relaxed text-lg text-left">
                                                {t("privacy.sections.contact.desc")}
                                            </p>
                                            <div className="flex flex-col gap-6 text-left">
                                                <div className="space-y-2 text-left">
                                                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider text-left">{t("privacy.sections.contact.emailLabel")}</p>
                                                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-left">
                                                        <a
                                                            href="mailto:mingjackt@sunway.edu.my"
                                                            className="text-2xl md:text-3xl font-bold text-cyan-500 hover:text-cyan-600 transition-colors underline underline-offset-[8px] decoration-1 text-left"
                                                        >
                                                            mingjackt@sunway.edu.my (Jack)
                                                        </a>
                                                        <a
                                                            href="mailto:clemen@sunway.edu.my"
                                                            className="text-2xl md:text-3xl font-bold text-cyan-500 hover:text-cyan-600 transition-colors underline underline-offset-[8px] decoration-1 text-left"
                                                        >
                                                            clemen@sunway.edu.my (Clemen)
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="space-y-2 text-left">
                                                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider text-left">{t("privacy.sections.contact.whatsappLabel")}</p>
                                                    <a
                                                        href="https://wa.me/60192004268"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-2xl md:text-3xl font-bold text-cyan-500 hover:text-cyan-600 transition-colors underline underline-offset-[8px] decoration-1 text-left"
                                                    >
                                                        Jack at (019-200 4268)
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </BlurFade>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
