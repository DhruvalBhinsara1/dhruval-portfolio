

import styles from './ResumeSection.module.css';

const ResumeSection: React.FC = () => {
  return (
    <section id="resume" className="w-full flex flex-col items-center py-20 bg-white text-black">
      <h2 className="text-4xl font-bold mb-8 text-center">My Resume</h2>
      <div className="w-full max-w-3xl rounded-lg shadow-lg overflow-hidden border border-slate-200 bg-white">
        <div
          className={styles['hide-scrollbar']}
          style={{
            width: '100%',
            height: '80vh',
            minHeight: '500px',
          }}
        >
          <iframe
            src="/assets/Dhruval_Bhinsara_Resume.pdf"
            title="Resume Preview"
            className="w-full h-full bg-white"
            style={{ border: 'none' }}
          />
        </div>
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
