import { Link, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Footer = () => {
  const location = useLocation();
  const isV2 = location.pathname === "/v2";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={cn(
      "py-20 border-t transition-colors duration-300 relative overflow-hidden px-4 md:px-8",
      isV2 ? "bg-black border-cyan-500/20" : "bg-background border-border mt-20"
    )}>
      {isV2 && <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />}

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          {/* Logo and Tagline */}
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-2">
              <img src="/naic_logo_mark.png" alt="NAIC Logo" className="w-10 h-10 object-contain" />
              <h2 className={cn(
                "text-3xl font-bold tracking-tight text-foreground",
                isV2 && "text-white neon-text-cyan"
              )}>NAIC '26</h2>
            </div>
            <p className={cn(
              "text-lg leading-relaxed font-light",
              isV2 ? "text-zinc-500" : "text-muted-foreground"
            )}>
              Empowering students across Malaysia to build the next generation of artificial intelligence.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <p className={cn(
              "text-xs font-semibold uppercase tracking-[0.3em]",
              isV2 ? "text-cyan-500/40" : "text-muted-foreground/40"
            )}>Support</p>
            <nav className="flex flex-col gap-3">
              <Link to={isV2 ? "/v2#faq" : "/#faq"} className={cn(
                "text-lg transition-colors font-light",
                isV2 ? "text-zinc-500 hover:text-cyan-400" : "text-foreground/70 hover:text-foreground"
              )}>FAQ</Link>
              <a href="mailto:clement@sunway.edu.my" className={cn(
                "text-lg transition-colors font-light",
                isV2 ? "text-zinc-500 hover:text-cyan-400" : "text-foreground/70 hover:text-foreground"
              )}>Contact Us</a>
              <Link to="/privacy" className={cn(
                "text-lg transition-colors font-light",
                isV2 ? "text-zinc-500 hover:text-cyan-400" : "text-foreground/70 hover:text-foreground"
              )}>Privacy</Link>
              <Link to="/terms" className={cn(
                "text-lg transition-colors font-light",
                isV2 ? "text-zinc-500 hover:text-cyan-400" : "text-foreground/70 hover:text-foreground"
              )}>Terms</Link>
            </nav>
          </div>

          {/* Scroll to top */}
          <div className="flex flex-col items-center md:items-end gap-6 self-center md:self-start">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className={cn(
                "w-14 h-14 rounded-full border-2 transition-all",
                isV2
                  ? "border-cyan-500/20 bg-zinc-950 text-cyan-400 hover:border-cyan-500 hover:bg-cyan-950"
                  : "border-border hover:bg-black/5 hover:scale-110"
              )}
            >
              <ArrowUp className="h-6 w-6" />
            </Button>
            <p className={cn(
              "text-sm font-medium md:text-right",
              isV2 ? "text-cyan-500/40 font-mono tracking-widest" : "text-muted-foreground/60"
            )}>BACK TO TOP</p>
          </div>
        </div>

        <div className={cn(
          "mt-20 pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6",
          isV2 ? "border-cyan-500/10" : "border-border"
        )}>
          <p className={cn(
            "text-base font-light",
            isV2 ? "text-zinc-600" : "text-muted-foreground/60"
          )}>
            © 2026 Rakan Tutor & Sunway University.
          </p>
          <div className="flex items-center gap-8">
            <span className={cn(
              "text-xs font-semibold uppercase tracking-[0.4em]",
              isV2 ? "text-zinc-700" : "text-muted-foreground/30"
            )}>Organised In Partnership</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
