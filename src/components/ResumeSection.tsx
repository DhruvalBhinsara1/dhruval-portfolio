import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ResumeSection: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <section id="resume" className="py-16 md:py-24 px-6 md:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-medium mb-12 md:mb-16">RESUME</h2>

        <div className="max-w-4xl backdrop-blur-md bg-white/60 border border-white/20 overflow-hidden rounded-xl shadow-lg">
          <div
            style={{
              width: "100%",
              height: "70vh",
              minHeight: "500px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Document
              file="/assets/Dhruval_Bhinsara_Resume.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div className="py-32 text-center">Loading PDF...</div>}
              error={<div className="py-32 text-center text-red-600">Failed to load PDF</div>}
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                width={Math.min(window.innerWidth * 0.8, 700)}
              />
            </Document>
          </div>

          {numPages && numPages > 1 && (
            <div className="flex items-center justify-center gap-6 py-4 border-t border-black/10">
              <button
                onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                disabled={pageNumber <= 1}
                className="px-4 py-2 text-sm font-medium hover:opacity-60 transition-opacity disabled:opacity-30"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {pageNumber} of {numPages}
              </span>
              <button
                onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                disabled={pageNumber >= numPages}
                className="px-4 py-2 text-sm font-medium hover:opacity-60 transition-opacity disabled:opacity-30"
              >
                Next
              </button>
            </div>
          )}
        </div>

        <a
          href="/assets/Dhruval_Bhinsara_Resume.pdf"
          download
          className="inline-block mt-6 px-6 py-2.5 text-sm bg-black text-white font-medium hover:opacity-80 transition-opacity"
        >
          Download PDF
        </a>
      </div>
    </section>
  );
};

export default ResumeSection;
