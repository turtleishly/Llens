import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Check initial theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const navLinks = [
    { label: "Tracks", href: "#tracks" },
    { label: "Prizes", href: "#prizes" },
    { label: "Timeline", href: "#timeline" },
    { label: "FAQ", href: "#faq" },
    { label: "Register", href: "#registration" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-0 px-0 translate-y-0 transition-transform duration-300">
      <header
        className={cn(
          "w-full transition-all duration-500 py-3 px-8 border-b",
          scrolled
            ? "bg-transparent backdrop-blur-md border-border/10 shadow-sm py-2"
            : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="max-w-[1400px] mx-auto flex items-center">
          {/* Left: Logo Container */}
          <div className="flex-1 flex justify-start">
            <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/naic_logo_mark.png" alt="NAIC Logo" className="w-8 h-8 object-contain" />
              <span className="font-display font-bold text-xl tracking-tight text-foreground">NAIC '26</span>
            </a>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-medium font-display text-foreground/70 hover:text-foreground transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Actions Container */}
          <div className="flex-1 flex justify-end gap-6 items-center">
            <div className="hidden md:block">
              <Button
                asChild
                className="h-10 rounded-full px-6 text-base font-semibold bg-cyan-500 text-white border-none shadow-md hover:shadow-lg transition-all hover:scale-105 hover:bg-cyan-600"
              >
                <a href="#registration">
                  Register Now
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button - now integrated into the right container */}
            <div className="flex items-center gap-4 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-4 px-6 border-t border-black/5 dark:border-white/10 animate-fade-in flex flex-col gap-4 backdrop-blur-lg bg-black/5 dark:bg-white/5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-lg font-medium font-display text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="w-full rounded-full bg-cyan-500 hover:bg-cyan-600 text-white mt-2">
              <a href="#registration" onClick={() => setIsMenuOpen(false)}>
                Register Now
              </a>
            </Button>
          </nav>
        )}
      </header>
    </div>
  );
};

export default Header;
