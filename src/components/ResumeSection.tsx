import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Minus, Plus, RotateCcw, Sparkles } from "lucide-react";
import AppleGradient from "./AppleGradient";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MIN_SCALE = 0.7;
const MAX_SCALE = 2.4;
const SCALE_STEP = 0.2;

const ResumeSection: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [baseWidth, setBaseWidth] = useState(0);
  const [scale, setScale] = useState(1);
  const [glowOn, setGlowOn] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // Fit the PDF page to the iPad screen width at scale 1 (clientWidth excludes
  // the vertical scrollbar, so the page never overflows horizontally unzoomed).
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const update = () => setBaseWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const clampScale = (value: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
  const renderWidth = baseWidth > 0 ? Math.round(baseWidth * scale) : 0;

  return (
    <section id="resume" className="py-16 md:py-24 px-6 md:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center tracking-tight">Resume</h2>
        <p className="text-lg md:text-2xl text-gray-500 mb-10 text-center">
          Education, projects, certifications, and the current skill direction in one place
        </p>

        {/* iPad mockup with Apple Intelligence glow */}
        <AppleGradient
          radiusClass="rounded-[2.2rem] md:rounded-[2.6rem]"
          className="w-full max-w-[720px]"
          intensity={22}
          on={glowOn}
          triggerOnView
          onActivate={() => setGlowOn(true)}
        >
          {/* Side buttons */}
          <div className="absolute right-[-3px] top-20 h-14 w-[3px] rounded-r-sm bg-gray-800" aria-hidden="true" />
          <div className="absolute left-[-3px] top-16 h-10 w-[3px] rounded-l-sm bg-gray-800" aria-hidden="true" />
          <div className="absolute left-[-3px] top-28 h-10 w-[3px] rounded-l-sm bg-gray-800" aria-hidden="true" />

          {/* Bezel */}
          <div className="rounded-[2.2rem] bg-gray-900 p-2.5 shadow-[0_30px_80px_rgba(15,23,42,0.30)] ring-1 ring-white/10 md:rounded-[2.6rem] md:p-3.5">
            {/* Screen */}
            <div className="relative overflow-hidden rounded-[1.5rem] bg-white md:rounded-[1.9rem]">
              {/* Glow toggle (inside the screen) */}
              <button
                type="button"
                onClick={() => setGlowOn((v) => !v)}
                aria-pressed={glowOn}
                title="Toggle Apple Intelligence glow"
                className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-md backdrop-blur transition hover:bg-white"
              >
                <Sparkles className={`h-3.5 w-3.5 ${glowOn ? "text-violet-500" : "text-gray-400"}`} />
                <span className="hidden sm:inline">{glowOn ? "Glow on" : "Glow off"}</span>
              </button>

              <div
                ref={screenRef}
                className="h-[78vh] min-h-[520px] overflow-auto overscroll-contain"
              >
                <div className="flex min-h-full w-fit min-w-full justify-center">
                  <Document
                    file="/assets/Dhruval_Bhinsara_Resume.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    externalLinkTarget="_blank"
                    externalLinkRel="noopener noreferrer"
                    loading={
                      <div
                        className="skeleton h-[78vh] min-h-[520px] w-full"
                        aria-busy="true"
                        aria-label="Loading resume PDF"
                      />
                    }
                    error={<div className="py-32 text-center text-red-600">Failed to load PDF</div>}
                  >
                    {renderWidth > 0 && (
                      <Page
                        pageNumber={pageNumber}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        width={renderWidth}
                      />
                    )}
                  </Document>
                </div>
              </div>

              {/* Zoom controls (interactive) */}
              <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full border border-black/10 bg-white/90 p-1 shadow-md backdrop-blur">
                <button
                  type="button"
                  onClick={() => setScale((s) => clampScale(s - SCALE_STEP))}
                  disabled={scale <= MIN_SCALE}
                  aria-label="Zoom out"
                  className="grid h-8 w-8 place-items-center rounded-full text-gray-700 transition hover:bg-black/5 disabled:opacity-30"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[3ch] text-center text-xs font-semibold tabular-nums text-gray-700">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setScale((s) => clampScale(s + SCALE_STEP))}
                  disabled={scale >= MAX_SCALE}
                  aria-label="Zoom in"
                  className="grid h-8 w-8 place-items-center rounded-full text-gray-700 transition hover:bg-black/5 disabled:opacity-30"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setScale(1)}
                  disabled={scale === 1}
                  aria-label="Reset zoom"
                  className="grid h-8 w-8 place-items-center rounded-full text-gray-700 transition hover:bg-black/5 disabled:opacity-30"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Home indicator */}
              <div
                className="pointer-events-none absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-black/25"
                aria-hidden="true"
              />
            </div>
          </div>
        </AppleGradient>

        {numPages && numPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
              disabled={pageNumber <= 1}
              className="px-4 py-2 text-sm font-medium transition-opacity hover:opacity-60 disabled:opacity-30"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
              disabled={pageNumber >= numPages}
              className="px-4 py-2 text-sm font-medium transition-opacity hover:opacity-60 disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}

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
