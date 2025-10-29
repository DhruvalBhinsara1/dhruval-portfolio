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
  const [showDrawer, setShowDrawer] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Show drawer when menuOpen becomes true
  useEffect(() => {
    if (menuOpen) {
      setShowDrawer(true);
    } else if (showDrawer) {
      // Wait for animation before unmounting
      const timeout = setTimeout(() => setShowDrawer(false), 500); // match duration-500
      return () => clearTimeout(timeout);
    }
  }, [menuOpen]);

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
    <nav className={`transition-all duration-500 ease-in-out ${styles.navbar}`}>
  <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-0 md:px-2">
  <div className="backdrop-blur-2xl bg-white/80 rounded-full px-0.5 py-2 flex flex-row items-center justify-center shadow-2xl border border-white/20 gap-0 md:gap-6" style={{ maxWidth: '1100px', minWidth: '320px', height: '56px' }}>
          {/* Logo */}
          <button
            onClick={() => handleScroll('home')}
            className="px-2 py-2 font-extrabold rounded-full bg-white/60 text-gray-800 text-sm md:text-lg transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600 md:bg-transparent md:rounded-none md:px-4"
            style={{ flex: '0 0 auto' }}
          >
            DB
          </button>
          {/* Nav Links (pill style) */}
          <ul className="flex flex-row gap-2 md:gap-6 items-center overflow-x-auto md:overflow-visible md:scrollbar-none">
            {/* Mobile: Only show Home, Projects, Skills, Resume */}
            <li className="flex-shrink-0 block md:hidden">
              <button type="button" onClick={() => handleScroll('home')} className="px-2 py-2 rounded-full bg-white/60 text-gray-800 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600">Home</button>
            </li>
            <li className="flex-shrink-0 block md:hidden">
              <button type="button" onClick={() => handleScroll('projects')} className="px-2 py-2 rounded-full bg-white/60 text-gray-800 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600">Projects</button>
            </li>
            <li className="flex-shrink-0 block md:hidden">
              <button type="button" onClick={() => handleScroll('skills')} className="px-2 py-2 rounded-full bg-white/60 text-gray-800 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600">Skills</button>
            </li>
            <li className="flex-shrink-0 block md:hidden">
              <button type="button" onClick={() => handleScroll('resume')} className="px-2 py-2 rounded-full bg-white/60 text-gray-800 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600">Resume</button>
            </li>
            {/* Desktop: Show all navLinks */}
            {navLinks.map((link) => (
              <li key={link.name} className="flex-shrink-0 hidden md:block">
                <button
                  type="button"
                  onClick={() => handleScroll(link.id)}
                  className="px-4 py-2 rounded-full bg-white/60 text-gray-800 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          {/* Icons (pill style) - Only new styled social icons remain */}
          <div className="flex gap-4 md:gap-2 items-center" style={{ flex: '0 0 auto' }}>
            <a
              href="https://github.com/DhruvalBhinsara1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`p-1 w-7 h-7 md:p-2 md:w-9 md:h-9 text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200 flex items-center justify-center rounded-full bg-white/60 ${styles.socialButton}`}
            >
              <Github className="w-3 h-3 md:w-4 md:h-4" strokeWidth={2} color="#374151" />
            </a>
            <a
              href="https://www.linkedin.com/in/dhruvalbhinsara"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`p-1 w-7 h-7 md:p-2 md:w-9 md:h-9 text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200 flex items-center justify-center rounded-full bg-white/60 ${styles.socialButton}`}
            >
              <Linkedin className="w-3 h-3 md:w-4 md:h-4" strokeWidth={2} color="#374151" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
