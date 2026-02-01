import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const FooterNAIC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isV2 = location.pathname === "/v2";

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
                src="/naic_logo_mark.png"
                alt="NAIC Logo"
                className="w-10 h-10 object-contain"
              />
              <h2 className={cn(
                "text-3xl font-bold tracking-tight text-foreground",
                isV2 && "text-white neon-text-cyan"
              )}>NAIC '26</h2>
            </div>
            <p className={cn(
              "text-lg leading-relaxed font-light",
              isV2 ? "text-zinc-500" : "text-muted-foreground"
            )}>
              {t("footer.tagline")}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <p className={cn(
              "text-xs font-semibold uppercase tracking-[0.3em]",
              isV2 ? "text-cyan-500/40" : "text-muted-foreground/40"
            )}>{t("footer.support")}</p>
            <nav className="flex flex-col gap-3">
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
              <Link to="/naic/privacy" className={cn(
                "text-lg transition-colors font-light",
                isV2 ? "text-zinc-500 hover:text-cyan-400" : "text-foreground/70 hover:text-foreground"
              )}>{t("footer.privacy")}</Link>
              <Link to="/naic/terms" className={cn(
                "text-lg transition-colors font-light",
                isV2 ? "text-zinc-500 hover:text-cyan-400" : "text-foreground/70 hover:text-foreground"
              )}>{t("footer.terms")}</Link>
            </nav>
          </div>

          {/* Learn More */}
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
              © 2026 Rakan Tutor & Sunway University.
            </p>
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

export default FooterNAIC;
