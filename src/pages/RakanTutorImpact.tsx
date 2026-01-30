import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up the worker for PDF.js - use CDN with correct version
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const RakanTutorImpact = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [pdfWidth, setPdfWidth] = useState<number>(800);

  useEffect(() => {
    const updateWidth = () => {
      const containerWidth = Math.min(window.innerWidth - 64, 1200); // 64px for padding
      const maxWidth = 800;
      setPdfWidth(Math.min(containerWidth, maxWidth));
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/2021_2024-Rakan-Tutor-Program-Impact-Report.pdf";
    link.download = "Rakan-Tutor-Impact-Report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Header Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center py-20 px-4 md:px-8 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container max-w-5xl mx-auto text-center py-12">
            <BlurFade delay={0.1}>
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
                Program Impact Report
              </h1>
            </BlurFade>
            <BlurFade delay={0.2}>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-8">
                2021-2024 Rakan Tutor Program Impact
              </p>
            </BlurFade>
            <BlurFade delay={0.3}>
              <Button
                onClick={handleDownload}
                size="lg"
                className="text-base lg:text-lg px-6 lg:px-8 py-5 lg:py-6 h-auto rounded-xl"
              >
                <Download className="mr-2 h-5 w-5" />
                Download PDF
              </Button>
            </BlurFade>
          </div>
        </section>

        {/* PDF Viewer Section */}
        <section className="py-20 px-4 md:px-8 bg-background">
          <div className="container max-w-7xl mx-auto">
            <BlurFade delay={0.4}>
              <div className="flex justify-center">
                <div className="bg-white rounded-lg shadow-lg inline-block">
                  <Document
                    file="/2021_2024-Rakan-Tutor-Program-Impact-Report.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                      <div className="flex items-center justify-center h-96" style={{ width: `${pdfWidth}px` }}>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                      </div>
                    }
                    error={
                      <div className="flex items-center justify-center h-96" style={{ width: `${pdfWidth}px` }}>
                        <p className="text-destructive">Failed to load PDF. Please try again.</p>
                      </div>
                    }
                  >
                    {!loading && Array.from(new Array(numPages), (_, index) => (
                      <div key={`page_${index + 1}`} className="mb-4 last:mb-0">
                        <Page
                          pageNumber={index + 1}
                          renderTextLayer={true}
                          renderAnnotationLayer={true}
                          width={pdfWidth}
                        />
                      </div>
                    ))}
                  </Document>
                </div>
              </div>

              {/* Page Count Info */}
              {!loading && (
                <div className="mt-8 text-center text-sm text-muted-foreground">
                  Showing all {numPages} pages
                </div>
              )}
            </BlurFade>
          </div>
        </section>

        {/* Impact Highlights */}
        <section className="py-20 px-4 md:px-8 bg-muted/30">
          <div className="container max-w-7xl mx-auto">
            <div className="space-y-8">
              <BlurFade delay={0.5}>
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">Key Achievements</h2>
                  <p className="text-lg text-muted-foreground">
                    Making a difference in education across Malaysia
                  </p>
                </div>
              </BlurFade>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <BlurFade delay={0.6}>
                  <div className="bg-card rounded-xl p-6 border border-border text-center">
                    <div className="text-4xl font-bold text-primary mb-2">250+</div>
                    <div className="text-lg font-semibold mb-2">Students Tutored</div>
                    <p className="text-sm text-muted-foreground">
                      2021/2022 cohort
                    </p>
                  </div>
                </BlurFade>

                <BlurFade delay={0.7}>
                  <div className="bg-card rounded-xl p-6 border border-border text-center">
                    <div className="text-4xl font-bold text-primary mb-2">3,261</div>
                    <div className="text-lg font-semibold mb-2">Tutoring Hours</div>
                    <p className="text-sm text-muted-foreground">
                      Dedicated to student success
                    </p>
                  </div>
                </BlurFade>

                <BlurFade delay={0.8}>
                  <div className="bg-card rounded-xl p-6 border border-border text-center">
                    <div className="text-4xl font-bold text-primary mb-2">20%</div>
                    <div className="text-lg font-semibold mb-2">Average Improvement</div>
                    <p className="text-sm text-muted-foreground">
                      In Mathematics scores
                    </p>
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
};

export default RakanTutorImpact;
