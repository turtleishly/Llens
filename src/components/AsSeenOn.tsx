import BlurFade from "@/components/ui/blur-fade";
import { motion } from "framer-motion";

const pressLinks = [
    { name: "Harian Metro", url: "https://www.hmetro.com.my/mutakhir/2025/07/1242377/ai-perlu-dimanfaatkan-rakyat-malaysia" },
    { name: "The Vibes", url: "https://www.thevibes.com/articles/news/110684/upcoming-ai-action-plan-to-bolster-ethical-standards-says-gobind" },
    { name: "Bernama", url: "https://www.bernama.com/en/news.php/crime_courts/news.php?id=2446957" },
    { name: "The Star", url: "https://www.thestar.com.my/news/nation/2025/07/20/ai-roadmap-by-3q-this-year" },
    { name: "Astro Awani", url: "https://www.astroawani.com/berita-malaysia/pendigitalan-data-persediaan-menjadi-negara-ai-gobind-singh-530176%3famp=1" },
    { name: "The Edge Malaysia", url: "https://theedgemalaysia.com/node/763287" },
    { name: "eNanyang", url: "https://www.enanyang.my/news/20250719/Finance/931191" },
    { name: "Oriental Daily", url: "https://www.orientaldaily.com.my/news/nation/2025/07/19/748166" },
    { name: "Sin Chew", url: "https://www.sinchew.com.my/news/20250719/nation/6710486" },
    { name: "Buletin TV3", url: "https://www.buletintv3.my/nasional/pelan-tindakan-teknologi-ai-2026-2030-perkukuh-garis-panduan-penggunaan/" },
    { name: "Business Today", url: "https://www.businesstoday.com.my/2025/07/23/malaysia-hosts-inaugural-national-ai-competition-to-empower-youth-innovators/" },
    { name: "EasyUni", url: "https://www.easyuni.com/malaysia/sunway-university-250/news/1306/malaysias-brightest-students-shine-at-national-ai-competition-2025/" },
    { name: "8TV", url: "https://www.youtube.com/live/GNR1OkdKyE4" }
];

// Duplicate links for seamless transition
const duplicatedLinks = [...pressLinks, ...pressLinks, ...pressLinks];

const AsSeenOn = () => {
    return (
        <section className="py-16 bg-background relative overflow-hidden border-y border-border/50">
            <div className="container mx-auto px-4 text-center mb-8 relative z-10">
                <BlurFade delay={0.1} inView>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground/80">
                        As Seen On
                    </h2>
                </BlurFade>
            </div>

            <div className="relative flex overflow-x-hidden py-12">
                <motion.div
                    className="flex whitespace-nowrap gap-12 md:gap-20 items-center"
                    animate={{
                        x: ["0%", "-33.33%"],
                    }}
                    transition={{
                        duration: 50,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {duplicatedLinks.map((press, index) => (
                        <a
                            key={`${press.name}-${index}`}
                            href={press.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-500 opacity-40 hover:opacity-100"
                        >
                            <span className="text-lg md:text-3xl font-bold tracking-tighter text-muted-foreground group-hover:text-cyan-600 transition-colors">
                                {press.name}
                            </span>
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold py-1.5 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl transform translate-y-2 group-hover:translate-y-0">
                                View Article
                            </div>
                        </a>
                    ))}
                </motion.div>

                {/* Gradient overlays to fade edges */}
                <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
                <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
            </div>

            {/* Decorative background elements (subtle) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl" />
            </div>
        </section>
    );
};

export default AsSeenOn;
