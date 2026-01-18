import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isV2 = location.pathname === "/v2";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Tracks", href: "/tracks" },
    { label: "Prizes", href: isV2 ? "/v2#prizes" : "/#prizes" },
    { label: "Timeline", href: isV2 ? "/v2#timeline" : "/#timeline" },
    { label: "FAQ", href: "/faq" },
    { label: "Register", href: "/register" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-0 px-0 translate-y-0 transition-transform duration-300">
      <header
        className={cn(
          "w-full transition-all duration-500 py-3 px-8 border-b",
          scrolled
            ? isV2
              ? "bg-black/80 backdrop-blur-md border-cyan-500/20 py-2"
              : "bg-transparent backdrop-blur-md border-border/10 shadow-sm py-2"
            : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="max-w-[1400px] mx-auto flex items-center">
          {/* Left: Logo Container */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/naic_logo_mark.png" alt="NAIC Logo" className="w-8 h-8 object-contain" />
              <span className={cn(
                "font-display font-bold text-xl tracking-tight text-foreground",
                isV2 && "text-white neon-text-cyan"
              )}>NAIC '26</span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  "text-base font-medium font-display transition-all tracking-wide",
                  isV2
                    ? "text-zinc-400 hover:text-cyan-400 uppercase font-black italic text-sm"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions Container */}
          <div className="flex-1 flex justify-end gap-6 items-center">
            <div className="hidden md:block">
              <Button
                asChild
                className={cn(
                  "h-10 rounded-full px-6 text-base font-semibold shadow-md transition-all hover:scale-105",
                  isV2
                    ? "bg-black border border-cyan-500 text-cyan-400 rounded-none italic font-black uppercase tracking-tighter hover:bg-cyan-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "bg-cyan-500 text-white border-none hover:bg-cyan-600 shadow-cyan-500/20"
                )}
              >
                <Link to="/register">Register Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button - now integrated into the right container */}
            <div className="flex items-center gap-4 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn("text-foreground", isV2 && "text-cyan-400")}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className={cn(
            "md:hidden pt-4 pb-8 px-6 border-t animate-fade-in flex flex-col gap-4 backdrop-blur-lg",
            isV2
              ? "bg-black/95 border-cyan-500/20"
              : "border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5"
          )}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  "text-lg font-medium font-display transition-colors",
                  isV2
                    ? "text-zinc-400 hover:text-cyan-400 uppercase font-black italic tracking-tighter"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className={cn(
                "w-full mt-2",
                isV2
                  ? "bg-black border border-cyan-500 text-cyan-400 rounded-none italic font-black uppercase"
                  : "rounded-full bg-cyan-500 hover:bg-cyan-600 text-white"
              )}
            >
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                Register Now
              </Link>
            </Button>
          </nav>
        )}
      </header>
    </div>
  );
};

export default Header;
