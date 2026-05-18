import { useEffect, useRef, useState } from "react";
import { FileText, Github, Linkedin, Mail } from "lucide-react";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Resume", id: "resume" },
  { name: "Contact", id: "contact" },
];

const visibleMobileLinks = new Set(["Home", "Projects", "Resume", "Contact"]);

function scrollToSection(id: string) {
  let attempts = 0;

  const scroll = () => {
    const section = document.getElementById(id);

    if (section) {
      const top = Math.max(section.getBoundingClientRect().top + window.scrollY - 88, 0);
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }

    if (attempts < 20) {
      attempts += 1;
      window.setTimeout(scroll, 50);
    }
  };

  scroll();
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const navScrollerRef = useRef<HTMLDivElement>(null);
  const navButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveSection = () => {
      const anchor = window.scrollY + window.innerHeight * 0.35;
      let currentSection = navLinks[0].id;

      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (!section) {
          return;
        }

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (anchor >= top && anchor < bottom) {
          currentSection = link.id;
        }
      });

      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const activeButton = navButtonRefs.current[activeSection];

    if (!activeButton || !navScrollerRef.current) {
      return;
    }

    activeButton.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeSection]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-4 md:px-6">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-14 max-w-5xl items-center gap-2 rounded-full border border-black/10 bg-white/85 px-2 shadow-[0_18px_55px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
      >
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="flex h-10 items-center gap-2 rounded-full px-3 text-left transition hover:bg-black/5"
          aria-label="Go to home"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gray-950 text-sm font-bold text-white">
            DB
          </span>
          <span className="hidden text-sm font-semibold leading-tight text-gray-950 sm:block">
            Dhruval
          </span>
        </button>

        <div
          ref={navScrollerRef}
          className="flex min-w-0 flex-1 items-center justify-start overflow-x-auto px-1 [scrollbar-width:none] md:justify-center [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const mobileVisibility = visibleMobileLinks.has(link.name) ? "inline-flex" : "hidden md:inline-flex";

              return (
                <li key={link.id} className={mobileVisibility}>
                  <button
                    ref={(node) => {
                      navButtonRefs.current[link.id] = node;
                    }}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className={`rounded-full px-2 py-2 text-xs font-medium transition sm:text-sm md:px-4 ${
                      isActive
                        ? "bg-gray-950 text-white shadow-sm"
                        : "text-gray-700 hover:bg-black/5 hover:text-gray-950"
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center gap-1">
          <a
            href="/assets/Dhruval_Bhinsara_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume PDF"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-black/5 hover:text-gray-950 sm:flex"
          >
            <FileText className="h-4 w-4" />
          </a>
          <a
            href="mailto:dhruvalbhinsara460@gmail.com"
            aria-label="Email Dhruval"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-black/5 hover:text-gray-950 md:flex"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/DhruvalBhinsara1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-black/5 hover:text-gray-950 sm:flex"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/dhruvalbhinsara"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-black/5 hover:text-gray-950 sm:flex"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}
