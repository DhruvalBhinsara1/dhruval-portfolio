import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import styles from './ResumeSection.module.css';

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ResumeSection: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <section id="resume" className="w-full flex flex-col items-center py-20 bg-white text-black">
      <h2 className="text-4xl font-bold mb-8 text-center">My Resume</h2>
      
      <div className="w-full max-w-3xl rounded-lg shadow-lg overflow-hidden border-2 border-slate-900 bg-white">
        <div
          className={styles['hide-scrollbar']}
          style={{
            width: '100%',
            height: '80vh',
            minHeight: '500px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <Document
            file="/assets/Dhruval_Bhinsara_Resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-64">
                <div className="text-slate-900 font-semibold">Loading PDF...</div>
              </div>
            }
            error={
              <div className="flex items-center justify-center h-64">
                <div className="text-red-600 font-semibold">Failed to load PDF</div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-md"
              width={Math.min(window.innerWidth * 0.8, 700)}
            />
          </Document>
        </div>
        
        {/* Page Navigation */}
        {numPages && numPages > 1 && (
          <div className="flex items-center justify-center gap-4 py-4 bg-slate-50 border-t-2 border-slate-900">
            <button
              onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
              disabled={pageNumber <= 1}
              className="px-4 py-2 bg-slate-900 text-white font-semibold rounded disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm font-semibold text-slate-900">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
              disabled={pageNumber >= numPages}
              className="px-4 py-2 bg-slate-900 text-white font-semibold rounded disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
      
      <a
        href="/assets/Dhruval_Bhinsara_Resume.pdf"
        download
        className="mt-6 inline-block px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Download PDF
      </a>
    </section>
  );
};

export default ResumeSection;
