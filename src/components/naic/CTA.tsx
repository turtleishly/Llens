import { Button } from "@/components/ui/button";
import DitheredBackground from "@/components/DitheredBackground";
import BlurFade from "@/components/ui/blur-fade";
import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <section className="relative py-32 bg-[linear-gradient(135deg,hsl(var(--hero-bg-from))_0%,hsl(var(--hero-bg-via))_45%,hsl(var(--hero-bg-to))_100%)] overflow-hidden px-4 md:px-8">
            <DitheredBackground className="z-0" />
            <div className="container relative z-10 mx-auto text-center">
                <BlurFade inView>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8">
                        What are you waiting for?
                    </h2>
                </BlurFade>
                <BlurFade inView delay={0.2}>
                    <Button
                        asChild
                        className="h-16 px-12 rounded-full text-xl font-semibold bg-cyan-500 text-white hover:bg-cyan-600 hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        <Link to="/naic/register">Register Now</Link>
                    </Button>
                </BlurFade>
            </div>
        </section>
    );
};

export default CTA;
