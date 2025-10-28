import React, { useEffect, useState } from 'react';

const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Back to Top"
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full shadow-2xl border border-gray-700/30 backdrop-blur-xl transition-all duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)', backgroundColor: '#1f2937' }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = '#fff';
        e.currentTarget.querySelector('svg')!.style.stroke = '#374151';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = '#1f2937';
        e.currentTarget.querySelector('svg')!.style.stroke = '#fff';
      }}
    >
      <svg className="w-6 h-6" fill="none" stroke="#fff" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

export default BackToTopButton;
