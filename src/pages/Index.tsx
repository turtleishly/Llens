import Header from "@/components/Header";
import EventOverview from "@/components/EventOverview";
import Tracks from "@/components/Tracks";
import Prizes from "@/components/Prizes";
import HowToApply from "@/components/HowToApply";
import Timeline from "@/components/Timeline";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import AsSeenOn from "@/components/AsSeenOn";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroGraphic from "@/assets/hero-graphic.png";
import sunwayLogo from "@/assets/sunway-logo.png";
import rakanTutorLogo from "@/assets/rakan-tutor-logo.png";

const NewHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 md:px-8 bg-background overflow-hidden">
      <div className="container relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-10">
            {/* Logo */}
            <BlurFade delay={0.1}>
              <div className="w-16 h-16 lg:w-20 lg:h-20">
                <img
                  src="/naic_ai_logo_transparent.png"
                  alt="NAIC Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </BlurFade>

            {/* Title */}
            <div className="space-y-4 lg:space-y-6">
              <BlurFade delay={0.2}>
                <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                  National AI
                  <br />
                  Competition 2026
                </h1>
              </BlurFade>
              <BlurFade delay={0.3}>
                <p className="text-lg lg:text-2xl text-muted-foreground max-w-md">
                  The Largest AI Competition for Youth in Malaysia
                </p>
              </BlurFade>
            </div>

            {/* CTA Button */}
            <BlurFade delay={0.4}>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/register")}
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg rounded-full group transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-sm text-muted-foreground">
                  By registering, you agree to our{" "}
                  <a href="/terms" className="underline hover:text-foreground transition-colors">
                    terms and conditions
                  </a>
                </p>
              </div>
            </BlurFade>
          </div>

          {/* Right Content - Photo Collage */}
          <BlurFade delay={0.5}>
            <div className="relative w-full max-w-2xl mx-auto">
              <img
                src={heroGraphic}
                alt="National AI Competition 2025 - Students participating in workshops, presentations, and networking events"
                className="w-full h-auto"
              />
            </div>
          </BlurFade>
        </div>

        {/* Organizers Section */}
        <BlurFade delay={0.6}>
          <div className="mt-20 lg:mt-24 pt-12 border-t border-border">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Organised By */}
              <div className="text-center space-y-6">
                <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.4em]">
                  Organised By
                </p>
                <div className="flex justify-center items-center gap-8 flex-wrap">
                  <a
                    href="https://rakantutor.org"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Rakan Tutor website"
                    className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-border hover:shadow-md transition-shadow"
                  >
                    <img src={rakanTutorLogo} alt="Rakan Tutor" className="h-16 md:h-20 w-auto object-contain" />
                  </a>
                  <a
                    href="https://sunway.edu.my"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Sunway University website"
                    className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-border hover:shadow-md transition-shadow"
                  >
                    <img src={sunwayLogo} alt="Sunway University" className="h-16 md:h-20 w-auto object-contain" />
                  </a>
                </div>
              </div>

              {/* With Approval From */}
              <div className="text-center space-y-6">
                <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.4em]">
                  With Approval From
                </p>
                <div className="flex justify-center items-center">
                  <div className="text-xl lg:text-2xl font-semibold text-foreground text-center">
                    Kementerian Pendidikan <br /> Malaysia
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      <main>
        <NewHero />
        <BlurFade inView>
          <AsSeenOn />
        </BlurFade>
        <BlurFade inView>
          <EventOverview />
        </BlurFade>
        <BlurFade inView>
          <Tracks />
        </BlurFade>
        <BlurFade inView>
          <Prizes />
        </BlurFade>
        <BlurFade inView>
          <HowToApply />
        </BlurFade>
        <BlurFade inView>
          <Timeline />
        </BlurFade>
        <CTA />
        <BlurFade inView>
          <FAQ />
        </BlurFade>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
