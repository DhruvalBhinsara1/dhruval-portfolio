import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-12 md:py-16 px-6 md:px-12 border-t border-black/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 md:gap-6 mb-6 text-xs md:text-sm">
          <a
            href="mailto:dhruvalbhinsara460@gmail.com"
            className="hover:opacity-60 transition-opacity text-blue-600"
          >
            Connect
          </a>
          <a
            href="mailto:dhruvalbhinsara460@gmail.com"
            className="hover:opacity-60 transition-opacity"
          >
            dhruvalbhinsara460@gmail.com
          </a>
          <a
            href="https://github.com/DhruvalBhinsara1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity text-blue-600"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/dhruvalbhinsara"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity text-blue-600"
          >
            LinkedIn
          </a>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs text-black/40">
            &copy; 2025 Dhruval Bhinsara. All rights reserved.
          </p>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
