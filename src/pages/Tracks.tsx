import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Paintbrush, Lightbulb, Monitor, Settings, Building2, ArrowRight, CheckCircle2 } from "lucide-react";

const BLUR_FADE_DELAY = 0.05;

const tracksData = [
    {
        id: "computing",
        title: "Computing",
        icon: <Monitor className="w-8 h-8" />,
        color: "from-cyan-500 to-blue-500",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/20",
        overview: "Architect the next generation of algorithms and high-performance computing frameworks. This track focuses on the core technical development of AI systems.",
        whoIsThisFor: "Students with coding experience who are passionate about AI development and algorithm design.",
        deliverables: "Deliverables include a complete codebase showcasing the AI model, along with a technical writeup explaining the methodology and key insights.",
        examples: [
            "CNN for Detecting Correct Postures in Stroke Rehabilitation",
            "Object Detection of Safety Helmets at Construction Sites"
        ],
        judging: [
            { title: "Performance", description: "Accuracy and effectiveness on unseen test data." },
            { title: "Model Design", description: "Appropriateness of AI implementation." },
            { title: "Data Strategy", description: "Thoughtfulness in data collection and preparation." }
        ]
    },
    {
        id: "engineering",
        title: "Engineering",
        icon: <Settings className="w-8 h-8" />,
        color: "from-blue-500 to-indigo-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
        overview: "Optimize complex systems and automate precision manufacturing with intelligent models. Focus on the physical and industrial application of AI technology.",
        whoIsThisFor: "Problem-solvers interested in robotics, automation, and the hardware-software interface of AI.",
        deliverables: "Deliverables include a system design report, simulation results or hardware demonstrations, and a video showcasing the industrial impact.",
        examples: [
            "AI-optimized Thermal Cooling for Server Rooms",
            "Predictive Maintenance for Industrial Robotic Arms"
        ],
        judging: [
            { title: "System Efficiency", description: "Observable improvement in system performance." },
            { title: "Practicality", description: "Feasibility of the solution in real-world environments." },
            { title: "Technical Depth", description: "Complexity and robustness of the engineering design." }
        ]
    },
    {
        id: "innovation",
        title: "Innovation",
        icon: <Lightbulb className="w-8 h-8" />,
        color: "from-amber-500 to-orange-500",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/20",
        overview: "Create disruptive solutions that challenge the boundaries of current technology. Design an AI solution tackling real-world challenges with measurable social impact.",
        whoIsThisFor: "For visionaries passionate about impactful, scalable AI-driven social change. No technical build required.",
        deliverables: "Deliverables include a writeup on the problem, the AI solution, its social impact, and a prototype such as an app mockup or model images.",
        examples: [
            "MVP of AI-driven Traffic App to Solve City Congestion",
            "MVP of Hydrogen Fuel Plant Sketch to Solve Food Waste Problem"
        ],
        judging: [
            { title: "Problem Statement", description: "Clarity and social impact." },
            { title: "Feasibility", description: "Solution practicality." },
            { title: "Innovation", description: "Creative application of AI." }
        ]
    },
    {
        id: "art",
        title: "Generated Art",
        icon: <Paintbrush className="w-8 h-8" />,
        color: "from-pink-500 to-rose-500",
        bgColor: "bg-pink-500/10",
        borderColor: "border-pink-500/20",
        overview: "Explore the intersection of human creativity and machine-generated aesthetics. Unleash your creativity by using AI to craft innovative and meaningful artwork.",
        whoIsThisFor: "Students passionate about art and exploring new creative possibilities with AI tools.",
        deliverables: "Deliverables include the final artwork, a writeup on how it reflects the theme, and a summary of the creative process including prompts used.",
        examples: [
            "Biodiversity in Malaysia Through AI",
            "Impact of Climate Change on Southeast Asian Landscapes"
        ],
        judging: [
            { title: "Creativity", description: "Innovative and unique ideas." },
            { title: "Design Process", description: "Thoughtful and refined execution." },
            { title: "Storytelling", description: "Strong storytelling and theme connection." }
        ]
    },
    {
        id: "architecture",
        title: "Architecture",
        icon: <Building2 className="w-8 h-8" />,
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/20",
        overview: "Reimagine sustainable urban spaces and parametric structures using AI-driven design. Use AI to shape the future of our physical environment.",
        whoIsThisFor: "Visionaries interested in architecture, urban planning, and sustainable design using generative tools.",
        deliverables: "Deliverables include design portfolios with site analysis, AI-generated architectural renders, and sustainability impact reports.",
        examples: [
            "Generative Design of an Eco-friendly Community Hub",
            "AI-driven Spacial Optimization of High-density Complexes"
        ],
        judging: [
            { title: "Design Innovation", description: "Creative use of generative tools in space planning." },
            { title: "Sustainability", description: "Environmental impact and resource efficiency." },
            { title: "Aesthetic & Function", description: "Balance between visual appeal and practical usability." }
        ]
    }
];

const TracksPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-32 pb-20 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    {/* Hero Section */}
                    <BlurFade delay={BLUR_FADE_DELAY}>
                        <div className="text-center mb-20">
                            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">
                                National AI Competition 2026
                            </h2>
                            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
                                Tracks <span className="text-primary">Overview</span>
                            </h1>
                            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                                Explore our five distinct competition tracks for 2026. Find the path that best matches your passion and skills.
                            </p>
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
                                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                                        <div className="space-y-8">
                                            <div className="inline-flex items-center gap-4 p-3 rounded-2xl bg-primary/10 text-primary mb-2">
                                                {track.icon}
                                                <h2 className="text-3xl font-bold tracking-tight uppercase" style={{ fontFamily: "'Orbitron', sans-serif" }}>{track.title}</h2>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-3">Challenge Overview</h3>
                                                    <p className="text-xl leading-relaxed text-foreground/90">
                                                        {track.overview}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-3">Who is this for</h3>
                                                    <p className="text-lg text-muted-foreground">
                                                        {track.whoIsThisFor}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-3">Key Deliverables</h3>
                                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                                        {track.deliverables}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className={`p-8 rounded-3xl border ${track.borderColor} ${track.bgColor} backdrop-blur-sm`}>
                                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                                    Example Submission
                                                </h3>
                                                <div className="grid gap-4">
                                                    {track.examples.map((example, i) => (
                                                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-border/50">
                                                            <div className="mt-1">
                                                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                                            </div>
                                                            <p className="font-medium">{example}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                <h3 className="text-xl font-bold mt-10 mb-6">Judging Criteria</h3>
                                                <div className="grid gap-6">
                                                    {track.judging.map((criterion, i) => (
                                                        <div key={i} className="flex gap-4">
                                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                                                {i + 1}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold">{criterion.title}</h4>
                                                                <p className="text-sm text-muted-foreground">{criterion.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="p-8 rounded-3xl bg-primary dark:bg-zinc-950 border border-primary/20 dark:border-zinc-800 text-primary-foreground dark:text-white shadow-2xl overflow-hidden relative group">
                                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity">
                                                    {track.icon}
                                                </div>
                                                <h3 className="text-xl font-bold mb-4">Theme for 2026</h3>
                                                <p className="text-primary-foreground/80 dark:text-zinc-400 mb-8 leading-relaxed">
                                                    The specific competition topic will be announced exclusively to registered teams on April 3, 2026.
                                                </p>
                                                <Button asChild className="w-full bg-background text-foreground hover:bg-background/90 rounded-full py-6 text-lg font-bold uppercase transition-transform hover:scale-[1.02]">
                                                    <Link to="/register">
                                                        Register now <ArrowRight className="ml-2 w-5 h-5" />
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
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 italic">Ready to make your mark?</h2>
                            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
                                Join hundreds of students across Malaysia in the largest student AI competition.
                            </p>
                            <Button asChild size="lg" className="rounded-full px-12 py-8 text-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                                <Link to="/register">Register Your Team</Link>
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
