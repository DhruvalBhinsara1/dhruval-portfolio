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
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center tracking-tight">Resume</h2>
        <p className="text-lg md:text-2xl text-gray-500 mb-10 text-center">Education, projects, certifications, and the current skill direction in one place</p>

        <div className="flex w-full max-w-4xl flex-col items-center overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/70 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl">
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
            <div className="flex items-center justify-center gap-6 py-4 border-t border-black/10 w-full">
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
          className="mt-6 inline-block rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-opacity hover:opacity-80"
        >
          Download PDF
        </a>
      </div>
    </section>
  );
};

export default ResumeSection;
