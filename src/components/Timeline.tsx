import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const timelineEvents = [
  { date: "2 Apr 2025", event: "Registration Deadline" },
  { date: "11 Apr 2025", event: "Masterclass: Introduction to AI" },
  { date: "25 Apr 2025", event: "Masterclass: AI Tools Tutorial" },
  { date: "24 May 2025", event: "Preliminary Round Submission Deadline" },
  { date: "Jun 2025", event: "Final Round at Sunway University" },
];

const Timeline = () => {
  return (
    <section id="timeline" className="bg-background py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Timeline
        </h2>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-coral/30 hidden md:block" />

            <div className="space-y-6">
              {timelineEvents.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 md:gap-6"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative z-10 w-12 h-12 shrink-0 rounded-full bg-coral flex items-center justify-center shadow-lg">
                    <Calendar className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 bg-card rounded-xl p-4 shadow-md border border-border">
                    <p className="text-sm font-medium text-coral mb-1">
                      {item.date}
                    </p>
                    <p className="text-foreground font-medium">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Detailed Timeline
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
