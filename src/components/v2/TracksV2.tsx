import BlurFade from "@/components/ui/blur-fade";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const tracks = [{
  emoji: "💻",
  title: "Computing",
  description: "Architect the next generation of algorithms and high-performance computing frameworks.",
  color: "cyan",
  href: "/tracks#computing"
}, {
  emoji: "⚙️",
  title: "Engineering",
  description: "Optimize complex systems and automate precision manufacturing with intelligent models.",
  color: "blue",
  href: "/tracks#engineering"
}, {
  emoji: "💡",
  title: "Innovation",
  description: "Create disruptive solutions that challenge the boundaries of current technology.",
  color: "emerald",
  href: "/tracks#innovation"
}, {
  emoji: "🎨",
  title: "Generated Art",
  description: "Explore the intersection of human creativity and machine-generated aesthetics.",
  color: "pink",
  href: "/tracks#art"
}, {
  emoji: "🏛️",
  title: "Architecture",
  description: "Reimagine sustainable urban spaces and parametric structures using AI-driven design.",
  color: "amber",
  href: "/tracks#architecture"
}];
const TracksV2 = () => {
  return <section id="tracks" className="py-32 bg-black relative overflow-hidden">
    <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-24">
        <BlurFade delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase mb-4" style={{
            fontFamily: "'Orbitron', sans-serif"
          }}>CHOOSE YOUR TRACK<span className="text-cyan-500">TRACKS</span>
          </h2>
          <div className="flex justify-center gap-2">
            <div className="w-12 h-1 bg-cyan-500/50" />
            <div className="w-4 h-1 bg-cyan-400 animate-pulse" />
            <div className="w-12 h-1 bg-cyan-500/50" />
          </div>
        </BlurFade>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {tracks.map((track, index) => <BlurFade key={track.title} delay={0.1 + index * 0.05} inView>
          <Link to={track.href}>
            <motion.div className="group relative p-10 bg-zinc-950 border border-zinc-800 hover:border-cyan-500/50 transition-all duration-300 h-full overflow-hidden" whileHover={{
              y: -10
            }}>
              {/* Circuit Line Accent */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
              <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />

              {/* Corner Hexagon Pattern */}
              <div className="absolute -top-6 -right-6 w-12 h-12 border border-cyan-500/20 rotate-45 group-hover:bg-cyan-500/10 transition-colors" />

              <div className="mb-10 flex justify-start relative">
                <span className="text-7xl group-hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  {track.emoji}
                </span>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-cyan-500/10 blur-xl group-hover:bg-cyan-500/30 transition-colors" />
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-black text-white tracking-tighter uppercase group-hover:text-cyan-400 transition-colors" style={{
                  fontFamily: "'Orbitron', sans-serif"
                }}>
                  {track.title}
                </h3>
                <p className="text-lg text-zinc-400 leading-relaxed font-light">
                  {track.description}
                </p>
              </div>

              {/* Bottom Tech Label */}
              <div className="mt-8 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] font-black text-cyan-500/60 uppercase tracking-[0.2em] font-mono">
                  SYS_STABLE // 00{index + 1}
                </span>
              </div>
            </motion.div>
          </Link>
        </BlurFade>)}
      </div>
    </div>
  </section>;
};
export default TracksV2;