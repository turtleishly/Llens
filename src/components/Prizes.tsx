import { Trophy, Medal, Award, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const prizes = [
  {
    icon: Trophy,
    position: "1st",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    benefits: [
      "RM16,000 Sunway Bursary",
      "Visit to Google's Office",
      "6 months Pixlr Premium",
      "Cert of Commendation",
    ],
  },
  {
    icon: Medal,
    position: "2nd",
    color: "text-gray-400",
    bgColor: "bg-gray-400/10",
    benefits: [
      "RM12,000 Sunway Bursary",
      "Visit to Google's Office",
      "6 months Pixlr Premium",
      "Cert of Commendation",
    ],
  },
  {
    icon: Award,
    position: "3rd",
    color: "text-amber-600",
    bgColor: "bg-amber-600/10",
    benefits: [
      "RM8,000 Sunway Bursary",
      "Visit to Google's Office",
      "6 months Pixlr Premium",
      "Cert of Commendation",
    ],
  },
  {
    icon: Star,
    position: "4th - 10th",
    color: "text-coral",
    bgColor: "bg-coral/10",
    benefits: ["RM5,000 Sunway Bursary", "Cert of Commendation"],
  },
];

const Prizes = () => {
  return (
    <section id="prizes" className="bg-background py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Prizes
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {prizes.map((prize, index) => (
            <Card
              key={prize.position}
              className="bg-card border border-border shadow-md hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full ${prize.bgColor} flex items-center justify-center`}
                >
                  <prize.icon className={`w-8 h-8 ${prize.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {prize.position}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Each team member will receive
                </p>
                <ul className="space-y-2 text-left">
                  {prize.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="text-sm text-foreground flex items-start gap-2"
                    >
                      <span className="text-coral mt-1">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-8 text-sm">
          All participants will receive an e-Certificate of Participation.
        </p>

        <div className="text-center mt-8">
          <Button size="lg" className="bg-primary hover:bg-navy-dark text-primary-foreground px-8">
            Register Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Prizes;
