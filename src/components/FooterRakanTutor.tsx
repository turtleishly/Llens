import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import rakanTutorIcon from "/rakantutor_icon_only.png";

const FooterRakanTutor = () => {
  return (
    <footer className="py-20 border-t transition-colors duration-300 relative overflow-hidden px-4 md:px-8 bg-background border-border mt-20">
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          {/* Logo and Tagline */}
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-3">
              <img
                src={rakanTutorIcon}
                alt="Rakan Tutor Logo"
                className="w-10 h-10 object-contain"
              />
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Rakan Tutor
              </h2>
            </div>
            <p className="text-lg leading-relaxed font-light text-muted-foreground">
              Empowering the next generation through innovative STEM education and competitions across Malaysia.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/40">
              Quick Links
            </p>
            <nav className="flex flex-col gap-3">
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
            </nav>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className="text-base font-light text-muted-foreground/60">
              © 2026 Rakan Tutor.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/rakantutor/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-muted-foreground/60 hover:text-foreground"
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
                className="transition-colors text-muted-foreground/60 hover:text-foreground"
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterRakanTutor;
