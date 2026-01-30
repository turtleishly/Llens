import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import DitheredBackground from "@/components/DitheredBackground";
import { ExternalLink } from "lucide-react";

interface NewsArticle {
  title: string;
  date: string;
  url: string;
  image: string;
  source: string;
}

const newsArticles: NewsArticle[] = [
  {
    title: "Education: Addressing gaps in online learning",
    date: "01 Nov 2021",
    url: "https://theedgemalaysia.com/article/education-addressing-gaps-online-learning",
    image: "/news_and_media/theedge.webp",
    source: "The Edge Markets"
  },
  {
    title: "Stars of the Pandemic",
    date: "10 Oct 2021",
    url: "https://www.thestar.com.my/news/education/2021/10/10/participants-have-their-say",
    image: "/news_and_media/WhatsApp-Image-2025-07-09-at-9.07.52-PM.jpeg",
    source: "The Star"
  },
  {
    title: "Youths: We're stepping up",
    date: "01 Nov 2021",
    url: "https://www.thestar.com.my/news/education/2021/10/10/youths-were-stepping-up",
    image: "/news_and_media/thestar-pfmcwvehyz0isgqmytttg6s6kjbzjvkfzo7hohto1s.webp",
    source: "The Star"
  },
  {
    title: "Participants have their say",
    date: "10 Oct 2021",
    url: "https://www.thestar.com.my/news/education/2021/10/10/participants-have-their-say",
    image: "/news_and_media/thestar-pfmcwvehyz0isgqmytttg6s6kjbzjvkfzo7hohto1s.webp",
    source: "The Star"
  },
  {
    title: "Learning Loss is Real & It Affects Children From Low-Income Families More Than Others",
    date: "30 Sep 2021",
    url: "https://worldofbuzz.com/learning-loss-is-real-it-affects-children-from-low-income-families-more-than-others/",
    image: "/news_and_media/WOB-pfmcgnoq2utgimainbihxs2xo991ru74rf2ynnv5ds.webp",
    source: "World of Buzz"
  },
  {
    title: "700 Malaysians Volunteer As Tutors To Prepare B40 Students For SPM",
    date: "21 Sep 2021",
    url: "https://www.wikiimpact.com/700-malaysians-volunteer-as-tutors-to-prepare-b40-students-for-spm/",
    image: "/news_and_media/g48X6rSH_200x200.png",
    source: "Wiki Impact"
  },
  {
    title: "250 Tutors Fight Education Inequality & Help SPM Students From B40 Communities",
    date: "02 Sep 2021",
    url: "https://juiceonline.com/rakan-tutor-education-inequality-spm-students-b40/",
    image: "/news_and_media/juice-logo.webp",
    source: "Juice Online"
  },
  {
    title: "Rakan Tutor集結志願者 為弱勢SPM應試生補習",
    date: "01 Sep 2021",
    url: "https://guangming.com.my/rakan-tutor%e9%9b%86%e7%b5%90%e5%bf%97%e9%a1%98%e8%80%85-%e7%82%ba%e5%bc%b1%e5%8b%a2spm%e6%87%89%e8%a9%a6%e7%94%9f%e8%a3%9c%e7%bf%92",
    image: "/news_and_media/guangming.webp",
    source: "Guang Ming Daily"
  },
  {
    title: "让弱势生考优成绩·Rakan Tutor一对一免费试补习",
    date: "26 Aug 2021",
    url: "https://www.sinchew.com.my/?p=3250145",
    image: "/news_and_media/sinchew.webp",
    source: "Sin Chew Daily"
  },
  {
    title: "750低底层 上一对一免费试补习",
    date: "11 Aug 2021",
    url: "https://www.enanyang.my/news/20210811/Supplement/409000#google_vignette",
    image: "/news_and_media/nanyangsp.webp",
    source: "Nanyang Siang Pau"
  },
  {
    title: "Free one-to-one tutoring for SPM candidates",
    date: "4 Aug 2021",
    url: "https://www.dailyexpress.com.my/news/175716/free-one-to-one-tutoring-for-spm-candidates/",
    image: "/news_and_media/daily-express-new.webp",
    source: "Daily Express"
  },
  {
    title: "Bits + Bytes: A Miscellany of Technology - Rakan Tutor offers extra lessons",
    date: "7 Aug 2021",
    url: "https://theedgemalaysia.com/article/bits-bytes-miscellany-technology-18",
    image: "/news_and_media/theedge.webp",
    source: "The Edge Markets"
  },
  {
    title: "Non-profit Rakan Tutor is on a mission to bridge the Covid-19 learning gap in Malaysia",
    date: "24 July 2021",
    url: "https://www.malaymail.com/news/malaysia/2021/07/24/non-profit-rakan-tutor-is-on-a-mission-to-bridge-the-covid-19-learning-gap/1992210#google_vignette",
    image: "/news_and_media/MalayMail.webp",
    source: "Malay Mail"
  },
  {
    title: "The hidden cost of student's learning due to Covid-19",
    date: "1 July 2021",
    url: "https://www.wikiimpact.com/the-hidden-cost-of-students-learning-due-to-covid-19/",
    image: "/news_and_media/g48X6rSH_200x200.png",
    source: "Wiki Impact"
  },
  {
    title: "#BenderaPutih: Malaysians Come Together To Help Each Other",
    date: "1 July 2021",
    url: "https://hype.my/2021/236512/benderaputih-malaysians-helping-each-other/",
    image: "/news_and_media/Hype-Logo-250px.webp",
    source: "Hype"
  }
];

const RakanTutorNews = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center py-20 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--hero-bg-from))_0%,hsl(var(--hero-bg-via))_45%,hsl(var(--hero-bg-to))_100%)]">
            <DitheredBackground className="z-0" />
          </div>

          <div className="container relative z-10 max-w-5xl mx-auto text-center">
            <BlurFade delay={0.1}>
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
                News & Media
              </h1>
            </BlurFade>
            <BlurFade delay={0.2}>
              <p className="text-xl lg:text-2xl text-muted-foreground">
                Our features, and stories about us
              </p>
            </BlurFade>
          </div>
        </section>

        {/* News Grid Section */}
        <section className="py-20 px-4 md:px-8 bg-background">
          <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article, index) => (
                <BlurFade key={index} delay={0.1 + index * 0.05}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.source}
                        className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-4 h-4 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="font-medium">{article.source}</span>
                        <time>{article.date}</time>
                      </div>
                    </div>
                  </a>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RakanTutorNews;
