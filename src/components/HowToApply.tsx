import { ArrowRight, CheckCircle, UserPlus, GraduationCap, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import BlurFade from "@/components/ui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

const steps = [
  {
    icon: CheckCircle,
    title: "Check Your Eligibility",
    items: [
      "Form a team of 4 students. Category A: Form 4 - Form 5, Year 10 - Year 11, SM1 - SM2. Category B: STPM, Pre-U, UEC, Diploma.",
      "All members must be studying in government, private or international schools in Malaysia",
    ],
  },
  {
    icon: UserPlus,
    title: "Register Your Team",
    items: [
      "Log on to naic.rakantutor.org and fill up your team's details",
      'You can also register using the "Register Now" button below',
      "Registered teams will be given a Competition Booklet with more details",
    ],
  },
  {
    icon: GraduationCap,
    title: "Participate in the Online Masterclass",
    items: [
      "Participants are encouraged to attend the online Masterclass to better prepare for the competition:",
      "• 31 March - 2 April 2026 (by category)",
      "Online Masterclasses are Free of Charge (normal price: RM250/class)",
    ],
  },
  {
    icon: Send,
    title: "Submit Your Project",
    items: [
      "Proposal submission deadline: 4 May 2026 (Monday)",
      "Announcement of finalists: 15 May 2026, 4:00 PM (Friday)",
      "Grand Finals: 13 June 2026, 8:30 AM - 2:00 PM at Sunway University",
    ],
  },
];

const HowToApply = () => {
  return (
    <section id="apply" className="bg-secondary/50 py-20 lg:py-32 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            How to Apply
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to start your journey in the National AI Competition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <BlurFade key={step.title} delay={BLUR_FADE_DELAY * index} inView>
              <Card
                className="group relative border-border/50 bg-background/50 hover:bg-background hover:shadow-md transition-all duration-300 h-full"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-foreground">
                        {step.title}
                      </h3>
                      <ul className="space-y-3">
                        {step.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-muted-foreground leading-relaxed flex items-start gap-3"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            className="h-12 px-8 rounded-full text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-lg hover:shadow-primary/25"
          >
            <Link to="/register">
              Register Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowToApply;
