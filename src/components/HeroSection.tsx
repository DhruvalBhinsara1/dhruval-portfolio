import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";

const subtitles = [
  'Data Analyst',
  'Excel & Power BI Specialist',
  'Python & SQL Enthusiast',
  'Tableau Storyteller',
  'Turning Data into Insights',
];

const HeroSection: React.FC = () => {
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < subtitles[subtitleIdx].length) {
        timeout = setTimeout(() => {
          setDisplayed(subtitles[subtitleIdx].slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 6000);
      }
    } else {
      timeout = setTimeout(() => {
        setDisplayed('');
        setTyping(true);
        setSubtitleIdx((subtitleIdx + 1) % subtitles.length);
      }, 600);
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, subtitleIdx]);

  return (
  <section id="home" className="relative min-h-[100svh] min-h-screen md:min-h-dvh flex flex-col justify-center items-center px-4 pt-16 md:pt-28 pb-12 overflow-hidden snap-start">
      {/* Subtle grid background inspired by Aceternity UI */}
      <div
        className={
          cn(
            "absolute inset-0 z-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,theme(colors.slate.300/.5)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate.300/.5)_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,theme(colors.slate.700/.5)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate.700/.5)_1px,transparent_1px)]",
            "opacity-30"
          )
        }
        aria-hidden="true"
      />
      {/* Radial gradient for theme-matched fade */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-gradient-radial from-white/80 via-white/40 to-slate-300/0 dark:from-black/80 dark:via-slate-900/40 dark:to-slate-950/0" aria-hidden="true"></div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center flex flex-col items-center z-10"
      >
        {/* Animated avatar/profile image */}
        <motion.img
          src="/dhruval-profile.jpg"
          alt="Dhruval Bhinsara profile"
          className="w-66 h-66 md:w-70 md:h-70 rounded-full border-4 border-blue-200 shadow-2xl mb-8 md:mb-10 mt-2 md:mt-0 object-cover bg-white ring-4 ring-blue-100/60"
          style={{ boxShadow: '0 8px 32px 0 rgba(30,41,59,0.18), 0 1.5px 8px 0 rgba(30,41,59,0.10)' }}
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          draggable={false}
        />
        <h1 className="text-5xl md:text-7xl font-extrabold mb-3 md:mb-4 text-black tracking-tight leading-tight">
          Dhruval Bhinsara
        </h1>
        <div className="h-10 mb-4 md:mb-5 px-6 py-2 rounded-xl bg-neutral-900/90 shadow-lg flex items-center justify-center">
          <span className="text-xl md:text-3xl font-semibold tracking-wide text-black">
            <span className="bg-gradient-to-r from-blue-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
              {displayed}
            </span>
            <span className="inline-block w-2 h-6 md:h-8 bg-blue-500 align-middle animate-pulse ml-1" style={{ verticalAlign: 'middle' }} />
          </span>
        </div>
        <div className="mb-10 md:mb-12 max-w-2xl px-6 py-4">
          <p className="text-lg md:text-2xl text-black text-center font-semibold md:font-bold">
            Data Analyst passionate about transforming data into clear, actionable insights. Specializing in Excel, Power BI, Python, SQL, and Tableau for business impact.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 px-6 py-2 sm:px-8 sm:py-3 bg-white/90 dark:bg-slate-900/80 border border-blue-500 text-blue-700 dark:text-blue-400 rounded-full text-base sm:text-lg font-medium shadow-sm transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowRight size={20} className="-ml-1" />
          Get Started
        </motion.button>
      </motion.div>
      {/* Scroll indicator */}
      <button
        type="button"
        aria-label="Scroll to About section"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute left-1/2 bottom-6 -translate-x-1/2 flex flex-col items-center z-20 select-none outline-none focus:outline-none active:outline-none bg-transparent border-none"
        tabIndex={0}
        style={{ background: 'none', boxShadow: 'none' }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md opacity-70">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
    </button>
  </section>
  );
}

export default HeroSection;
