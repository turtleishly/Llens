import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import rakanTutorIcon from "/rakantutor_icon_only.png";

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isV2 = location.pathname === "/v2";
  const isHome = location.pathname === "/";
  const [isNaicOpen, setIsNaicOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsNaicOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsNaicOpen(false);
    }, 300);
  };

  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    setIsAboutOpen(true);
  };

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setIsAboutOpen(false);
    }, 300);
  };

  useEffect(() => {
    setIsNaicOpen(false);
    setIsAboutOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const isNaicPage = location.pathname.startsWith("/naic");

  const navLinks = [
    { label: "About", href: "/about", isDropdown: true },
    { label: "Impact", href: "/impact" },
    { label: "News", href: "/news" },
    { label: "NAIC 2026", href: "/naic" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 pt-0 px-0 translate-y-0 transition-transform duration-300">
        <header
          className={cn(
            "w-full transition-all duration-500 py-3 px-8 border-b",
            scrolled
              ? isV2
                ? "bg-black/80 backdrop-blur-md border-cyan-500/20 py-2"
                : "bg-transparent backdrop-blur-md border-border/10 py-2"
              : "bg-transparent border-transparent py-4"
          )}
        >
          <div className="max-w-[1400px] mx-auto flex items-center">
            {/* Left: Logo Container */}
            <div className="flex-1 flex justify-start">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img
                  src={rakanTutorIcon}
                  alt="Rakan Tutor Logo"
                  className="w-8 h-8 object-contain"
                />
                <span className={cn(
                  "font-display font-bold text-xl tracking-tight text-foreground whitespace-nowrap",
                  isV2 && "text-white neon-text-cyan"
                )}>Rakan Tutor</span>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => {
                if (link.label === "About") {
                  return (
                    <DropdownMenu key={link.label} open={isAboutOpen} onOpenChange={setIsAboutOpen} modal={false}>
                      <div
                        onMouseEnter={handleAboutMouseEnter}
                        onMouseLeave={handleAboutMouseLeave}
                        className="flex items-center h-full"
                      >
                        <DropdownMenuTrigger
                          className={cn(
                            "flex items-center gap-1 text-base font-medium font-display transition-all tracking-wide outline-none",
                            isV2
                              ? "text-zinc-400 hover:text-cyan-400 uppercase font-black italic text-sm"
                              : "text-foreground/70 hover:text-foreground"
                          )}
                          asChild
                        >
                          <Link to={link.href} className="flex items-center gap-1 py-2">
                            {link.label}
                            <ChevronDown className="h-4 w-4" />
                          </Link>
                        </DropdownMenuTrigger>
                      </div>
                      <DropdownMenuContent
                        align="center"
                        sideOffset={0}
                        className="bg-background/95 backdrop-blur-md border-border/50 rounded-sm p-1 w-48 shadow-2xl"
                        onMouseEnter={handleAboutMouseEnter}
                        onMouseLeave={handleAboutMouseLeave}
                      >
                        <DropdownMenuItem asChild>
                          <Link to="/about" className="cursor-pointer">About Us</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/meet-the-team" className="cursor-pointer">Team 2025/26</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/meet-the-team-2023-2024" className="cursor-pointer">Team 2023/24</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/meet-the-team-2022-2023" className="cursor-pointer">Team 2022/23</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/meet-the-team-2021-2022" className="cursor-pointer">Team 2021/22</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/history" className="cursor-pointer">Our History</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                }

                if (link.label === "NAIC 2026") {
                  return (
                    <DropdownMenu key={link.label} open={isNaicOpen} onOpenChange={setIsNaicOpen} modal={false}>
                      <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="flex items-center h-full"
                      >
                        <DropdownMenuTrigger
                          className={cn(
                            "flex items-center gap-1 text-base font-medium font-display transition-all tracking-wide outline-none",
                            isV2
                              ? "text-zinc-400 hover:text-cyan-400 uppercase font-black italic text-sm"
                              : "text-foreground/70 hover:text-foreground"
                          )}
                          asChild
                        >
                          <Link to={link.href} className="flex items-center gap-1 py-2">
                            {link.label}
                            <ChevronDown className="h-4 w-4" />
                          </Link>
                        </DropdownMenuTrigger>
                      </div>
                      <DropdownMenuContent
                        align="center"
                        sideOffset={0}
                        className="bg-background/95 backdrop-blur-md border-border/50 rounded-sm p-1 w-48 shadow-2xl"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <DropdownMenuItem asChild>
                          <Link to="/naic" className="cursor-pointer">NAIC Home</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/naic/tracks" className="cursor-pointer">{t("nav.tracks")}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/naic#prizes" className="cursor-pointer">{t("nav.prizes")}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/naic#timeline" className="cursor-pointer">{t("nav.timeline")}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/naic/faq" className="cursor-pointer">{t("nav.faq")}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/naic/contact" className="cursor-pointer">{t("nav.contact")}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="bg-cyan-500 text-white focus:bg-cyan-600 focus:text-white hover:bg-cyan-600 hover:text-white mt-2 font-bold rounded-sm py-2.5">
                          <Link to="/naic/register" className="cursor-pointer">Register</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                }

                return (
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
                );
              })}
            </nav>

            {/* Right: Actions Container */}
            <div className="flex-1 flex justify-end gap-6 items-center">
              {/* Language Switcher - Hidden */}
              {/* <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className={cn(
                "hidden md:flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest",
                isV2 ? "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/50" : "text-foreground/60 hover:text-foreground"
              )}
            >
              <Globe className="h-4 w-4" />
              {i18n.language.startsWith("en") ? "EN" : "BM"}
            </Button> */}

              {isHome && !isNaicPage && (
                <div className="hidden lg:block">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className={cn(
                      "h-10 rounded-full px-5 text-sm font-semibold",
                      isV2
                        ? "border-cyan-500 text-cyan-400 hover:bg-cyan-950"
                        : "border-border text-foreground hover:bg-muted"
                    )}
                  >
                    <Link to="/llens/start">LLens</Link>
                  </Button>
                </div>
              )}
              <div className="hidden lg:block">
                <Button
                  asChild
                  className={cn(
                    "h-10 rounded-full px-6 text-base font-semibold shadow-md transition-all hover:scale-105",
                    isV2
                      ? "bg-black border border-cyan-500 text-cyan-400 rounded-none italic font-black uppercase tracking-tighter hover:bg-cyan-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      : "bg-cyan-500 text-white border-none hover:bg-cyan-600"
                  )}
                >
                  {isNaicPage ? (
                    <Link to="/naic/register">Register Now</Link>
                  ) : (
                    <a
                      href="https://www.notion.so/Rakan-Tutor-is-Recruiting-2ec310a98cfb813e84fcdf0937868586?source=copy_link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Us
                    </a>
                  )}
                </Button>
              </div>

              {/* Mobile Menu Button - now integrated into the right container */}
              <div className="flex items-center gap-4 lg:hidden">
                {/* Language Switcher - Hidden */}
                {/* <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className={cn(
                  "flex items-center gap-2 font-display font-bold text-[10px] uppercase tracking-widest",
                  isV2 ? "text-cyan-400" : "text-foreground/60"
                )}
              >
                {i18n.language.startsWith("en") ? "EN" : "BM"}
              </Button> */}
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

        </header>
      </div>

      {/* Mobile Navigation Overlay */}
      {
        isMenuOpen && (
          <div className="fixed inset-0 z-[100] bg-background lg:hidden flex flex-col animate-in fade-in slide-in-from-top duration-300">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between py-5 px-8 border-b border-border/10">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3">
                <img
                  src={rakanTutorIcon}
                  alt="Rakan Tutor Logo"
                  className="w-8 h-8 object-contain"
                />
                <span className={cn(
                  "font-display font-bold text-xl tracking-tight text-foreground",
                  isV2 && "text-white neon-text-cyan"
                )}>Rakan Tutor</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className={cn("text-foreground", isV2 && "text-cyan-400")}
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Mobile Menu Content */}
            <nav className="flex-1 overflow-y-auto py-10 px-8 flex flex-col gap-8">
              {navLinks.map((link, index) => {
                if (link.label === "About") {
                  return (
                    <div key={link.label} className="flex flex-col gap-4">
                      <span className={cn(
                        "text-2xl font-bold font-display tracking-tight text-primary",
                        isV2 && "text-cyan-400 uppercase italic font-black"
                      )}>
                        {link.label}
                      </span>
                      <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/20">
                        <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-foreground/80 hover:text-foreground">About Us</Link>
                        <Link to="/meet-the-team" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-foreground/80 hover:text-foreground">Team 2025/26</Link>
                        <Link to="/meet-the-team-2023-2024" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-foreground/80 hover:text-foreground">Team 2023/24</Link>
                        <Link to="/meet-the-team-2022-2023" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-foreground/80 hover:text-foreground">Team 2022/23</Link>
                        <Link to="/meet-the-team-2021-2022" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-foreground/80 hover:text-foreground">Team 2021/22</Link>
                        <Link to="/history" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-foreground/80 hover:text-foreground">Our History</Link>
                      </div>
                    </div>
                  );
                }
                if (link.label === "NAIC 2026") {
                  return (
                    <div key={link.label} className="flex flex-col gap-4">
                      <span className={cn(
                        "text-2xl font-bold font-display tracking-tight text-primary",
                        isV2 && "text-cyan-400 uppercase italic font-black"
                      )}>
                        {link.label}
                      </span>
                      <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/20">
                        <Link to="/naic" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-foreground/80 hover:text-foreground">NAIC Home</Link>
                        <Link to="/naic/tracks" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-foreground/80 hover:text-foreground">{t("nav.tracks")}</Link>
                        <Link to="/naic#prizes" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-foreground/80 hover:text-foreground">{t("nav.prizes")}</Link>
                        <Link to="/naic#timeline" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-foreground/80 hover:text-foreground">{t("nav.timeline")}</Link>
                        <Link to="/naic/faq" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-foreground/80 hover:text-foreground">{t("nav.faq")}</Link>
                        <Link to="/naic/contact" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-foreground/80 hover:text-foreground">{t("nav.contact")}</Link>
                        <Link to="/naic/register" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-cyan-500 hover:text-cyan-600 mt-2">Register</Link>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={cn(
                      "text-3xl font-bold font-display tracking-tight transition-colors",
                      isV2
                        ? "text-zinc-400 hover:text-cyan-400 uppercase font-black italic"
                        : "text-foreground hover:text-primary"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="mt-auto pt-10">
                <Button
                  asChild
                  className={cn(
                    "w-full h-14 text-xl font-bold shadow-lg",
                    isV2
                      ? "bg-black border border-cyan-500 text-cyan-400 rounded-none italic font-black uppercase tracking-tighter"
                      : "rounded-full bg-cyan-500 hover:bg-cyan-600 text-white"
                  )}
                >
                  {isNaicPage ? (
                    <Link to="/naic/register" onClick={() => setIsMenuOpen(false)}>Register Now</Link>
                  ) : (
                    <a
                      href="https://www.notion.so/Rakan-Tutor-is-Recruiting-2ec310a98cfb813e84fcdf0937868586?source=copy_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Join Us
                    </a>
                  )}
                </Button>
              </div>
            </nav>
          </div>
        )
      }
    </>
  );
};

export default Header;
