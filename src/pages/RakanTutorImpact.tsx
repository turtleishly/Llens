import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import DitheredBackground from "@/components/DitheredBackground";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const RakanTutorImpact = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(900);

  const PDF_PATH = "/2021_2024-Rakan-Tutor-Program-Impact-Report.pdf";

  useEffect(() => {
    const updateWidth = () => {
      const width = Math.min(window.innerWidth - 80, 900);
      setPageWidth(width);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("PDF load error:", error);
    setError("Failed to load PDF document");
    setNumPages(null);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = PDF_PATH;
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
        <section className="relative min-h-[60vh] flex items-center justify-center py-20 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--hero-bg-from))_0%,hsl(var(--hero-bg-via))_45%,hsl(var(--hero-bg-to))_100%)]">
            <DitheredBackground className="z-0" />
          </div>

          <div className="container relative z-10 max-w-5xl mx-auto text-center py-12">
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
          <div className="container max-w-5xl mx-auto">
            <BlurFade delay={0.4}>
              <div className="flex flex-col items-center gap-4">
                {error && (
                  <div className="w-full max-w-2xl p-6 bg-destructive/10 border border-destructive rounded-lg text-center">
                    <p className="text-destructive font-medium">{error}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Please try downloading the PDF instead.
                    </p>
                  </div>
                )}

                <div className="w-full flex justify-center">
                  <Document
                    file={PDF_PATH}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={
                      <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-muted-foreground">Loading PDF...</p>
                      </div>
                    }
                    className="pdf-document"
                  >
                    {numPages && (
                      <div className="space-y-4">
                        {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNumber) => (
                          <div
                            key={`page-${pageNumber}`}
                            className="bg-white shadow-lg rounded-lg overflow-hidden"
                          >
                            <Page
                              pageNumber={pageNumber}
                              renderTextLayer={true}
                              renderAnnotationLayer={true}
                              className="pdf-page"
                              width={pageWidth}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </Document>
                </div>

                {numPages && (
                  <div className="mt-6 text-center text-sm text-muted-foreground">
                    Showing all {numPages} {numPages === 1 ? 'page' : 'pages'}
                  </div>
                )}
              </div>
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
