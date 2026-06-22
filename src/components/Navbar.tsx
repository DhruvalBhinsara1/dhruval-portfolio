import { useEffect, useRef, useState } from "react";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import MemojiScreen from "./MemojiScreen";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Music", id: "playlists" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Resume", id: "resume" },
  { name: "Contact", id: "contact" },
];

function scrollToSection(id: string) {
  let attempts = 0;

  const scroll = () => {
    const section = document.getElementById(id);

    if (section) {
      const top = Math.max(section.getBoundingClientRect().top + window.scrollY - 56, 0);
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

function AppleLogo() {
  return (
    <svg viewBox="0 0 814 1000" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
      <path d="M747 803c-14 32-30 61-49 88-25 37-46 62-62 76-25 23-52 35-81 36-21 0-46-6-75-18s-56-18-80-18c-25 0-52 6-82 18s-54 19-72 19c-28 1-55-12-82-36-17-15-39-41-65-78-28-40-51-86-69-139-19-57-29-112-29-165 0-61 13-113 39-156 21-35 48-62 82-82s71-31 111-31c21 0 49 7 84 20s58 20 68 20c8 0 33-8 76-23 40-14 74-20 102-17 75 6 132 36 169 90-67 41-100 98-99 171 1 57 22 104 62 142 18 17 38 31 60 40-5 14-10 27-15 39zM565 19c0 15-3 30-8 45-7 19-19 36-35 52-13 14-30 25-49 33-6 2-15 4-27 6-1-3-1-7-1-12 0-15 3-30 9-44 6-15 16-29 29-42 8-8 19-15 32-21s25-9 36-10c0 8 1 14 1 14z" />
    </svg>
  );
}

function MenuClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  const date = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const time = now
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    .replace(/\s/g, " ");

  return (
    <span className="hidden items-center gap-2 tabular-nums lg:inline-flex">
      <span>{date}</span>
      <span>{time}</span>
    </span>
  );
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [memojiOpen, setMemojiOpen] = useState(false);
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
    <>
    <MemojiScreen open={memojiOpen} onClose={() => setMemojiOpen(false)} />
    <header className="fixed inset-x-0 top-0 z-50 h-8 bg-black/55 text-white backdrop-blur-2xl">
      <div className="flex h-full items-center justify-between gap-3 px-2 text-[13px] sm:px-3">
        {/* Left: Apple logo + brand + section menus */}
        <div className="flex min-w-0 flex-1 items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMemojiOpen(true)}
            aria-label="Open memoji"
            className="grid h-6 w-7 place-items-center rounded transition-colors hover:bg-white/15"
          >
            <AppleLogo />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="rounded px-2 py-0.5 font-semibold transition-colors hover:bg-white/15"
          >
            Dhruval
          </button>

          <div
            ref={navScrollerRef}
            className="flex min-w-0 items-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex items-center gap-1.5">
              {navLinks.slice(1).map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <button
                      ref={(node) => {
                        navButtonRefs.current[link.id] = node;
                      }}
                      type="button"
                      onClick={() => scrollToSection(link.id)}
                      className={`whitespace-nowrap rounded px-2 py-0.5 transition-colors ${
                        isActive ? "bg-white/20 font-medium" : "text-white/85 hover:bg-white/15 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right: status icons + clock (the menu bar extras) */}
        <div className="flex flex-none items-center gap-1 text-white/90">
          <a
            href="/assets/Dhruval_Bhinsara_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume PDF"
            className="hidden h-6 w-6 items-center justify-center rounded transition-colors hover:bg-white/15 sm:flex"
          >
            <FileText className="h-3.5 w-3.5" />
          </a>
          <a
            href="mailto:dhruvalbhinsara460@gmail.com"
            aria-label="Email Dhruval"
            className="hidden h-6 w-6 items-center justify-center rounded transition-colors hover:bg-white/15 sm:flex"
          >
            <Mail className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://github.com/DhruvalBhinsara1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-white/15"
          >
            <Github className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/dhruvalbhinsara"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-white/15"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
          <div className="mx-1 hidden h-3.5 w-px bg-white/20 lg:block" />
          <MenuClock />
        </div>
      </div>
    </header>
    </>
  );
}
