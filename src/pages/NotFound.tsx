import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[110px]" />
      </div>

      <div className="w-full max-w-2xl rounded-3xl border border-border/60 bg-card/80 p-8 text-center shadow-sm md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-primary">Error</p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">This page does not exist or may have been moved.</p>
        <p className="mt-2 text-sm text-muted-foreground/90">
          Requested path: <span className="font-mono text-foreground">{location.pathname}</span>
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-2xl px-8 py-6 text-base">
            <Link to="/">Back to Home</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-2xl px-8 py-6 text-base">
            <Link to="/llens/chapter-1">Start LLens</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
