import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import DitheredBackground from "@/components/DitheredBackground";
import { Construction } from "lucide-react";
import { ReactNode } from "react";

interface MeetTheTeamTemplateProps {
    title: string;
    children?: ReactNode;
}

const MeetTheTeamHero = ({ title }: { title: string }) => {
    return (
        <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-24 px-4 md:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--hero-bg-from))_0%,hsl(var(--hero-bg-via))_45%,hsl(var(--hero-bg-to))_100%)]">
                <DitheredBackground className="z-0" />
            </div>

            <div className="container relative z-10 max-w-5xl mx-auto text-center">
                <BlurFade delay={0.1}>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
                        {title}
                    </h1>
                </BlurFade>
            </div>
        </section>
    );
};

const WorkInProgress = () => {
    return (
        <section className="py-20 px-4 md:px-8 bg-background min-h-[40vh] flex items-center justify-center">
            <div className="container max-w-3xl mx-auto text-center space-y-8">
                <BlurFade delay={0.2}>
                    <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <Construction className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-4">Under Construction</h2>
                    <p className="text-xl text-muted-foreground">
                        We are currently compiling the profiles of our amazing team members for this period.
                        Please check back soon!
                    </p>
                </BlurFade>
            </div>
        </section>
    );
};

const MeetTheTeamTemplate = ({ title, children }: MeetTheTeamTemplateProps) => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main>
                <MeetTheTeamHero title={title} />
                {children ? children : <WorkInProgress />}
            </main>
            <Footer />
        </div>
    );
};

export default MeetTheTeamTemplate;
