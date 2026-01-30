import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import Contacts from "./pages/Contact";
import RakanTutorContact from "./pages/RakanTutorContact";
import Tracks from "./pages/Tracks";
import RakanTutor from "./pages/RakanTutor";
import RakanTutorAbout from "./pages/RakanTutorAbout";
import RakanTutorHistory from "./pages/RakanTutorHistory";
import RakanTutorImpact from "./pages/RakanTutorImpact";
import RakanTutorNews from "./pages/RakanTutorNews";
import RakanTutorTerms from "./pages/RakanTutorTerms";
import RakanTutorPrivacy from "./pages/RakanTutorPrivacy";
import NotFound from "./pages/NotFound";
import ScrollToHash from "./components/ScrollToHash";
import Seo from "./components/Seo";
import { isNaicRoute } from "./config/routes";

const queryClient = new QueryClient();

const FaviconUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const faviconPath = isNaicRoute(path) ? '/naic_logo_mark.png' : '/rakantutor_icon_only_square.png';

    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/png';
    link.href = faviconPath;
  }, [location.pathname]);

  return null;
};

const App = () => {
  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (theme: 'dark' | 'light') => {
      if (theme === 'dark') {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    // Always follow system preference
    applyTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      applyTheme(e.matches ? 'dark' : 'light');
    };

    // Listen for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleThemeChange);
    } else {
      mediaQuery.addListener(handleThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleThemeChange);
      } else {
        mediaQuery.removeListener(handleThemeChange);
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <FaviconUpdater />
          <ScrollToHash />
          <Seo />
          <Routes>
            <Route path="/" element={<RakanTutor />} />
            <Route path="/about" element={<RakanTutorAbout />} />
            <Route path="/history" element={<RakanTutorHistory />} />
            <Route path="/impact" element={<RakanTutorImpact />} />
            <Route path="/news" element={<RakanTutorNews />} />
            <Route path="/contact" element={<RakanTutorContact />} />
            <Route path="/terms" element={<RakanTutorTerms />} />
            <Route path="/privacy" element={<RakanTutorPrivacy />} />
            <Route path="/naic" element={<Index />} />
            <Route path="/naic/register" element={<Register />} />
            <Route path="/naic/faq" element={<FAQ />} />
            <Route path="/naic/tracks" element={<Tracks />} />
            <Route path="/naic/contact" element={<Contacts />} />
            <Route path="/naic/privacy" element={<Privacy />} />
            <Route path="/naic/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
