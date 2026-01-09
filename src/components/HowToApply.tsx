import { CheckCircle, UserPlus, GraduationCap, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    icon: CheckCircle,
    title: "Check Your Eligibility",
    items: [
      "Form a team of 4 students. Category A (Form 3/Year 9 – Form 5/Year 11), Category B (Year 12/Pre-University or equivalent)",
      "All members must be studying in government, private or international schools in Malaysia",
    ],
  },
  {
    icon: UserPlus,
    title: "Register Your Team",
    items: [
      "Deadline to register: 2 April 2025, Wednesday, 11:59pm",
      'Register using the "Register Now" button below',
      "Registered teams will be given a Competition Booklet with more details",
    ],
  },
  {
    icon: GraduationCap,
    title: "Participate in the Online Masterclass",
    items: [
      "Participants are encouraged to attend the 2 online Masterclasses to better prepare for the competition:",
      "• Introduction to AI (11 April)",
      "• AI Tools Tutorial (25 April)",
      "Online Masterclasses are Free of Charge (normal price: RM250/class)",
    ],
  },
  {
    icon: Send,
    title: "Submit Your Project",
    items: [
      "Preliminary Round: Online Submission (deadline: 24 May)",
      "Final Round: Shortlisted participants will be invited for a physical presentation at Sunway University.",
    ],
  },
];

const HowToApply = () => {
  return (
    <section id="apply" className="bg-secondary py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          How to Apply?
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card
              key={step.title}
              className="bg-card border-none shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-coral/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-coral" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <ul className="space-y-2">
                      {step.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button size="lg" className="bg-primary hover:bg-navy-dark text-primary-foreground px-8">
            Register Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowToApply;
