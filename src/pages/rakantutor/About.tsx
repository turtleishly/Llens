import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import DitheredBackground from "@/components/DitheredBackground";
import { Globe, Users, Heart, Target } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center py-20 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--hero-bg-from))_0%,hsl(var(--hero-bg-via))_45%,hsl(var(--hero-bg-to))_100%)]">
        <DitheredBackground className="z-0" />
      </div>

      <div className="container relative z-10 max-w-5xl mx-auto text-center">
        <BlurFade delay={0.1}>
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            About
          </h1>
        </BlurFade>
        <BlurFade delay={0.2}>
          <p className="text-xl lg:text-2xl text-muted-foreground">
            Empowering youth through AI education
          </p>
        </BlurFade>
      </div>
    </section>
  );
};

const AboutRakanTutor = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-background">
      <div className="container max-w-7xl mx-auto">
        <div className="space-y-12">
          <BlurFade delay={0.1}>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-5xl font-bold">About Rakan Tutor</h2>
              <p className="text-xl text-muted-foreground">
                Volunteer-driven nonprofit building future-ready youth
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground">
              <p>
                Rakan Tutor is a registered non-profit organization dedicated to equipping youth with the skills and confidence they need to achieve their fullest potential in an AI-powered future.
              </p>
              <p>
                We are a fully volunteer-run organization, led by a committee that serves on a one-year term. Our team brings together pre-university students, university students, and young professionals – a rare structure in the nonprofit space that fosters intergenerational learning, mentorship, and diverse perspectives. Young professionals serve as mentors and role models, while younger team members contribute fresh energy and ideas.
              </p>
              <p>
                We are also proud of our global reach. Our team spans across Malaysia and the world, including past and current members based in the UK, US, Singapore, Canada, China, Australia, Italy, and Germany, among others.
              </p>
              <p className="font-semibold text-foreground">
                Rakan Tutor serves as a platform for Malaysians passionate about education – whether at home or abroad – to connect, collaborate, and contribute meaningfully to the future generations.
              </p>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <BlurFade delay={0.3}>
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Volunteer-Driven</h3>
                <p className="text-muted-foreground">
                  Fully run by passionate volunteers committed to making a difference
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Global Reach</h3>
                <p className="text-muted-foreground">
                  Team members across Malaysia and around the world
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.5}>
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Intergenerational</h3>
                <p className="text-muted-foreground">
                  Pre-university students to young professionals working together
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
};

const OurValue = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <BlurFade delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold">Our Value</h2>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-xl text-muted-foreground">Values That Empower the Future</p>
          </BlurFade>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <BlurFade delay={0.3}>
            <div className="bg-card rounded-xl p-8 border border-border space-y-4 h-full">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Our Mission</h3>
              <p className="text-lg text-muted-foreground">
                To provide high-quality educational programs that equip secondary school students with the skills and confidence to thrive in the AI-powered future and achieve their fullest potential.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="bg-card rounded-xl p-8 border border-border space-y-4 h-full">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
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

const RakanTutorAbout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutHero />
        <AboutRakanTutor />
        <OurValue />
      </main>
      <Footer />
    </div>
  );
};

export default RakanTutorAbout;
