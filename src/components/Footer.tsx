import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-coral flex items-center justify-center">
              <span className="font-bold text-primary">N</span>
            </div>
            <div>
              <p className="font-semibold text-lg">NAIC</p>
              <p className="text-sm text-primary-foreground/70">
                Organised by Rakan Tutor & Sunway
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-primary-foreground/70">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Contact Us
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          <p>© 2025 Rakan Tutor & Sunway. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
