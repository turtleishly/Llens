import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import rakanTutorHero from "/rakan_tutor_hero.png";
import naicPhoto from "/naic2025photo.jpg";
import naicLogo from "/naic_ai_logo_transparent.png";

const RakanTutorHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100svh-96px)] flex items-center justify-center py-12 lg:py-16 px-4 md:px-8 bg-background overflow-hidden">
      <div className="container relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Title */}
            <div className="space-y-4 lg:space-y-5">
              <BlurFade delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Unlocking Youth Potential Through AI Education
                </h1>
              </BlurFade>
              <BlurFade delay={0.2}>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-md">
                  We provide hybrid AI programs that combine hands-on workshops and an accessible digital learning platform for ASEAN youth.
                </p>
              </BlurFade>
            </div>

            {/* CTA Buttons */}
            <BlurFade delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-sm sm:text-base lg:text-lg px-5 sm:px-6 lg:px-7 py-4 sm:py-5 lg:py-5 h-auto rounded-xl"
                  onClick={() => navigate("/contact")}
                >
                  Join us now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </BlurFade>
          </div>

          {/* Right Content - Hero Image */}
          <BlurFade delay={0.4}>
            <div className="relative flex items-center justify-center">
              <img
                src={rakanTutorHero}
                alt="Rakan Tutor Community"
                className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};



const OurValue = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-background">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <BlurFade delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold">Our Value</h2>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-xl text-muted-foreground">Values That Empower the Future</p>
          </BlurFade>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <BlurFade delay={0.3}>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">Our Mission</h3>
              <p className="text-lg text-muted-foreground">
                To provide high-quality educational programs that equip secondary school students with the skills and confidence to thrive in the AI-powered future and achieve their fullest potential.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">Our Vision</h3>
              <p className="text-lg text-muted-foreground">
                To create positive, lasting change in Malaysia's education ecosystem and nurture a community of youth leaders who will drive social impact and innovation for years to come.
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

const ProblemStatement = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="space-y-12">
          <BlurFade delay={0.1}>
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">Problem Statement</h2>
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="bg-card rounded-xl p-8 border border-border space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">AI Displacement Risk</h3>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  By 2030, an estimated 28 million jobs in ASEAN are at risk of displacement due to AI and automation.
                </p>
                <p>
                  Young people – especially those in traditionally low-access communities – are among the most vulnerable to this shift.
                </p>
                <p>
                  A study by the ASEAN Foundation and Google found that 50% of youth lack basic digital work skills, and over 72% have little to no proficiency in advanced digital tools. This skills gap severely limits their ability to participate in the digital economy.
                </p>
                <p>
                  National education systems across the region often struggle to keep pace with emerging technologies like AI. As a result, essential future-ready skills are frequently left out of public school curricula. Students who cannot afford additional (often paid) programs risk falling further behind in an increasingly digital world.
                </p>
                <p className="font-semibold text-foreground">
                  If left unaddressed, this growing divide will worsen economic inequality, limit social mobility, and lock out an entire generation from meaningful opportunities in the future workforce.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

const HybridApproach = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 md:px-8 bg-background">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <BlurFade delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold">Our Initiatives</h2>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-xl text-muted-foreground">Summary of our programs</p>
          </BlurFade>
        </div>

        {/* Flagship Event - NAIC */}
        <BlurFade delay={0.25}>
          <div className="mb-12 bg-gradient-to-br from-cyan-500/10 via-background to-blue-500/10 rounded-2xl p-8 md:p-12 border-2 border-cyan-500/20 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img src={naicLogo} alt="NAIC Logo" className="h-16 w-16 object-contain" />
                  <div>
                    <div className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-semibold mb-2">
                      Flagship Event
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold">National AI Competition</h3>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground">
                  Malaysia's premier national AI competition bringing together secondary school students from across the country to solve real-world challenges using artificial intelligence. Students compete in tracks including AI for Education, AI for Healthcare, and AI for Sustainability, presenting their solutions to industry experts and competing for scholarships and prizes.
                </p>
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-5 h-auto rounded-xl"
                  onClick={() => navigate("/")}
                >
                  Learn More About NAIC
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <img
                  src={naicPhoto}
                  alt="National AI Competition 2025 - Students presenting their AI projects"
                  className="w-full h-auto rounded-xl shadow-2xl border border-border"
                />
              </div>
            </div>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-3 gap-8">
          <BlurFade delay={0.3}>
            <div className="bg-card rounded-xl p-8 border border-border space-y-4 h-full">
              <h3 className="text-2xl md:text-3xl font-bold">Future AI Leaders Academy</h3>
              <p className="text-lg text-muted-foreground">
                We run 2-hour in-school workshops that introduce students to the world of AI in an inspiring and accessible way. Each session features a tech industry professional who shares their career journey, explains real-world AI applications, and leads a hands-on demo to spark curiosity and build foundational understanding.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="bg-card rounded-xl p-8 border border-border space-y-4 h-full">
              <h3 className="text-2xl md:text-3xl font-bold">RakanAI</h3>
              <p className="text-lg text-muted-foreground">
                Our gamified digital platform features bite-sized, self-paced nano-modules designed to build essential AI literacy. Learners explore topics like AI Art Generation, AI Ethics while earning digital badges and rewards along the way. The platform also fosters peer learning and discussions in a safe community.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.5}>
            <div className="bg-card rounded-xl p-8 border border-border space-y-4 h-full">
              <h3 className="text-2xl md:text-3xl font-bold">Community Partnerships</h3>
              <p className="text-lg text-muted-foreground">
                We collaborate with like-minded organizations across ASEAN by offering train-the-trainer programs and translated workshop materials. This enables local nonprofits to bring our AI workshops and digital learning platform directly into the communities they serve.
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 md:px-8 bg-muted/30">
      <div className="container max-w-4xl mx-auto text-center">
        <BlurFade delay={0.1}>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Be Part of the Solution</h2>
            <p className="text-lg text-muted-foreground">
              Please fill in the form at contact page or click the button below and we will contact you very soon.
            </p>
            <Button
              size="lg"
              className="text-base lg:text-lg px-8 py-6 h-auto rounded-xl"
              onClick={() => navigate("/contact")}
            >
              Join us now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

const RakanTutor = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <RakanTutorHero />
        <HybridApproach />
        <OurValue />
        <ProblemStatement />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default RakanTutor;
