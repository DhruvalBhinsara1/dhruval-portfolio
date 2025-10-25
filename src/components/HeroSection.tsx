import React from "react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-32 bg-white overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-64 h-64 bg-gradient-to-br from-gray-100 to-transparent rounded-full opacity-30 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full text-center relative z-10"
      >
        <p className="text-xs md:text-xl text-gray-600 mb-8 tracking-wide uppercase">
          Hello, I'm
        </p>

        <p className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-black mb-6">
          Dhruval Bhinsara
        </p>

        {/* Tagline with accent word and higher contrast accent color */}
        <h1 className="text-2xl md:text-3xl lg:text-3xl font-light italic text-gray-500">
          Transforming data into actionable insights <span className="text-blue-400 font-semibold">that matter</span>.
        </h1>

        {/* Minimal divider below tagline with higher contrast */}
        <div className="w-8 mx-auto my-4 border-t border-gray-500 opacity-80" />
      </motion.div>

      <button
        type="button"
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30 hover:opacity-100 transition-opacity"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </section>
  );
};

export default HeroSection;
