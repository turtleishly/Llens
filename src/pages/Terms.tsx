import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import DitheredBackground from "@/components/DitheredBackground";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Terms() {
    const updated = "January 19, 2026";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const tableOfContents = [
        { id: "eligibility", title: "Eligibility" },
        { id: "participation", title: "Participation" },
        { id: "top-60", title: "Top 60 Winners" },
        { id: "originality", title: "Originality & Rights" },
        { id: "liability", title: "Liability & Conduct" },
        { id: "bursary", title: "Bursary Conditions" },
        { id: "contact", title: "Contact" },
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
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-display">
                                Terms & Conditions
                            </h1>
                        </BlurFade>

                        <BlurFade delay={0.05}>
                            <p className="text-muted-foreground mb-8 font-medium uppercase tracking-[0.2em] text-xs">
                                Last Updated: {updated}
                            </p>
                        </BlurFade>
                    </div>
                </section>

                {/* Content Section */}
                <section className="px-4 md:px-6 py-20 relative z-10">
                    <div className="container max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">

                            {/* Table of Contents */}
                            <aside className="hidden lg:block relative">
                                <div className="sticky top-28 glass p-8 rounded-[2rem] border border-border/50 shadow-sm">
                                    <h3 className="font-bold text-sm uppercase tracking-[0.2em] text-foreground mb-6 font-display">
                                        Sections
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
                                {/* Eligibility */}
                                <BlurFade inView delay={0.1}>
                                    <section id="eligibility" className="space-y-8">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">Eligibility & Conditions of Entry</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="p-8 rounded-[2rem] bg-secondary/30 border border-border/50">
                                                <h3 className="text-xl font-bold mb-4 font-display">Category A</h3>
                                                <ul className="space-y-3 text-muted-foreground font-light text-base">
                                                    <li>• Form 4 and Form 5 (National and Private Schools)</li>
                                                    <li>• Year 10 and Year 11 (International Schools)</li>
                                                    <li>• Senior Middle 1 and Senior Middle 2 (Chinese Independent Schools)</li>
                                                </ul>
                                            </div>
                                            <div className="p-8 rounded-[2rem] bg-secondary/30 border border-border/50">
                                                <h3 className="text-xl font-bold mb-4 font-display">Category B</h3>
                                                <ul className="space-y-3 text-muted-foreground font-light text-base">
                                                    <li>• Senior Middle 3 / UEC (Chinese Independent Schools)</li>
                                                    <li>• Form 6 / STPM (National Schools)</li>
                                                    <li>• Pre-Universities students from MQA-accredited institutions</li>
                                                    <li>• Diploma students from MQA-accredited institutions</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="p-8 rounded-[2rem] glass border-cyan-500/20 space-y-4">
                                            <p className="text-lg font-light text-foreground/90 leading-relaxed">
                                                • Only those whose graduation date falls after <span className="font-bold">13 June 2026</span> are eligible to participate in the Competition.
                                            </p>
                                            <p className="text-lg font-light text-foreground/90 leading-relaxed">
                                                • This condition is set to ensure that all participants maintain active student status throughout the competition period.
                                            </p>
                                            <p className="p-4 bg-cyan-500/10 border-l-4 border-cyan-500 text-sm font-medium text-cyan-600 dark:text-cyan-400 rounded-r-xl">
                                                • For participants under the age of 18, participation is subject to the consent of a parent or legal guardian. By submitting an entry, the participant represents that such consent has been obtained.<br /><br />
                                                • If any one (1) team member falls under Category B, the entire team will be registered under Category B.
                                            </p>
                                        </div>
                                    </section>
                                </BlurFade>

                                {/* Participation */}
                                <BlurFade inView delay={0.1}>
                                    <section id="participation" className="space-y-6 text-lg font-light text-muted-foreground leading-relaxed">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">Participation</h2>
                                        <p>
                                            Participation in the Competition is <span className="text-foreground font-semibold">free of charge</span>.
                                        </p>
                                    </section>
                                </BlurFade>

                                {/* Top 60 Winners */}
                                <BlurFade inView delay={0.1}>
                                    <section id="top-60" className="space-y-8 text-base font-light text-muted-foreground leading-relaxed">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">Conditions for Top 60 Winners</h2>
                                        <ul className="space-y-6">
                                            <li className="flex gap-4">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
                                                <p>The Organisers will make every reasonable effort to notify the Top 60 winners via email to attend the prize-giving ceremony, which will be held on <span className="text-foreground font-medium">13 June 2026, Saturday</span> at Sunway University, Bandar Sunway.</p>
                                            </li>
                                            <li className="flex gap-4">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
                                                <p>The Organisers reserve the right to request written proof and age of any Competition winner before the prize is dispatched or collected.</p>
                                            </li>
                                            <li className="flex gap-4">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
                                                <div>
                                                    <p className="mb-4">By submitting the entry, the participants covenant to the Organisers that:</p>
                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {[
                                                            "The participant is the author of the submitted work",
                                                            "The submitted work is original and unpublished",
                                                            "He/She has read and agreed to be bound by the terms and conditions of this Competition",
                                                            "All the information provided are true and accurate",
                                                            "To bear any consequences (including automatically be disqualified) in the event of breach of any covenants"
                                                        ].map((text, i) => (
                                                            <li key={i} className="p-4 rounded-xl bg-secondary/30 border border-border/50 text-sm">
                                                                • {text}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </li>
                                            <li className="flex gap-4">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
                                                <p>All submissions must be original works created by the participating teams. By participating, teams grant Sunway College, Sunway University and Rakan Tutor the right to use participants' names, photos, and submitted materials for promotional, educational, and marketing purposes. <strong>Attendance at the prize-giving ceremony at Sunway University constitutes consent to be photographed or filmed for official promotional use.</strong></p>
                                            </li>
                                            <li className="flex gap-4">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
                                                <p>In compliance with the <a href="https://sunway.edu.my/personal-data-protection-notice-for-sunway-education-group" target="_blank" rel="noopener noreferrer" className="text-cyan-500 underline underline-offset-4 hover:text-cyan-600 transition-colors">Personal Data Protection Act (PDPA) 2010</a>, visit the official Sunway Education Group notice for more information on how the Organisers may collect and use your personal information.</p>
                                            </li>
                                            <li className="flex gap-4">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
                                                <p>The winner agrees to allow Sunway and its advertising and promotional agencies to publish his/her name and/or photographs and/or winner's participating photographs and/or essay or any parts thereof without further compensation and notice.</p>
                                            </li>
                                            <li className="flex gap-4">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
                                                <p>The Organisers reserve the right to substitute prizes that have an equal or greater monetary value than the prizes offered in the Competition notice. Prizes that remain unclaimed by the winners within <span className="text-foreground font-medium">30 working days</span> from the day of the prize-giving ceremony will be forfeited and thereafter, the Organisers shall have no obligation to substitute any alternative prize, cash equivalent or other compensation to the winners.</p>
                                            </li>
                                            <li className="flex gap-4">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
                                                <p>In special situations, and subject to the Organisers' absolute discretion, the Competition winner may nominate a representative to collect the prize on his/her behalf. The representative will be required to present written authorisation from the winner and identification which includes a photograph for both the winner and the representative.</p>
                                            </li>
                                        </ul>
                                    </section>
                                </BlurFade>

                                {/* Liability & Conduct */}
                                <BlurFade inView delay={0.1}>
                                    <section id="liability" className="space-y-8">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">Liability & Code of Conduct</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 space-y-4">
                                                <h3 className="font-bold text-foreground">Limitation of Liability</h3>
                                                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                                                    To the maximum extent permitted by law, the Organisers shall not be liable for any direct, indirect, or consequential loss, damage, or injury arising from participation in the Competition or attendance at event venues. The Organisers are not responsible for technical failures, lost submissions, or service interruptions.
                                                </p>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 space-y-4">
                                                <h3 className="font-bold text-foreground">Ethical Conduct</h3>
                                                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                                                    Participants must behave professionally. The Organisers reserve the right to disqualify any team for plagiarism, unethical use of AI (e.g., generating deepfakes or offensive content), harassment, or any form of cheating.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-8 rounded-[2rem] glass border-red-500/10">
                                            <p className="text-base font-light text-muted-foreground">
                                                <span className="font-semibold text-foreground">Indemnity:</span> Participants agree to indemnify and hold harmless Sunway University, Sunway College, and Rakan Tutor against any and all claims, costs, or liabilities arising from the participant's breach of these terms or any infringement of third-party intellectual property rights.
                                            </p>
                                        </div>
                                    </section>
                                </BlurFade>

                                {/* Bursary Conditions */}
                                <BlurFade inView delay={0.1}>
                                    <section id="bursary" className="space-y-8">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">Conditions for Bursary</h2>
                                        <p className="text-lg font-light text-muted-foreground leading-relaxed">
                                            This bursary is to be used as tuition fee waiver for Sunway University/ Sunway College (KL) into following programmes:
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="p-8 rounded-[2rem] bg-secondary/30 border border-border/50">
                                                <h3 className="text-xl font-bold mb-4 font-display underline decoration-cyan-500/50">Category A</h3>
                                                <p className="text-muted-foreground font-light text-base">
                                                    The bursary is only applicable to <span className="text-foreground font-medium">Pre-University or Diploma programmes</span> (except Diploma in Nursing) offered at Sunway College/ Sunway University.
                                                </p>
                                            </div>
                                            <div className="p-8 rounded-[2rem] bg-secondary/30 border border-border/50">
                                                <h3 className="text-xl font-bold mb-4 font-display underline decoration-cyan-500/50">Category B</h3>
                                                <p className="text-muted-foreground font-light text-base">
                                                    The bursary is only applicable to <span className="text-foreground font-medium">Undergraduate Degree programmes</span> at Sunway University (except the Doctor of Medicine and Bachelor of Nursing).
                                                </p>
                                            </div>
                                        </div>

                                        <ul className="space-y-6 text-base font-light text-muted-foreground">
                                            <li className="flex gap-4 items-start">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                                <p>This bursary awarded is in the form of <span className="text-foreground font-medium">tuition fee deduction</span>, it is not a cash award. In the event where the bursary amount awarded is more than the tuition fee payable of the year, the recipient will be awarded up to a maximum tuition fee payable for the year only. The balance of bursary quantum is not transferable to/ for any other type of fee payment nor refundable in cash.</p>
                                            </li>
                                            <li className="flex gap-4 items-start">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                                <p>The bursary <span className="text-foreground font-medium">ONLY covers tuition fee category</span>. General fees, deposits, external examination fees, tuition fees incurred in the event of repeat or re-sit subjects and other additional fees will be borne by the bursary winner.</p>
                                            </li>
                                            <li className="flex gap-4 items-start">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                                <p>In the event that another bursary or scholarship is awarded to the recipient at Sunway College (KL)/ Sunway University, the recipient will be entitled to <span className="text-foreground font-medium">ONLY one</span> bursary or scholarship at a time.</p>
                                            </li>
                                            <li className="flex gap-4 items-start">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                                <p>For students who are eligible for several forms of sibling discount or staff discount by Sunway Education Group or Sunway Group, the bursary will be applicable on the net balance of the tuition fee payable after the deduction of the relevant discount.</p>
                                            </li>
                                            <li className="flex gap-4 items-start">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                                <p>This bursary is subject to meeting minimum entry requirements of applied programme.</p>
                                            </li>
                                            <li className="flex gap-4 items-start">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                                <p>The disbursement of bursary will be distributed in equal amount between the first two semesters of the programme. Balance of the scholarship will be deducted from the 3rd semester's tuition fees payable for the year. (Applicable to the Degree programmes with 3 semesters in academic year).</p>
                                            </li>
                                            <li className="flex gap-4 items-start">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                                <p>In the event that the recipient withdraws from the programme, is suspended or terminated by Sunway University or Sunway College (KL) at any point in time, before the completion of the programme, the bursary shall be automatically terminated.</p>
                                            </li>
                                            <li className="flex gap-4 items-start">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                                <p>The bursary recipient will need to attach the original Bursary Certificate along with the Application Form to the Admissions office at Sunway College (KL)/ Sunway University to confirm the acceptance of this bursary offered during registration.</p>
                                            </li>
                                            <li className="flex gap-4 items-start">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                                <p>The validity date for this bursary is stated on the Bursary Certificate. This bursary will be void and terminated automatically when the validity date is due.</p>
                                            </li>
                                            <li className="flex gap-4 items-start">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                                <p>Sunway College (KL)/ Sunway University reserves the right to alter, add or delete any of the terms and conditions and the bursary scheme at any point in time as and when Sunway College (KL)/ Sunway University deems necessary.</p>
                                            </li>
                                            <li className="flex gap-4 items-start">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                                <p>In the event of a dispute on the eligibility for the bursary, the decision made by the <span className="text-foreground font-medium">Sunway Bursary Committee</span> is final.</p>
                                            </li>
                                            <li className="flex gap-4 items-start">
                                                <div className="h-2 w-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                                <p>Sunway College (KL)/ Sunway University reserves the right to involve the bursary recipients in interviews, advertisements, photography or other publicity related activities for the purpose of promoting the education institution.</p>
                                            </li>
                                        </ul>
                                    </section>
                                </BlurFade>

                                {/* Contact */}
                                <BlurFade inView delay={0.1}>
                                    <section id="contact" className="space-y-8 border-t border-border pt-16">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">Contact For More Information</h2>
                                        <div className="space-y-6">
                                            <p className="text-muted-foreground font-light leading-relaxed text-lg">
                                                If you have any questions regarding the bursary or the competition terms, please reach out to:
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
