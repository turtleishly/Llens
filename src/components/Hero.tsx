import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroGraphic from "@/assets/hero-graphic.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="w-16 h-2 bg-coral rounded-full" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              National AI Competition 2025
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              The Largest AI Competition for Youth in Malaysia
            </p>
            <Button size="lg" className="bg-primary hover:bg-navy-dark text-primary-foreground px-8 py-6 text-base">
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Right Content - Decorative Image */}
          <div className="relative">
            {/* Decorative shapes */}
            <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full border-4 border-coral/30" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full border-4 border-coral/30" />
            <div className="absolute top-1/2 -right-8 w-16 h-16 rounded-full bg-coral/20" />
            
            {/* Main image container with clipping shapes */}
            <div className="relative z-10">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Background coral circle */}
                <div className="absolute inset-0 rounded-full bg-coral/30 transform scale-90" />
                
                {/* Image */}
                <img
                  src={heroGraphic}
                  alt="Students learning AI"
                  className="relative z-10 w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Organised By Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 items-center justify-center text-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Organised By
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-coral flex items-center justify-center">
                <span className="text-primary-foreground font-bold">R</span>
              </div>
              <span className="text-xl font-semibold text-foreground">Rakan Tutor</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              With Approval From
            </p>
            <p className="text-xl font-semibold text-foreground">
              Kementerian Pendidikan Malaysia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
