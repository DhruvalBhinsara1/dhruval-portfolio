import { useState, useRef, useEffect } from "react";
import styles from './Navbar.module.css';
import { Github, Linkedin } from 'lucide-react';

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Resume", id: "resume" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside (attach listener only when menu is open)
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Smooth scroll to section by id
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // close menu on mobile after click
    }
  };

  return (
  <>
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${styles.navbar}`}>
    <div className={`backdrop-blur-2xl bg-white/10 rounded-full px-6 flex items-center gap-4 h-14 shadow-2xl border border-white/20 ${styles.navbarInner}`}>
        {/* Logo */}
        <button
          onClick={() => handleScroll("home")}
          className="font-bold text-lg tracking-tight text-gray-800 hover:text-gray-600 transition-colors duration-200 flex-shrink-0"
        >
          DB
        </button>
        {/* Hamburger Icon (mobile) */}
        <button
          className="md:hidden ml-2 p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center justify-center bg-transparent border-none text-gray-800 hover:bg-gray-100/50 transition-colors duration-200"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            // Close (X) icon
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          ) : (
            // Hamburger icon
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
        {/* Nav Links (desktop) */}
        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                type="button"
                onClick={() => handleScroll(link.id)}
                className="relative text-gray-800 text-sm font-medium transition-colors duration-200 hover:text-gray-600 group whitespace-nowrap"
              >
                <span className="inline-block pb-1 border-b-2 border-transparent group-hover:border-gray-800 group-hover:scale-x-100 transition-all duration-300">
                  {link.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {/* Icons (desktop) */}
        <div className="hidden md:flex gap-2 items-center">
          {/* GitHub icon */}
          <a
            href="https://github.com/DhruvalBhinsara1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`p-2 w-9 h-9 text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200 flex items-center justify-center rounded-full ${styles.socialButton}`}
          >
            <Github className="w-4 h-4" strokeWidth={2} color="#374151" />
          </a>
          {/* LinkedIn icon */}
          <a
            href="https://www.linkedin.com/in/dhruvalbhinsara"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`p-2 w-9 h-9 text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200 flex items-center justify-center rounded-full ${styles.socialButton}`}
          >
            <Linkedin className="w-4 h-4" strokeWidth={2} color="#374151" />
          </a>
        </div>
        
        {/* Mobile Menu Overlay and Drawer */}
        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 top-0 left-0 bg-black/40 z-40 md:hidden"
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
          />
        )}
        {/* Drawer */}
        <div
          ref={menuRef}
          className={`fixed top-16 right-0 w-72 max-w-full h-auto bg-white shadow-xl border border-black/10 flex flex-col items-end md:hidden z-50 pr-6 transition-all duration-300 ease-out
            ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        >
          <div className="mt-4 w-full">
          <ul className="flex flex-col gap-4 w-full items-end">
            {navLinks.map((link) => (
              <li key={link.name} className="w-full flex justify-end">
                <button
                  type="button"
                  onClick={() => handleScroll(link.id)}
                  className="text-white text-lg font-semibold px-6 py-3 bg-black w-[200px] max-w-[90vw] text-right hover:bg-gray-800 transition-colors duration-200"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-4 mt-6 mb-4 justify-end items-center pr-4">
              <a
                href="https://github.com/DhruvalBhinsara1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`p-2 w-11 h-11 text-black hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center justify-center ${styles.socialButton}`}
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="block">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.566 4.936.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.135 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/dhruvalbhinsara"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`p-2 w-11 h-11 text-black hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center justify-center ${styles.socialButton}`}
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="block">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 0 1 6 6v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a2 2 0 0 0-4 0v4a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-5a6 6 0 0 1 6-6z" />
                  <rect width="4" height="4" x="2" y="9" rx="1" />
                </svg>
              </a>
            </div>
          </div>
        </div>
    </div>
  </nav>
  </>
  );
}
