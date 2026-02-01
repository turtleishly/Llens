import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import DitheredBackground from "@/components/DitheredBackground";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Terms() {
    const { t } = useTranslation();
    const updated = "January 19, 2026";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const tableOfContents = [
        { id: "eligibility", title: t("terms.sections.eligibility.title") },
        { id: "participation", title: t("terms.sections.participation.title") },
        { id: "top-60", title: t("terms.sections.finalists.title") },
        { id: "originality", title: t("terms.sections.originality.title") },
        { id: "liability", title: t("terms.sections.liability.title") },
        { id: "bursary", title: t("terms.sections.bursary.title") },
        { id: "contact", title: t("terms.sections.contact.title") },
    ];

    return (
        <div className="min-h-screen bg-background transition-colors duration-300">
            <Header />

            <main className="relative">
                {/* Hero Section */}
                <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-20 px-4 md:px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--hero-bg-from))_0%,hsl(var(--hero-bg-via))_45%,hsl(var(--hero-bg-to))_100%)]">
                        <DitheredBackground className="z-0" />
                    </div>

                    <div className="container relative z-10 max-w-4xl mx-auto text-center">
                        <BlurFade delay={0}>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-display text-center">
                                {t("terms.hero.title")}
                            </h1>
                        </BlurFade>

                        <BlurFade delay={0.05}>
                            <p className="text-muted-foreground mb-8 font-medium uppercase tracking-[0.2em] text-xs text-center">
                                {t("terms.hero.updated", { date: updated })}
                            </p>
                        </BlurFade>
                    </div>
                </section>

                {/* Content Section */}
                <section className="px-4 md:px-6 py-20 relative z-10">
                    <div className="container max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 text-left">

                            {/* Table of Contents */}
                            <aside className="hidden lg:block relative text-left">
                                <div className="sticky top-28 glass p-8 rounded-[2rem] border border-border/50 shadow-sm text-left">
                                    <h3 className="font-bold text-sm uppercase tracking-[0.2em] text-foreground mb-6 font-display text-left">
                                        {t("terms.tocTitle")}
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
                                {/* Eligibility */}
                                <BlurFade inView delay={0.1}>
                                    <section id="eligibility" className="space-y-8 text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("terms.sections.eligibility.title")}</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                            <div className="p-8 rounded-[2rem] bg-secondary/30 border border-border/50 text-left">
                                                <h3 className="text-xl font-bold mb-4 font-display text-left">{t("terms.sections.eligibility.catA")}</h3>
                                                <ul className="space-y-3 text-muted-foreground font-light text-base text-left">
                                                    {(t("terms.sections.eligibility.catAItems", { returnObjects: true }) as string[]).map((item, i) => (
                                                        <li key={i}>• {item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="p-8 rounded-[2rem] bg-secondary/30 border border-border/50 text-left">
                                                <h3 className="text-xl font-bold mb-4 font-display text-left">{t("terms.sections.eligibility.catB")}</h3>
                                                <ul className="space-y-3 text-muted-foreground font-light text-base text-left">
                                                    {(t("terms.sections.eligibility.catBItems", { returnObjects: true }) as string[]).map((item, i) => (
                                                        <li key={i}>• {item}</li>
                                                    ))}
                                                </ul>
                                                <p className="mt-4 text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                                                    {t("terms.sections.eligibility.catBNote")}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-8 rounded-[2rem] glass border-cyan-500/20 space-y-4 text-left">
                                            <p className="text-lg font-light text-foreground/90 leading-relaxed text-left">
                                                • {t("terms.sections.eligibility.dateCondition")}
                                            </p>
                                            <p className="text-lg font-light text-foreground/90 leading-relaxed text-left">
                                                • {t("terms.sections.eligibility.statusCondition")}
                                            </p>
                                            <div className="p-4 bg-cyan-500/10 border-l-4 border-cyan-500 text-sm font-medium text-cyan-600 dark:text-cyan-400 rounded-r-xl text-left">
                                                • {t("terms.sections.eligibility.consentCondition")}<br /><br />
                                                • {t("terms.sections.eligibility.teamCondition")}
                                            </div>
                                        </div>
                                    </section>
                                </BlurFade>

                                {/* Participation */}
                                <BlurFade inView delay={0.1}>
                                    <section id="participation" className="space-y-6 text-lg font-light text-muted-foreground leading-relaxed text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("terms.sections.participation.title")}</h2>
                                        <p className="text-left">
                                            {t("terms.sections.participation.free")} <span className="text-foreground font-semibold uppercase">{t("terms.sections.participation.freeHighlight")}</span>.
                                        </p>
                                    </section>
                                </BlurFade>

                                {/* Top 60 Finalists */}
                                <BlurFade inView delay={0.1}>
                                    <section id="top-60" className="space-y-8 text-base font-light text-muted-foreground leading-relaxed text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("terms.sections.finalists.title")}</h2>
                                        <ul className="space-y-6 text-left">
                                            <li className="flex gap-4 text-left">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
                                                <p className="text-left">{t("terms.sections.finalists.item1")}</p>
                                            </li>
                                            <li className="flex gap-4 text-left">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
                                                <p className="text-left">{t("terms.sections.finalists.item2")}</p>
                                            </li>
                                            <li className="flex gap-4 text-left">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
                                                <div className="text-left">
                                                    <p className="mb-4 text-left">{t("terms.sections.finalists.covenant")}</p>
                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                                                        {(t("terms.sections.finalists.covenants", { returnObjects: true }) as string[]).map((text, i) => (
                                                            <li key={i} className="p-4 rounded-xl bg-secondary/30 border border-border/50 text-sm text-left">
                                                                • {text}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </li>
                                            <li className="flex gap-4 text-left">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0 text-left" />
                                                <p className="text-left">{t("terms.sections.finalists.useOfMaterials")}</p>
                                            </li>
                                            <li className="flex gap-4 text-left">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0 text-left" />
                                                <p className="text-left">{t("terms.sections.finalists.pdpa")}</p>
                                            </li>
                                            <li className="flex gap-4 text-left">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0 text-left" />
                                                <p className="text-left">{t("terms.sections.finalists.mediaConsent")}</p>
                                            </li>
                                            <li className="flex gap-4 text-left">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0 text-left" />
                                                <p className="text-left">{t("terms.sections.finalists.judgingFinal")}</p>
                                            </li>
                                            <li className="flex gap-4 text-left">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0 text-left" />
                                                <p className="text-left">{t("terms.sections.finalists.amendments")}</p>
                                            </li>
                                            <li className="flex gap-4 text-left">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0 text-left" />
                                                <p className="text-left">{t("terms.sections.finalists.representative")}</p>
                                            </li>
                                        </ul>
                                    </section>
                                </BlurFade>

                                {/* Originality & Rights */}
                                <BlurFade inView delay={0.1}>
                                    <section id="originality" className="space-y-6 text-lg font-light text-muted-foreground leading-relaxed text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("terms.sections.originality.title")}</h2>
                                        <p className="text-left">
                                            {t("terms.sections.originality.desc")}
                                        </p>
                                        <ul className="space-y-4 text-left">
                                            <li className="flex gap-4 text-left">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0 text-left" />
                                                <p className="text-left">{t("terms.sections.originality.item1")}</p>
                                            </li>
                                            <li className="flex gap-4 text-left">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0 text-left" />
                                                <p className="text-left">{t("terms.sections.originality.item2")}</p>
                                            </li>
                                        </ul>
                                    </section>
                                </BlurFade>

                                {/* Liability & Conduct */}
                                <BlurFade inView delay={0.1}>
                                    <section id="liability" className="space-y-8 text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("terms.sections.liability.title")}</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                            <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 space-y-4 text-left">
                                                <h3 className="font-bold text-foreground text-left">{t("terms.sections.liability.limitationTitle")}</h3>
                                                <p className="text-sm text-muted-foreground font-light leading-relaxed text-left">
                                                    {t("terms.sections.liability.limitationDesc")}
                                                </p>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 space-y-4 text-left">
                                                <h3 className="font-bold text-foreground text-left">{t("terms.sections.liability.ethicsTitle")}</h3>
                                                <p className="text-sm text-muted-foreground font-light leading-relaxed text-left">
                                                    {t("terms.sections.liability.ethicsDesc")}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-8 rounded-[2rem] glass border-red-500/10 space-y-6 text-left">
                                            <p className="text-base font-light text-muted-foreground text-left">
                                                <span className="font-semibold text-foreground text-left">{t("terms.sections.liability.indemnity").split(':')[0]}:</span> {t("terms.sections.liability.indemnity").split(':')[1]}
                                            </p>
                                            <div className="space-y-4 text-left">
                                                <p className="text-foreground font-semibold text-left">{t("terms.sections.liability.notResponsible")}</p>
                                                <ul className="space-y-3 text-sm text-muted-foreground font-light px-4 text-left">
                                                    {(t("terms.sections.liability.notResponsibleItems", { returnObjects: true }) as string[]).map((item, i) => (
                                                        <li key={i} className="list-disc leading-relaxed text-left">{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </section>
                                </BlurFade>

                                {/* Bursary Conditions */}
                                <BlurFade inView delay={0.1}>
                                    <section id="bursary" className="space-y-8 text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("terms.sections.bursary.title")}</h2>
                                        <p className="text-lg font-light text-muted-foreground leading-relaxed text-left">
                                            {t("terms.sections.bursary.desc")}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                            <div className="p-8 rounded-[2rem] bg-secondary/30 border border-border/50 text-left">
                                                <h3 className="text-xl font-bold mb-4 font-display underline decoration-cyan-500/50 text-left">{t("terms.sections.bursary.catA")}</h3>
                                                <p className="text-muted-foreground font-light text-base text-left">
                                                    {t("terms.sections.bursary.catADesc")}
                                                </p>
                                            </div>
                                            <div className="p-8 rounded-[2rem] bg-secondary/30 border border-border/50 text-left">
                                                <h3 className="text-xl font-bold mb-4 font-display underline decoration-cyan-500/50 text-left">{t("terms.sections.bursary.catB")}</h3>
                                                <p className="text-muted-foreground font-light text-base text-left">
                                                    {t("terms.sections.bursary.catBDesc")}
                                                </p>
                                            </div>
                                        </div>

                                        <ul className="space-y-6 text-base font-light text-muted-foreground text-left">
                                            {[...Array(12)].map((_, i) => (
                                                <li key={i} className="flex gap-4 items-start text-left">
                                                    <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 shrink-0 text-left" />
                                                    <p className="text-left">{t(`terms.sections.bursary.item${i + 1}`)}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </BlurFade>

                                {/* Contact */}
                                <BlurFade inView delay={0.1}>
                                    <section id="contact" className="space-y-8 border-t border-border pt-16 text-left">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground text-left">{t("terms.sections.contact.title")}</h2>
                                        <div className="space-y-6 text-left">
                                            <p className="text-muted-foreground font-light leading-relaxed text-lg text-left">
                                                {t("terms.sections.contact.desc")}
                                            </p>
                                            <div className="flex flex-col gap-6 text-left">
                                                <div className="space-y-2 text-left">
                                                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider text-left">{t("terms.sections.contact.emailLabel")}</p>
                                                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-left">
                                                        <a
                                                            href="mailto:clement@sunway.edu.my"
                                                            className="text-2xl md:text-3xl font-bold text-cyan-500 hover:text-cyan-600 transition-colors underline underline-offset-[8px] decoration-1 text-left"
                                                        >
                                                            clement@sunway.edu.my
                                                        </a>
                                                        <a
                                                            href="mailto:mingjackt@sunway.edu.my"
                                                            className="text-2xl md:text-3xl font-bold text-cyan-500 hover:text-cyan-600 transition-colors underline underline-offset-[8px] decoration-1 text-left"
                                                        >
                                                            mingjackt@sunway.edu.my
                                                        </a>
                                                    </div>
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
