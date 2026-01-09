import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type DitheredBackgroundProps = {
  className?: string;
};

const DitheredBackground = ({ className }: DitheredBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const grid = width > 900 ? 6 : 5;
      const radius = Math.min(width, height) * 0.36;
      const { x: mx, y: my } = mouseRef.current;
      const t = time * 0.0004;

      for (let y = 0; y < height; y += grid) {
        for (let x = 0; x < width; x += grid) {
          const dx = mx - x;
          const dy = my - y;
          const dist = Math.hypot(dx, dy);
          const focus = mx >= 0 ? Math.exp(-(dist * dist) / (2 * radius * radius)) : 0;
          const n = Math.sin(x * 0.09 + y * 0.12 + t * 2.2) * 0.5 + 0.5;
          const threshold = 0.58 - focus * 0.35 + Math.sin((x + y) * 0.018 + t * 1.9) * 0.05;

          if (n > threshold) {
            const alpha = 0.16 + focus * 0.55;
            const hue = 212 + focus * 20 + Math.sin(t * 1.2 + (x + y) * 0.012) * 8;
            const sat = 66 + focus * 22;
            const light = 58 + focus * 20;
            ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
            ctx.fillRect(x, y, 1.2, 1.2);
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full opacity-60", className)}
    />
  );
};

export default DitheredBackground;
