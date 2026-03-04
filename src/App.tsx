import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

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

const queryClient = new QueryClient();

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

    applyTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      applyTheme(e.matches ? 'dark' : 'light');
    };

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
          <ScrollToHash />
          <Seo />
          <Routes>
            <Route path="/" element={<LlensStart />} />
            <Route path="/llens" element={<LlensHome />} />
            <Route path="/llens/start" element={<LlensStart />} />
            <Route path="/llens/chapter-1" element={<LlensChapter1 />} />
            <Route path="/llens/chapter-2" element={<LlensChapter2 />} />
            <Route path="/llens/chapter-2/game" element={<LlensChapter2Game />} />
            <Route path="/llens/guide" element={<LlensChapter1 />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
