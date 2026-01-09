import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Tracks from "@/components/Tracks";
import Prizes from "@/components/Prizes";
import HowToApply from "@/components/HowToApply";
import Timeline from "@/components/Timeline";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Tracks />
        <Prizes />
        <HowToApply />
        <Timeline />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
