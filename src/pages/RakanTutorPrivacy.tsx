import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import DitheredBackground from "@/components/DitheredBackground";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function RakanTutorPrivacy() {
  const updated = "January 30, 2026";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tableOfContents = [
    { id: "introduction", title: "Introduction" },
    { id: "information-we-collect", title: "Information We Collect" },
    { id: "how-we-use", title: "How We Use Your Information" },
    { id: "sharing", title: "Information Sharing" },
    { id: "data-security", title: "Data Security" },
    { id: "your-rights", title: "Your Rights" },
    { id: "cookies", title: "Cookies and Tracking" },
    { id: "children", title: "Children's Privacy" },
    { id: "changes", title: "Changes to This Policy" },
    { id: "contact", title: "Contact Us" },
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
                Privacy Policy
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
                      At Rakan Tutor, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
                    </p>

                    <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
                      <p className="text-base text-foreground/80 leading-relaxed">
                        <strong>Note:</strong> Events organized by Rakan Tutor, such as the National AI Competition, may have specific privacy policies as specified on their respective event pages. Please refer to those pages for event-specific data handling practices.
                      </p>
                    </div>
                  </div>
                </BlurFade>

                {/* Section 1: Introduction */}
                <BlurFade delay={0.2}>
                  <section id="introduction" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">1. Introduction</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        Rakan Tutor ("we," "us," or "our") operates rakantutor.org and provides AI education programs for ASEAN youth. This Privacy Policy applies to all information collected through our website and services.
                      </p>
                      <p>
                        By using our services, you consent to the collection and use of information as described in this policy. If you do not agree with our practices, please do not use our services.
                      </p>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 2: Information We Collect */}
                <BlurFade delay={0.25}>
                  <section id="information-we-collect" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">2. Information We Collect</h2>
                    <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-foreground">2.1 Information You Provide</h3>
                        <p>We may collect information that you provide directly to us, including:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                          <li>Name and contact information (email address, phone number)</li>
                          <li>School or organization affiliation</li>
                          <li>Program registration and participation details</li>
                          <li>Communications you send to us</li>
                          <li>Feedback and survey responses</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-foreground">2.2 Automatically Collected Information</h3>
                        <p>When you visit our website, we may automatically collect:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                          <li>IP address and device information</li>
                          <li>Browser type and version</li>
                          <li>Pages visited and time spent on pages</li>
                          <li>Referring website addresses</li>
                          <li>Operating system and screen resolution</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 3: How We Use Your Information */}
                <BlurFade delay={0.3}>
                  <section id="how-we-use" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">3. How We Use Your Information</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>We use the information we collect to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Provide, maintain, and improve our educational services</li>
                        <li>Process program registrations and manage participation</li>
                        <li>Communicate with you about programs, workshops, and updates</li>
                        <li>Respond to your inquiries and support requests</li>
                        <li>Analyze usage patterns to enhance user experience</li>
                        <li>Send newsletters and educational content (with your consent)</li>
                        <li>Comply with legal obligations and protect our rights</li>
                        <li>Prevent fraud and ensure platform security</li>
                      </ul>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 4: Information Sharing */}
                <BlurFade delay={0.35}>
                  <section id="sharing" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">4. Information Sharing</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        We do not sell, rent, or trade your personal information. We may share your information only in the following circumstances:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Partner Organizations:</strong> With educational institutions and partner organizations involved in program delivery, subject to confidentiality agreements
                        </li>
                        <li>
                          <strong>Service Providers:</strong> With third-party service providers who assist us in operating our website and services (e.g., email services, analytics)
                        </li>
                        <li>
                          <strong>Legal Requirements:</strong> When required by law or to protect our rights, safety, or property
                        </li>
                        <li>
                          <strong>With Your Consent:</strong> When you explicitly agree to share your information
                        </li>
                      </ul>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 5: Data Security */}
                <BlurFade delay={0.4}>
                  <section id="data-security" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">5. Data Security</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                      </p>
                      <p>
                        These measures include:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Secure data transmission using encryption (HTTPS/SSL)</li>
                        <li>Regular security assessments and updates</li>
                        <li>Access controls and authentication procedures</li>
                        <li>Staff training on data protection practices</li>
                      </ul>
                      <p>
                        However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                      </p>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 6: Your Rights */}
                <BlurFade delay={0.45}>
                  <section id="your-rights" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">6. Your Rights</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>You have the right to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Access:</strong> Request a copy of the personal information we hold about you
                        </li>
                        <li>
                          <strong>Correction:</strong> Request correction of inaccurate or incomplete information
                        </li>
                        <li>
                          <strong>Deletion:</strong> Request deletion of your personal information, subject to legal requirements
                        </li>
                        <li>
                          <strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time
                        </li>
                        <li>
                          <strong>Data Portability:</strong> Request your data in a structured, machine-readable format
                        </li>
                        <li>
                          <strong>Withdraw Consent:</strong> Withdraw consent for data processing where consent was the legal basis
                        </li>
                      </ul>
                      <p>
                        To exercise these rights, please contact us using the information provided in the Contact section below.
                      </p>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 7: Cookies and Tracking */}
                <BlurFade delay={0.5}>
                  <section id="cookies" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">7. Cookies and Tracking Technologies</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small text files stored on your device.
                      </p>
                      <div className="bg-card rounded-lg p-6 border border-border space-y-3">
                        <p><strong>Essential Cookies:</strong> Required for basic website functionality</p>
                        <p><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</p>
                        <p><strong>Preference Cookies:</strong> Remember your settings and preferences</p>
                      </div>
                      <p>
                        You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.
                      </p>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 8: Children's Privacy */}
                <BlurFade delay={0.55}>
                  <section id="children" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">8. Children's Privacy</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        Our services are designed for secondary school students and youth. We recognize the importance of protecting the privacy of minors.
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>We require parental or guardian consent for participants under 18 years of age</li>
                        <li>We collect only the minimum necessary information for program participation</li>
                        <li>Parents/guardians can request access to or deletion of their child's information</li>
                        <li>We implement additional safeguards for data involving minors</li>
                      </ul>
                      <p>
                        If you believe we have collected information from a minor without proper consent, please contact us immediately.
                      </p>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 9: Changes to This Policy */}
                <BlurFade delay={0.6}>
                  <section id="changes" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">9. Changes to This Privacy Policy</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Changes will be effective immediately upon posting to our website.
                      </p>
                      <p>
                        We will notify you of significant changes by:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Updating the "Last Updated" date at the top of this policy</li>
                        <li>Posting a notice on our website</li>
                        <li>Sending an email notification (for material changes)</li>
                      </ul>
                      <p>
                        We encourage you to review this policy periodically to stay informed about how we protect your information.
                      </p>
                    </div>
                  </section>
                </BlurFade>

                {/* Section 10: Contact Us */}
                <BlurFade delay={0.65}>
                  <section id="contact" className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">10. Contact Us</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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
                        <p className="mt-4 text-base text-muted-foreground">
                          We will respond to your inquiry within a reasonable timeframe.
                        </p>
                      </div>
                    </div>
                  </section>
                </BlurFade>

                {/* Data Retention */}
                <BlurFade delay={0.7}>
                  <div className="pt-8 border-t border-border">
                    <h2 className="text-3xl font-bold mb-6">Data Retention</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
                      </p>
                      <p>
                        When your information is no longer needed, we will securely delete or anonymize it.
                      </p>
                    </div>
                  </div>
                </BlurFade>

                {/* International Data Transfers */}
                <BlurFade delay={0.75}>
                  <div className="pt-8 border-t border-border">
                    <h2 className="text-3xl font-bold mb-6">International Data Transfers</h2>
                    <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                      <p>
                        Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws.
                      </p>
                      <p>
                        We take appropriate safeguards to ensure your information receives adequate protection wherever it is processed.
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
