import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import rakanTutorIcon from "/rakantutor_icon_only.png";

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isV2 = location.pathname === "/v2";
  const isRakanTutorPage = !location.pathname.startsWith("/naic");

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
            <div className="flex items-center gap-3">
              <img
                src={isRakanTutorPage ? rakanTutorIcon : "/naic_logo_mark.png"}
                alt={isRakanTutorPage ? "Rakan Tutor Logo" : "NAIC Logo"}
                className="w-10 h-10 object-contain"
              />
              <h2 className={cn(
                "text-3xl font-bold tracking-tight text-foreground",
                isV2 && "text-white neon-text-cyan"
              )}>{isRakanTutorPage ? "Rakan Tutor" : "NAIC '26"}</h2>
            </div>
            <p className={cn(
              "text-lg leading-relaxed font-light",
              isV2 ? "text-zinc-500" : "text-muted-foreground"
            )}>
              {isRakanTutorPage
                ? "Empowering the next generation through innovative STEM education and competitions across Malaysia."
                : t("footer.tagline")
              }
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <p className={cn(
              "text-xs font-semibold uppercase tracking-[0.3em]",
              isV2 ? "text-cyan-500/40" : "text-muted-foreground/40"
            )}>{isRakanTutorPage ? "Quick Links" : t("footer.support")}</p>
            <nav className="flex flex-col gap-3">
              {isRakanTutorPage ? (
                <>
                  <Link to="/naic" className="text-lg transition-colors font-light text-foreground/70 hover:text-foreground">
                    NAIC 2026
                  </Link>
                  <Link to="/#mission" className="text-lg transition-colors font-light text-foreground/70 hover:text-foreground">
                    About Us
                  </Link>
                  <Link to="/contact" className="text-lg transition-colors font-light text-foreground/70 hover:text-foreground">
                    Contact
                  </Link>
                  <Link to="/privacy" className="text-lg transition-colors font-light text-foreground/70 hover:text-foreground">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="text-lg transition-colors font-light text-foreground/70 hover:text-foreground">
                    Terms & Conditions
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/naic/tracks" className={cn(
                    "text-lg transition-colors font-light",
                    isV2 ? "text-zinc-500 hover:text-cyan-400" : "text-foreground/70 hover:text-foreground"
                  )}>{t("nav.tracks")}</Link>
                  <Link to="/naic/faq" className={cn(
                    "text-lg transition-colors font-light",
                    isV2 ? "text-zinc-500 hover:text-cyan-400" : "text-foreground/70 hover:text-foreground"
                  )}>{t("nav.faq")}</Link>
                  <Link to="/naic/contact" className={cn(
                    "text-lg transition-colors font-light",
                    isV2 ? "text-zinc-500 hover:text-cyan-400" : "text-foreground/70 hover:text-foreground"
                  )}>{t("footer.contactUs")}</Link>
                  <Link to="/privacy" className={cn(
                    "text-lg transition-colors font-light",
                    isV2 ? "text-zinc-500 hover:text-cyan-400" : "text-foreground/70 hover:text-foreground"
                  )}>{t("footer.privacy")}</Link>
                  <Link to="/terms" className={cn(
                    "text-lg transition-colors font-light",
                    isV2 ? "text-zinc-500 hover:text-cyan-400" : "text-foreground/70 hover:text-foreground"
                  )}>{t("footer.terms")}</Link>
                </>
              )}
            </nav>
          </div>

          {/* Learn More - Only show on NAIC pages */}
          {!isRakanTutorPage && (
            <div className="space-y-4">
              <p className={cn(
                "text-xs font-semibold uppercase tracking-[0.3em]",
                isV2 ? "text-cyan-500/40" : "text-muted-foreground/40"
              )}>Learn More</p>
              <nav className="flex flex-col gap-3">
                <a
                  href="https://rakantutor.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "text-lg transition-colors font-light",
                    isV2 ? "text-zinc-500 hover:text-cyan-400" : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  Rakan Tutor
                </a>
                <a
                  href="https://sunwayuniversity.edu.my/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "text-lg transition-colors font-light",
                    isV2 ? "text-zinc-500 hover:text-cyan-400" : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  Sunway
                </a>
              </nav>
            </div>
          )}
        </div>

        <div className={cn(
          "mt-20 pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6",
          isV2 ? "border-cyan-500/10" : "border-border"
        )}>
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className={cn(
              "text-base font-light",
              isV2 ? "text-zinc-600" : "text-muted-foreground/60"
            )}>
              {isRakanTutorPage
                ? "© 2026 Rakan Tutor."
                : "© 2026 Rakan Tutor & Sunway University."
              }
            </p>
            {isRakanTutorPage && (
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/rakantutor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "transition-colors",
                    isV2 ? "text-zinc-600 hover:text-cyan-400" : "text-muted-foreground/60 hover:text-foreground"
                  )}
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/rakantutor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "transition-colors",
                    isV2 ? "text-zinc-600 hover:text-cyan-400" : "text-muted-foreground/60 hover:text-foreground"
                  )}
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            )}
          </div>
          <div className="flex items-center gap-8">
            <span className={cn(
              "text-xs font-semibold uppercase tracking-[0.4em]",
              isV2 ? "text-zinc-700" : "text-muted-foreground/30"
            )}>{t("footer.partnership")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
