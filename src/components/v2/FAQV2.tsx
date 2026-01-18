import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BlurFade from "@/components/ui/blur-fade";
const faqs = [{
    question: "Is there a registration fee?",
    answer: "No, participation is free."
}, {
    question: "Are students from private and international schools eligible?",
    answer: "Yes, we welcome students from all backgrounds."
}, {
    question: "Is the AI Masterclass free?",
    answer: "Yes, the AI masterclass is free."
}, {
    question: "How many tracks are there?",
    answer: "There are five tracks: Computing, Engineering, Innovation, Generated Art, and Architecture."
}, {
    question: "When do I know the competition topic?",
    answer: "Competition topics will be announced after registration closes, which will be on April 3, 2026."
}];
const FAQV2 = () => {
    return <section id="faq" className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16">
                <div className="lg:w-1/3">
                    <BlurFade delay={0.1}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]" style={{
                            fontFamily: "'Orbitron', sans-serif"
                        }}>FAQ'S:
                            STATUS?<br /><span className="text-cyan-500">STATUS?</span>
                        </h2>
                        <p className="text-lg text-zinc-400 font-light mb-8 max-w-sm">
                            System documentation and protocol details for NAIC 2026 participants.
                        </p>
                        <div className="p-6 bg-zinc-950 border border-zinc-900 border-l-cyan-500 border-l-2">
                            <p className="text-[10px] font-black text-cyan-500 mb-1 tracking-[0.2em] uppercase">DIRECT UPLINK</p>
                            <p className="text-sm text-zinc-500 mb-4">Manual intervention available via encrypted channel.</p>
                            <a href="mailto:clement@sunway.edu.my" className="text-cyan-400 font-mono text-sm hover:text-cyan-300 transition-colors uppercase">admin@naic.sys</a>
                        </div>
                    </BlurFade>
                </div>

                <div className="lg:w-2/3">
                    <Accordion type="single" collapsible className="gap-4 flex flex-col">
                        {faqs.map((faq, index) => <BlurFade key={index} delay={0.2 + index * 0.05} inView>
                            <AccordionItem value={`item-${index}`} className="bg-zinc-950/50 border border-zinc-900 px-8 py-2 hover:border-cyan-500/30 transition-all duration-300 group data-[state=open]:border-cyan-500/50">
                                <AccordionTrigger className="text-lg md:text-xl font-black text-white italic text-left hover:no-underline uppercase tracking-tight group-data-[state=open]:text-cyan-400 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <span className="text-cyan-500/20 font-mono text-xs mt-1">[{index + 1}]</span>
                                        {faq.question}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-zinc-400 text-lg leading-relaxed pb-6 pl-10 border-l border-cyan-500/10 ml-2">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </BlurFade>)}
                    </Accordion>
                </div>
            </div>
        </div>
    </section>;
};
export default FAQV2;