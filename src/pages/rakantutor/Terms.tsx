import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import DitheredBackground from "@/components/DitheredBackground";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function RakanTutorTerms() {
  const updated = "January 30, 2026";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tableOfContents = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "services", title: "Our Services" },
    { id: "user-conduct", title: "User Conduct" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "disclaimer", title: "Disclaimer of Warranties" },
    { id: "limitation", title: "Limitation of Liability" },
    { id: "changes", title: "Changes to Terms" },
    { id: "contact", title: "Contact Information" },
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />

      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-20 px-4 md:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--hero-bg-from))_0%,hsl(var(--hero-bg-via))_45%,hsl(var(--hero-bg-to))_100%)]">
            <DitheredBackground className="z-0" />
          </div>

          <div className="container relative z-10 max-w-4xl mx-auto text-center">
            <BlurFade delay={0}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-display text-center">
                Terms & Conditions
              </h1>
            </BlurFade>

            <BlurFade delay={0.05}>
              <p className="text-muted-foreground mb-8 font-medium uppercase tracking-[0.2em] text-xs text-center">
                Last Updated: {updated}
              </p>
            </BlurFade>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 px-4 md:px-8 bg-background">
          <div className="container max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[280px_1fr] gap-12">
              {/* Sticky Table of Contents */}
              <aside className="lg:sticky lg:top-24 h-fit">
                <BlurFade delay={0.1}>
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                      Contents
                    </h2>
                    <nav className="space-y-2">
                      {tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block text-sm text-foreground/70 hover:text-foreground transition-colors py-1"
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </BlurFade>
              </aside>

              {/* Main Content */}
              <div className="space-y-12">
                <BlurFade delay={0.15}>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Welcome to Rakan Tutor. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully.
                    </p>

                    <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
                      <p className="text-base text-foreground/80 leading-relaxed">
                        <strong>Note:</strong> Events organized by Rakan Tutor, such as the National AI Competition, may have specific terms and conditions as specified on their respective event pages. Please refer to those pages for event-specific policies.
                      </p>
                    </div>
                  </div>
                </BlurFade>

                {/* Section 1: Acceptance of Terms */}
                <BlurFade delay={0.2}>
                  <section id="acceptance" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">1. Acceptance of Terms</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        By accessing and using rakantutor.org (the "Website"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                      </p>
                      <p>
                        These terms apply to all visitors, users, and others who access or use the Website.
                      </p>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 2: Our Services */}
                <BlurFade delay={0.25}>
                  <section id="services" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">2. Our Services</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        Rakan Tutor provides AI education programs, workshops, and a digital learning platform for ASEAN youth. Our services include:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Hands-on AI workshops and educational programs</li>
                        <li>Digital learning platform access</li>
                        <li>Community partnerships and train-the-trainer programs</li>
                        <li>Educational competitions and events</li>
                      </ul>
                      <p>
                        We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.
                      </p>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 3: User Conduct */}
                <BlurFade delay={0.3}>
                  <section id="user-conduct" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">3. User Conduct</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>When using our services, you agree to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Provide accurate and truthful information</li>
                        <li>Respect the rights and dignity of other users</li>
                        <li>Not engage in any unlawful or prohibited activities</li>
                        <li>Not attempt to gain unauthorized access to our systems</li>
                        <li>Not upload or distribute harmful content, including viruses or malware</li>
                        <li>Not misrepresent your affiliation with Rakan Tutor</li>
                      </ul>
                      <p>
                        We reserve the right to terminate or suspend access to our services for any user who violates these terms.
                      </p>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 4: Intellectual Property */}
                <BlurFade delay={0.35}>
                  <section id="intellectual-property" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">4. Intellectual Property</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        All content on this Website, including but not limited to text, graphics, logos, images, videos, and software, is the property of Rakan Tutor or its content suppliers and is protected by copyright and other intellectual property laws.
                      </p>
                      <p>
                        You may not reproduce, distribute, modify, or create derivative works from our content without explicit written permission from Rakan Tutor.
                      </p>
                      <p>
                        Educational materials provided through our programs may be used for personal educational purposes only.
                      </p>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 5: Disclaimer of Warranties */}
                <BlurFade delay={0.4}>
                  <section id="disclaimer" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">5. Disclaimer of Warranties</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee that:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>The Website will be available at all times or uninterrupted</li>
                        <li>The information provided is complete, accurate, or up-to-date</li>
                        <li>Any defects or errors will be corrected</li>
                        <li>The Website is free of viruses or other harmful components</li>
                      </ul>
                      <p>
                        Your use of our services is at your own risk.
                      </p>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 6: Limitation of Liability */}
                <BlurFade delay={0.45}>
                  <section id="limitation" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">6. Limitation of Liability</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        To the maximum extent permitted by law, Rakan Tutor, its directors, employees, volunteers, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services.
                      </p>
                      <p>
                        This includes, but is not limited to, damages for loss of profits, data, or other intangible losses, even if we have been advised of the possibility of such damages.
                      </p>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 7: Changes to Terms */}
                <BlurFade delay={0.5}>
                  <section id="changes" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">7. Changes to Terms</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the Website.
                      </p>
                      <p>
                        Your continued use of our services after any changes constitutes your acceptance of the new terms. We encourage you to review this page periodically for updates.
                      </p>
                      <p>
                        The "Last Updated" date at the top of this page indicates when these terms were last revised.
                      </p>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 8: Contact Information */}
                <BlurFade delay={0.55}>
                  <section id="contact" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">8. Contact Information</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        If you have any questions about these Terms and Conditions, please contact us:
                      </p>
                      <div className="bg-card rounded-lg p-6 border border-border">
                        <p className="font-semibold mb-2">Rakan Tutor</p>
                        <p>
                          Website:{" "}
                          <Link to="/contact" className="text-primary hover:underline">
                            Contact Form
                          </Link>
                        </p>
                        <p>Email: Available through our contact page</p>
                      </div>
                    </div>
                  </section>
                </BlurFade>

                {/* Governing Law */}
                <BlurFade delay={0.6}>
                  <div className="pt-8 border-t border-border">
                    <h2 className="text-3xl font-bold mb-6">Governing Law</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        These Terms and Conditions shall be governed by and construed in accordance with the laws of Malaysia, without regard to its conflict of law provisions.
                      </p>
                      <p>
                        Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Malaysia.
                      </p>
                    </div>
                  </div>
                </BlurFade>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
