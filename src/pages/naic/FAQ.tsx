import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const BLUR_FADE_DELAY = 0.05;

const FAQPage = () => {
    const { t } = useTranslation();

    const faqData = t("faq.categories", { returnObjects: true }) as Array<{
        category: string;
        items: Array<{ question: string; answer: string }>;
    }>;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-32 pb-20 px-4 md:px-8">
                <div className="container mx-auto max-w-4xl">
                    <BlurFade delay={BLUR_FADE_DELAY}>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-center">
                                {t("faq.hero.title")} <span className="text-primary">{t("faq.hero.titleHighlight")}</span>
                            </h1>
                            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-center">
                                {t("faq.hero.desc")}
                            </p>
                        </div>
                    </BlurFade>

                    <div className="space-y-12">
                        {Array.isArray(faqData) && faqData.map((category, categoryIndex) => (
                            <BlurFade key={categoryIndex} delay={BLUR_FADE_DELAY * (categoryIndex + 2)}>
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-semibold border-b border-border pb-2 text-left">
                                        {category.category}
                                    </h2>
                                    <Accordion type="single" collapsible className="w-full space-y-4">
                                        {category.items.map((item, itemIndex) => (
                                            <AccordionItem
                                                key={itemIndex}
                                                value={`${categoryIndex}-${itemIndex}`}
                                                className="bg-card border border-border rounded-xl px-6 shadow-sm overflow-hidden transition-all hover:border-primary/50 text-left"
                                            >
                                                <AccordionTrigger className="text-left font-medium hover:no-underline py-5 text-lg">
                                                    {item.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed whitespace-pre-line text-left">
                                                    {item.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </BlurFade>
                        ))}
                    </div>

                    <BlurFade delay={BLUR_FADE_DELAY * (Array.isArray(faqData) ? faqData.length + 2 : 5)}>
                        <div className="mt-20 p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                            <h3 className="text-2xl font-bold mb-4 text-center">{t("faq.cta.still")}</h3>
                            <p className="text-muted-foreground mb-8 text-lg text-center">
                                {t("faq.cta.desc")}
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <a
                                    href="mailto:mingjackt@sunway.edu.my"
                                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                                >
                                    <Mail className="w-5 h-5" />
                                    {t("faq.cta.email")}
                                </a>
                                <a
                                    href="https://wa.me/60192004268"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-green-500 text-white font-medium hover:opacity-90 transition-opacity"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    {t("faq.cta.whatsapp")}
                                </a>
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FAQPage;
