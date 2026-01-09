import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventOverview from "@/components/EventOverview";
import Tracks from "@/components/Tracks";
import Prizes from "@/components/Prizes";
import HowToApply from "@/components/HowToApply";
import Timeline from "@/components/Timeline";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      <main>
        <Hero />
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
