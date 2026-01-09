import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BlurFade from "@/components/ui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

const faqs = [
  {
    question: "Is there a registration fee?",
    answer: "No, participation is free.",
  },
  {
    question: "Are students from private and international schools eligible?",
    answer: "Yes, we welcome students from all backgrounds.",
  },
  {
    question: "Is the AI Masterclass free?",
    answer: "Yes, the AI masterclass is free.",
  },
  {
    question: "When do I know the competition topic?",
    answer:
      "Competition topics will be announced after registration closes, which will be on April 3, 2026.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="bg-secondary py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <BlurFade key={index} delay={BLUR_FADE_DELAY * index} inView>
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-foreground font-medium hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </BlurFade>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
