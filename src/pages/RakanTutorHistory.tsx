import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import DitheredBackground from "@/components/DitheredBackground";
import { BookOpen, Users, Sparkles, TrendingUp } from "lucide-react";

const HistoryHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center py-20 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--hero-bg-from))_0%,hsl(var(--hero-bg-via))_45%,hsl(var(--hero-bg-to))_100%)]">
        <DitheredBackground className="z-0" />
      </div>

      <div className="container relative z-10 max-w-5xl mx-auto text-center">
        <BlurFade delay={0.1}>
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            Our History
          </h1>
        </BlurFade>
        <BlurFade delay={0.2}>
          <p className="text-xl lg:text-2xl text-muted-foreground">
            How a pandemic sparked a movement
          </p>
        </BlurFade>
      </div>
    </section>
  );
};

const FoundingStory = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-background">
      <div className="container max-w-7xl mx-auto">
        <div className="space-y-12">
          <BlurFade delay={0.1}>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-5xl font-bold">Founding Story</h2>
              <p className="text-xl text-muted-foreground">
                Born from urgency, built with purpose
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground">
              <p>
                Rakan Tutor was founded by Kai Song and Kaveen who first met while working on a pro bono consulting project with Teach for Malaysia. They researched and recommended strategies to address learning loss caused by the COVID-19 pandemic.
              </p>
              <p>
                Through interviews with teachers, they were struck by story after story of students struggling under impossible circumstances – students forced to drop out to support their families, those falling behind due to unstable internet, and many who shared a single mobile phone among multiple siblings just to attend online classes late at night.
              </p>
              <p>
                The pandemic caused repeated school closures across Malaysia – from March to July 2020, again from November 2020 to April 2021, and once more in May 2021. At its peak, it was estimated that students lost 0.9 years of learning after just seven months. For reference, after Hurricane Katrina, students returned to school more than two years behind their expected grade level, with long-term effects still visible 15 years later.
              </p>
              <p>
                At the time, the Ministry of Education had yet to roll out any nationwide remedial or accelerated learning programs. While students from well-resourced families could afford private tutoring, many others – especially those already at a disadvantage – were left even further behind.
              </p>
              <p className="font-semibold text-foreground">
                We founded Rakan Tutor in 2021 out of the belief that education is a powerful driver of social mobility, and that no student should be denied opportunities simply because of their circumstances.
              </p>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <BlurFade delay={0.3}>
              <div className="bg-card rounded-xl p-8 border border-border space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Our First Initiative</h3>
                <p className="text-muted-foreground">
                  Our first initiative was a completely free 1:1 online tutoring program, pairing university students and young professionals from around the world with students preparing for their SPM exams. These students, nominated by teachers, were bright and motivated – but faced difficult environments that hindered their academic progress.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="bg-card rounded-xl p-8 border border-border space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Beyond Academics</h3>
                <p className="text-muted-foreground">
                  Beyond academics, we recognized that exposure to mentors also built confidence, soft skills, and inspiration – connecting students with relatable role models who could help broaden their horizons.
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProgramPivot = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="space-y-12">
          <BlurFade delay={0.1}>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-5xl font-bold">Program Pivot</h2>
              <p className="text-xl text-muted-foreground">
                Evolving from tutoring to AI upskilling
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground">
              <p>
                From the beginning, we've committed to tracking our impact rigorously – not for funders, but to hold ourselves accountable. Every year, we produce an internal impact report to assess what's working and what needs improvement which you can find on Our Impact section.
              </p>
              <p>
                By 2024, we noticed a drop in engagement: more students were dropping out and completing fewer hours. Conversations with tutors and students revealed that, post-pandemic, there was a growing preference for in-person interaction. This shift was also influenced by the rollout of nationwide learning recovery efforts like Program Anak Kita.
              </p>
              <p>
                It became clear that our original program needed a refresh. In 2024, Kai Song, Jay and a friend Zad conducted six on-the-ground workshops to reconnect with students and understand their evolving needs. One theme emerged consistently: the urgent need for AI education, which is largely absent from school curricula.
              </p>
              <p>
                After much research and reflection, we made the decision to relaunch Rakan Tutor with a new focus: AI skills development, replacing academic tutoring as our core program offering.
              </p>
              <p className="font-semibold text-foreground">
                This shift isn't a change in our mission – it's a content evolution to ensure our work remains relevant, impactful, and future-focused.
              </p>
              <p className="font-semibold text-foreground">
                Our goal remains the same: to help youth achieve their fullest potential and become active participants in shaping their futures, no matter where they start.
              </p>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <BlurFade delay={0.3}>
              <div className="bg-card rounded-xl p-8 border border-border space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Data-Driven Decisions</h3>
                <p className="text-muted-foreground">
                  We track our impact rigorously through annual internal impact reports, holding ourselves accountable to continuous improvement and measurable outcomes.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="bg-card rounded-xl p-8 border border-border space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Future-Focused Evolution</h3>
                <p className="text-muted-foreground">
                  Our pivot to AI skills development ensures we remain relevant and impactful, addressing the urgent need for future-ready skills that schools currently don't provide.
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
};

const RakanTutorHistory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HistoryHero />
        <FoundingStory />
        <ProgramPivot />
      </main>
      <Footer />
    </div>
  );
};

export default RakanTutorHistory;
