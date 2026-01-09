import { Palette, Lightbulb, Brain, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tracks = [
  {
    icon: Palette,
    title: "AI Generated Art",
    description: "Use AI tools to create an A3 size artwork",
  },
  {
    icon: Lightbulb,
    title: "AI Innovation",
    description: "Propose AI solutions that solve real-world problems",
  },
  {
    icon: Brain,
    title: "AI Technical",
    description: "Train an image recognition AI model",
  },
];

const Tracks = () => {
  return (
    <section id="tracks" className="bg-secondary py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Competition Tracks
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tracks.map((track, index) => (
            <Card
              key={track.title}
              className="bg-card border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-coral/10 flex items-center justify-center">
                  <track.icon className="w-10 h-10 text-coral" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {track.title}
                </h3>
                <p className="text-muted-foreground">{track.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Tracks;
