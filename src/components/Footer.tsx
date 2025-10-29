import React from "react";

const Footer: React.FC = () => {
  return (
  <footer className="py-12 md:py-16 px-6 md:px-12 border-t border-black/10 backdrop-blur-lg bg-black/85 rounded-t-4xl shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.25)]">
      <div className="max-w-7xl mx-auto">
  <div className="flex flex-wrap gap-4 md:gap-6 mb-6 text-xs md:text-sm font-semibold">

          <a
            href="https://github.com/DhruvalBhinsara1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-white transition-colors drop-shadow-sm"
            style={{textShadow: '0 1px 8px rgba(0,0,0,0.25)'}}>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/dhruvalbhinsara"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-white transition-colors drop-shadow-sm"
            style={{textShadow: '0 1px 8px rgba(0,0,0,0.25)'}}>
            LinkedIn
          </a>

          <a
            href="mailto:dhruvalbhinsara460@gmail.com"
            className="text-blue-400 hover:text-white transition-colors drop-shadow-sm"
            style={{textShadow: '0 1px 8px rgba(0,0,0,0.25)'}}>
            dhruvalbhinsara460@gmail.com
          </a>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs text-white font-bold drop-shadow-sm" style={{textShadow: '0 1px 8px rgba(0,0,0,0.25)'}}>
            &copy; 2025 Dhruval Bhinsara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
