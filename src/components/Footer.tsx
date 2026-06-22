import React from "react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const footerLinks = [
  { label: "About", target: "about" },
  { label: "Experience", target: "experience" },
  { label: "Projects", target: "projects" },
  { label: "Skills", target: "skills" },
  { label: "Resume", target: "resume" },
  { label: "Contact", target: "contact" },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (target: string) => {
    let attempts = 0;

    const scroll = () => {
      const section = document.getElementById(target);

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
  };

  return (
    <footer className="px-6 pb-8 pt-16 md:px-12 md:pb-10 md:pt-24">
      <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-black/10 bg-white/75 p-6 shadow-[0_-10px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-8">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="mb-5 inline-flex h-10 items-center gap-2 rounded-full bg-gray-950 px-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-xs font-bold text-gray-950">
                DB
              </span>
              Dhruval Bhinsara
            </button>
            <p className="max-w-xl text-lg leading-8 text-gray-700">
              Computer Science undergrad and freelance iOS developer building across iOS, machine learning, and AI engineering.
            </p>
          </div>

          <div className="flex flex-col gap-5 md:items-end">
            <div className="flex flex-wrap gap-2 md:justify-end">
              {footerLinks.map((link) => (
                <button
                  key={link.target}
                  type="button"
                  onClick={() => scrollToSection(link.target)}
                  className="rounded-full border border-black/10 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-950 hover:text-gray-950"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end">
              <a
                href="mailto:dhruvalbhinsara460@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href="https://github.com/DhruvalBhinsara1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 transition hover:border-gray-950 hover:text-gray-950"
              >
                <Github className="h-4 w-4" />
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/dhruvalbhinsara"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-800 transition hover:border-gray-950 hover:text-gray-950"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-black/10 pt-5 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>&copy; {currentYear} Dhruval Bhinsara.</p>
          <p>Surat, Gujarat, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
