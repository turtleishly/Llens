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

const BLUR_FADE_DELAY = 0.05;

const faqData = [
    {
        category: "About the Competition",
        items: [
            {
                question: "What is the National AI Competition?",
                answer: "The National AI Competition is Malaysia's premier artificial intelligence competition for students from the upper-secondary to the pre-university (or equivalent) stage. Co-hosted by Rakan Tutor and Sunway University, this initiative aims to inspire and support AI application among Malaysian youth. The challenge provides a platform for students to showcase their AI solutions, promoting technological advancement and preparing them for future academic and professional pursuits."
            },
            {
                question: "What is the objective of the National AI Competition?",
                answer: "To promote AI knowledge, encourage innovation, and inspire the next generation of tech leaders."
            }
        ]
    },
    {
        category: "General",
        items: [
            {
                question: "How does the competition work?",
                answer: "The National AI Competition consists of two rounds: an online preliminary round and an in-person final. Here's how it works:\n1. Registration: Register your team by March 16.\n2. Competition Topics & AI Masterclass: Receive the competition topics and participate in a free AI masterclass from March 31 - April 2.\n3. Build & Submit: Work on your project as a team and submit your proposal by May 4.\nFinalists will be announced on May 15 and will compete in the final round at Sunway on June 13. Refer to the timeline for detailed dates and steps."
            },
            {
                question: "How many rounds will there be?",
                answer: "There will be a total of 2 rounds. The first round will be conducted fully online. Shortlisted participants will be invited to the final round at Sunway University."
            },
            {
                question: "How many tracks are there?",
                answer: "There are five tracks:\n- Computing: Architect the next generation of algorithms.\n- Engineering: Optimize complex systems and industrial applications.\n- Innovation: Design AI solutions for social impact.\n- Generated Art: Explore human creativity and machine-generated aesthetics.\n- Architecture: Reimagine sustainable urban spaces.\nRefer to the Track page to learn more."
            },
            {
                question: "Where and when will the final be held?",
                answer: "The grand finals will be held on June 13, 2026 at Sunway University, Bandar Sunway. Transportation will be provided by Sunway University for shortlisted participants."
            },
            {
                question: "Can I join remotely for the final?",
                answer: "We highly encourage all finalists to attend the final round in person. Sunway will sponsor all reasonable travel costs to ensure your participation. However, if you are absolutely unable to attend (for valid reasons), exceptions may be made on a case-by-case basis."
            },
            {
                question: "How many teams will be selected for the final?",
                answer: "A total of 60 teams will be shortlisted for the final round at Sunway University. This consist of the Top 10 teams from each of the five tracks."
            },
            {
                question: "How do we shortlist teams for the final?",
                answer: "Finalists will be selected based on the judging criteria specific to their chosen track. A brief overview of the criteria can be found under the track page on our website. The announcement of finalists will be on May 15, 2026."
            }
        ]
    },
    {
        category: "Participation & Registration",
        items: [
            {
                question: "Who can participate?",
                answer: "Teams of 4 students from upper-secondary to pre-university (or equivalent) stage enrolled in Malaysian-based institutions."
            },
            {
                question: "How do I join?",
                answer: "1. Check your eligibility.\n2. Fill up the registration form.\nRegistration closes on March 16, 2026 23:59 MYT."
            },
            {
                question: "Do I have to pay to register to join the competition?",
                answer: "No, registration for the competition is completely free."
            },
            {
                question: "I don't know about AI. Can I join?",
                answer: "Yes, you can join even if you don't know about AI. We will provide workshops and compile resources to help you prepare for the competition."
            },
            {
                question: "Is there a limit to the number of participants from each school?",
                answer: "No, there is no limit to the number of participants from each school. A school can send multiple teams of 4, participating in different categories and tracks, without any restrictions."
            },
            {
                question: "Can I have teams less than 4 people?",
                answer: "No, all teams must consist of exactly 4 members."
            },
            {
                question: "Can I form a team with friends from other schools?",
                answer: "Yes, you can form a team with friends from other schools."
            },
            {
                question: "Can a team have students from different category?",
                answer: "Yes, a team can have students from different school levels. However, the team will compete in the category of the highest-level member (e.g., if one member is in pre-university, the team will compete as a pre-university team)."
            },
            {
                question: "Are students from private and international schools allowed?",
                answer: "Yes, students from international and private schools are welcome to join!"
            },
            {
                question: "Can non-Malaysians participate?",
                answer: "Yes, non-Malaysians are welcome to participate, even if they do not reside in Malaysia. However, they will need to arrange and cover their own travel to attend the final round if shortlisted."
            },
            {
                question: "Can I participate in more than one track?",
                answer: "No, participants can only join one track."
            },
            {
                question: "I think I registered, but I'm not sure.",
                answer: "If you think you registered but are not sure, check for a confirmation email. All registered teams will receive a confirmation email together with competition materials, themes, and masterclass access details on March 19, 2026. If these updates have not been received by then, please email us at naic@rakantutor.org for assistance."
            },
            {
                question: "Is a teacher advisor required?",
                answer: "Yes. A teacher advisor is required."
            },
            {
                question: "Do I need coding experience for the competition?",
                answer: "It depends on the track you choose:\n- Computing and Engineering Tracks: Coding or technical experience is highly encouraged.\n- Innovation, Generated Art, and Architecture Tracks: Coding experience is not required. We focus on design, creativity, and problem-solving."
            }
        ]
    },
    {
        category: "AI Masterclass & Resources",
        items: [
            {
                question: "How do I prepare for the competition?",
                answer: "To prepare for the competition:\n1. Attend the AI Masterclass provided to gain insights and skills.\n2. Access additional free resources shared by the organizers."
            },
            {
                question: "Is the AI Masterclass free?",
                answer: "Yes, the AI Masterclass is free. Each track will have a free AI Masterclass, which contains 2 workshops."
            },
            {
                question: "How many AI Masterclasses are there?",
                answer: "There is only one AI masterclass for each track. Under each AI masterclass, there are 2 workshops."
            },
            {
                question: "Can I join the AI Masterclass for other tracks?",
                answer: "The AI Masterclass for other tracks will take place at the same time, so you can't attend them live. However, if you have signed up as a participant, you will have access to the AI Masterclass recordings of other tracks."
            },
            {
                question: "What are the AI Masterclass topics?",
                answer: "Details will be shared closer to the date, but the objective is to ensure you feel fully prepared for your submission."
            },
            {
                question: "When is the AI Masterclass?",
                answer: "The date will be announced soon, and reminders will be shared in the WhatsApp group."
            },
            {
                question: "Will the AI Masterclass be recorded?",
                answer: "Yes, but live attendance is encouraged for Q&A."
            },
            {
                question: "Will the AI Masterclass be physical or virtual?",
                answer: "The AI Masterclass will be conducted virtually on Zoom or Microsoft Teams."
            },
            {
                question: "If I can't make it to the AI Masterclass, does it disqualify me?",
                answer: "No, it won't disqualify you. We highly encourage attending the AI Masterclass as it will help you prepare and allow you to ask questions during the Q&A. However, we understand if you can't make it. You can watch the recordings later, and even if you choose not to, it will not affect your participation in the competition."
            }
        ]
    },
    {
        category: "Certificates, Prizes & Recognition",
        items: [
            {
                question: "Do all participants get a certificate of participation?",
                answer: "Yes, all participants will receive an e-Certificate of Participation."
            },
            {
                question: "What do winners get?",
                answer: "Winners will receive trophies, cash prizes, and Sunway Bursaries (tuition fee waivers) for eligible programmes at Sunway University or Sunway College KL. Detailed bursary conditions can be found in our Terms & Conditions."
            }
        ]
    },
    {
        category: "Logistics & Communication",
        items: [
            {
                question: "What is the method of communication?",
                answer: "We will use a WhatsApp community group for team leaders and teacher advisors to share important updates. Additionally, we will send emails directly to participants. Please ensure you regularly check your email inbox (and spam / junk folder) to avoid missing any communications from us."
            },
            {
                question: "What if I have further inquiries?",
                answer: "If you have any further questions, please email naic@rakantutor.org or WhatsApp us at +60 19-917 9356. For specific questions regarding bursaries or terms, you may also contact clement@sunway.edu.my or mingjackt@sunway.edu."
            }
        ]
    }
];

const FAQPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-32 pb-20 px-4 md:px-8">
                <div className="container mx-auto max-w-4xl">
                    <BlurFade delay={BLUR_FADE_DELAY}>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                                Frequently Asked <span className="text-primary">Questions</span>
                            </h1>
                            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                                Everything you need to know about the National AI Competition 2026.
                            </p>
                        </div>
                    </BlurFade>

                    <div className="space-y-12">
                        {faqData.map((category, categoryIndex) => (
                            <BlurFade key={categoryIndex} delay={BLUR_FADE_DELAY * (categoryIndex + 2)}>
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-semibold border-b border-border pb-2">
                                        {category.category}
                                    </h2>
                                    <Accordion type="single" collapsible className="w-full space-y-4">
                                        {category.items.map((item, itemIndex) => (
                                            <AccordionItem
                                                key={itemIndex}
                                                value={`${categoryIndex}-${itemIndex}`}
                                                className="bg-card border border-border rounded-xl px-6 shadow-sm overflow-hidden transition-all hover:border-primary/50"
                                            >
                                                <AccordionTrigger className="text-left font-medium hover:no-underline py-5 text-lg">
                                                    {item.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed whitespace-pre-line">
                                                    {item.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </BlurFade>
                        ))}
                    </div>

                    <BlurFade delay={BLUR_FADE_DELAY * (faqData.length + 2)}>
                        <div className="mt-20 p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                            <p className="text-muted-foreground mb-8 text-lg">
                                We're here to help! Reach out to us through any of these channels.
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <a
                                    href="mailto:naic@rakantutor.org"
                                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                                >
                                    <Mail className="w-5 h-5" />
                                    Email Us
                                </a>
                                <a
                                    href="https://wa.me/60199179356"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-green-500 text-white font-medium hover:opacity-90 transition-opacity"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    WhatsApp Us
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
