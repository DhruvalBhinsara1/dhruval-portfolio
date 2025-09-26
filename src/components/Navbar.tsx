

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  // Smooth scroll to section by id
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/10 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
            <button
              onClick={() => handleScroll("home")}
              className="font-bold text-xl tracking-tight text-black hover:text-gray-700 transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer px-0 py-0 shadow-none focus:ring-0"
              style={{ background: 'none', boxShadow: 'none' }}
            >
              Dhruval Bhhinsara
            </button>
        {/* Nav Links */}
        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
                  <button
                    type="button"
                    onClick={() => handleScroll(link.id)}
                    className="relative px-0 py-0 text-black font-medium transition-colors duration-200 hover:text-gray-700 group bg-transparent border-none outline-none cursor-pointer shadow-none focus:ring-0"
                    style={{ background: 'none', boxShadow: 'none' }}
                  >
                    <span className="inline-block pb-1 border-b-2 border-transparent group-hover:border-black group-hover:scale-x-100 transition-all duration-300">
                      {link.name}
                    </span>
                  </button>
            </li>
          ))}
        </ul>
        {/* Icons */}
        <div className="flex gap-4 items-center">
          {/* GitHub icon */}
          <a
            href="https://github.com/DhruvalBhinsara1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-black hover:text-gray-700 transition-colors duration-200"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block align-middle">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.566 4.936.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.135 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
          {/* LinkedIn icon */}
          <a
            href="https://www.linkedin.com/in/dhruvalbhinsara"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-black hover:text-gray-700 transition-colors duration-200"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block align-middle">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4a2 2 0 00-4 0v4a1 1 0 01-1 1H7a1 1 0 01-1-1v-5a6 6 0 016-6z" />
              <rect width="4" height="4" x="2" y="9" rx="1" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
