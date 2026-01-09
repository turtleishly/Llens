import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background py-20 border-t border-border mt-20 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          {/* Logo and Tagline */}
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-2">
              <img src="/naic_logo_mark.png" alt="NAIC Logo" className="w-10 h-10 object-contain" />
              <h2 className="text-3xl font-bold tracking-tight text-foreground">NAIC '26</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              Empowering students across Malaysia to build the next generation of artificial intelligence.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
            <div className="space-y-4">
              <p className="text-xs font-semibold text-muted-foreground/40 uppercase tracking-[0.3em]">Tracks</p>
              <nav className="flex flex-col gap-3">
                <a href="#tracks" className="text-lg text-foreground/70 hover:text-foreground transition-colors font-light">Architecture</a>
                <a href="#tracks" className="text-lg text-foreground/70 hover:text-foreground transition-colors font-light">Innovation</a>
                <a href="#tracks" className="text-lg text-foreground/70 hover:text-foreground transition-colors font-light">Computing</a>
              </nav>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold text-muted-foreground/40 uppercase tracking-[0.3em]">Support</p>
              <nav className="flex flex-col gap-3">
                <a href="#" className="text-lg text-foreground/70 hover:text-foreground transition-colors font-light">FAQ</a>
                <a href="#" className="text-lg text-foreground/70 hover:text-foreground transition-colors font-light">Contact Us</a>
                <a href="#" className="text-lg text-foreground/70 hover:text-foreground transition-colors font-light">Privacy</a>
              </nav>
            </div>
          </div>

          {/* Scroll to top */}
          <div className="flex flex-col items-center md:items-end gap-6 self-center md:self-start">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className="w-14 h-14 rounded-full border-2 border-border hover:bg-black/5 hover:scale-110 transition-all"
            >
              <ArrowUp className="h-6 w-6 text-foreground" />
            </Button>
            <p className="text-sm text-muted-foreground/60 font-medium md:text-right">BACK TO TOP</p>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-base text-muted-foreground/60 font-light">
            © 2026 Rakan Tutor & Sunway University.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-xs font-semibold text-muted-foreground/30 uppercase tracking-[0.4em]">Organised In Partnership</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
