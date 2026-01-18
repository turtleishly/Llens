import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import DitheredBackground from "@/components/DitheredBackground";
import { useEffect } from "react";

export default function Privacy() {
    const updated = "January 19, 2026";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const tableOfContents = [
        { id: "tl-dr", title: "TL;DR" },
        { id: "intro", title: "Introduction" },
        { id: "what-we-collect", title: "What We Collect" },
        { id: "how-we-use", title: "How We Use Your Data" },
        { id: "disclosure", title: "Data Disclosure" },
        { id: "security", title: "Data Security" },
        { id: "retention", title: "Data Retention" },
        { id: "your-rights", title: "Your Rights" },
        { id: "contact", title: "Contact" },
    ];

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
                                Privacy Policy
                            </h1>
                        </BlurFade>

                        <BlurFade delay={0.05}>
                            <p className="text-center text-muted-foreground mb-8 font-medium uppercase tracking-[0.2em] text-xs">
                                Effective date: {updated}
                            </p>
                        </BlurFade>

                        <BlurFade delay={0.1}>
                            <p className="text-xl md:text-2xl text-center text-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
                                The National AI Competition (NAIC) 2026 is committed to protecting your privacy and handling your data transparently.
                            </p>
                        </BlurFade>
                    </div>
                </section>

                {/* Content Section */}
                <section className="px-4 md:px-6 py-20 relative z-10">
                    <div className="container max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">

                            {/* Table of Contents - Glass Style */}
                            <aside className="hidden lg:block">
                                <div className="sticky top-28 glass p-8 rounded-[2rem] border border-border/50 shadow-sm">
                                    <h3 className="font-bold text-sm uppercase tracking-[0.2em] text-foreground mb-6 font-display">
                                        Contents
                                    </h3>
                                    <nav className="flex flex-col gap-3">
                                        {tableOfContents.map((item) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className="text-base text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all py-1 font-light"
                                            >
                                                {item.title}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </aside>

                            {/* Main Content */}
                            <div className="space-y-24">
                                <BlurFade inView delay={0.1}>
                                    <section id="tl-dr" className="space-y-6">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">TL;DR</h2>
                                        <p className="text-muted-foreground leading-relaxed font-light text-xl">
                                            We collect necessary information to run NAIC 2026. This includes registration details, team info, and student status. We never sell your data and only share it with partners involved in organizing or judging the competition.
                                        </p>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="intro" className="space-y-6 text-muted-foreground font-light leading-relaxed text-lg">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">Introduction</h2>
                                        <p>
                                            This Privacy Policy explains how Rakan Tutor and Sunway University (collectively, "the Organisers", "we", "us", or "our") handle personal data when you register for and participate in the National AI Competition (NAIC) 2026.
                                        </p>
                                        <p>
                                            By registering for NAIC 2026, you agree to the collection and use of information in accordance with this policy. We adhere to the <a href="https://sunway.edu.my/personal-data-protection-notice-for-sunway-education-group" target="_blank" rel="noopener noreferrer" className="text-cyan-500 underline underline-offset-4 hover:text-cyan-600 transition-colors">Personal Data Protection Act (PDPA) 2010</a> of Malaysia.
                                        </p>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="what-we-collect" className="space-y-8">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">What We Collect</h2>
                                        <p className="text-muted-foreground font-light leading-relaxed text-lg">
                                            We collect information that you provide directly to us during registration, including:
                                        </p>
                                        <ul className="space-y-6">
                                            {[
                                                { label: "Account & Contact Info", desc: "Full name, email address, and phone number." },
                                                { label: "Identification", desc: "IC or Passport Number (for verification and certificate issuance)." },
                                                { label: "Education Details", desc: "School or institution name, current qualification, and expected graduation date." },
                                                { label: "Team Information", desc: "Team name, selected track, and category." },
                                                { label: "Advisor Information", desc: "Name, relationship, and contact details of your team's advisor." },
                                            ].map((item, i) => (
                                                <li key={i} className="flex gap-4">
                                                    <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
                                                    <div>
                                                        <span className="text-foreground font-semibold text-lg block">{item.label}</span>
                                                        <span className="text-muted-foreground font-light text-lg">{item.desc}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="how-we-use" className="space-y-6">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">How We Use Your Data</h2>
                                        <p className="text-muted-foreground font-light leading-relaxed text-lg">We use your personal data for the following purposes:</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {[
                                                "To process and manage your competition registration",
                                                "To communicate important updates and event details",
                                                "To verify participant eligibility and category placement",
                                                "To issue certificates of participation and achievement",
                                                "To facilitate competition judging and mentorship",
                                                "To improve the competition experience and reporting"
                                            ].map((item, i) => (
                                                <div key={i} className="p-6 rounded-2xl bg-secondary/30 border border-border/50 font-light text-muted-foreground">
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="disclosure" className="space-y-6 font-light text-muted-foreground leading-relaxed text-lg">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">Data Disclosure</h2>
                                        <p>We do not sell your personal data. We disclose data only to:</p>
                                        <ul className="list-disc pl-6 space-y-3">
                                            <li><strong className="text-foreground font-medium">Event Organisers:</strong> Authorized staff from Rakan Tutor and Sunway University.</li>
                                            <li><strong className="text-foreground font-medium">Judges & Mentors:</strong> Professional partners involved in the evaluation process.</li>
                                            <li><strong className="text-foreground font-medium">Service Providers:</strong> Hosting and data management partners (e.g., Google Cloud/Sheets).</li>
                                        </ul>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="security" className="space-y-6 font-light text-muted-foreground leading-relaxed text-lg">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">Data Security</h2>
                                        <p>
                                            We use industry-standard security measures to protect your data. This includes encryption in transit and at rest for our primary databases.
                                        </p>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="retention" className="space-y-6 font-light text-muted-foreground leading-relaxed text-lg">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">Data Retention</h2>
                                        <p>
                                            We retain your personal data for the duration of the competition and up to 12 months following the event for administrative, audit, and alumni purposes.
                                        </p>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="your-rights" className="space-y-6 font-light text-muted-foreground leading-relaxed text-lg">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">Your Rights</h2>
                                        <p>
                                            Under the PDPA 2010, you have the right to access and correct your personal data. To exercise these rights, please contact us at the email provided below. For more details on your rights and how your data is handled across the Sunway ecosystem, please refer to the <a href="https://sunway.edu.my/personal-data-protection-notice-for-sunway-education-group" target="_blank" rel="noopener noreferrer" className="text-cyan-500 underline underline-offset-4 hover:text-cyan-600 transition-colors">official Sunway Education Group PDPA Notice</a>.
                                        </p>
                                    </section>
                                </BlurFade>

                                <BlurFade inView delay={0.1}>
                                    <section id="contact" className="space-y-8 border-t border-border pt-16">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">Contact Us</h2>
                                        <div className="space-y-6">
                                            <p className="text-muted-foreground font-light leading-relaxed text-lg">
                                                If you have any questions about this Privacy Policy, please contact the organisers at:
                                            </p>
                                            <div className="flex flex-col gap-4">
                                                <a
                                                    href="mailto:clement@sunway.edu.my"
                                                    className="text-2xl md:text-3xl font-bold text-cyan-500 hover:text-cyan-600 transition-colors underline underline-offset-[8px] decoration-1"
                                                >
                                                    clement@sunway.edu.my
                                                </a>
                                                <a
                                                    href="mailto:mingjackt@sunway.edu"
                                                    className="text-2xl md:text-3xl font-bold text-cyan-500 hover:text-cyan-600 transition-colors underline underline-offset-[8px] decoration-1"
                                                >
                                                    mingjackt@sunway.edu
                                                </a>
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
