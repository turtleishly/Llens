import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
// NAIC Pages
import NaicHome from "./pages/naic/NaicHome";
import Register from "./pages/naic/Register";
import NaicPrivacy from "./pages/naic/Privacy";
import NaicTerms from "./pages/naic/Terms";
import FAQ from "./pages/naic/FAQ";
import NaicContact from "./pages/naic/Contact";
import Tracks from "./pages/naic/Tracks";

// Rakan Tutor Pages
import RakanTutor from "./pages/rakantutor/Home";
import RakanTutorAbout from "./pages/rakantutor/About";
import RakanTutorContact from "./pages/rakantutor/Contact";
import RakanTutorHistory from "./pages/rakantutor/History";
import RakanTutorImpact from "./pages/rakantutor/Impact";
import RakanTutorNews from "./pages/rakantutor/News";
import RakanTutorTerms from "./pages/rakantutor/Terms";
import RakanTutorPrivacy from "./pages/rakantutor/Privacy";

// Team Pages
import MeetTheTeam from "./pages/rakantutor/team/Current";
import MeetTheTeam2023 from "./pages/rakantutor/team/Year2023";
import MeetTheTeam2022 from "./pages/rakantutor/team/Year2022";
import MeetTheTeam2021 from "./pages/rakantutor/team/Year2021";

// LLens Pages
import LlensHome from "./pages/llens/LlensHome";
import LlensStart from "./pages/llens/LlensStart";
import LlensChapter1 from "./pages/llens/LlensChapter1";
import LlensChapter2 from "./pages/llens/LlensChapter2";
import LlensChapter2Game from "./pages/llens/LlensChapter2Game";

// Other
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
            <Route path="/meet-the-team" element={<MeetTheTeam />} />
            <Route path="/meet-the-team-2023-2024" element={<MeetTheTeam2023 />} />
            <Route path="/meet-the-team-2022-2023" element={<MeetTheTeam2022 />} />
            <Route path="/meet-the-team-2021-2022" element={<MeetTheTeam2021 />} />
            <Route path="/naic" element={<NaicHome />} />
            <Route path="/naic/register" element={<Register />} />
            <Route path="/naic/faq" element={<FAQ />} />
            <Route path="/naic/tracks" element={<Tracks />} />
            <Route path="/naic/contact" element={<NaicContact />} />
            <Route path="/naic/privacy" element={<NaicPrivacy />} />
            <Route path="/naic/terms" element={<NaicTerms />} />
            <Route path="/llens/start" element={<LlensStart />} />
            <Route path="/llens/chapter-1" element={<LlensChapter1 />} />
            <Route path="/llens/chapter-2" element={<LlensChapter2 />} />
            <Route path="/llens/chapter-2/game" element={<LlensChapter2Game />} />
            <Route path="/llens/guide" element={<LlensChapter1 />} />
            <Route path="/llens" element={<LlensHome />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
