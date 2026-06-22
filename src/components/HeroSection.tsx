import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioGuide from "./AISearch";
import { memojiImages, nextMemoji } from "../data/memoji";

function MemojiAvatar() {
  const [index, setIndex] = React.useState(0);
  const timerRef = React.useRef<number | null>(null);

  const shuffle = React.useCallback(() => setIndex((i) => nextMemoji(i)), []);

  // Auto-cycle every 6-13s; resets whenever the memoji changes.
  React.useEffect(() => {
    timerRef.current = window.setTimeout(shuffle, 6000 + Math.floor(Math.random() * 7000));
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, shuffle]);

  return (
    <motion.button
      type="button"
      onClick={shuffle}
      onMouseEnter={shuffle}
      aria-label="Shuffle memoji"
      className="group relative h-40 w-40 cursor-pointer md:h-52 md:w-52 lg:h-60 lg:w-60"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      whileTap={{ scale: 0.94 }}
    >
      <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-110">
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={memojiImages[index]}
            alt="Dhruval Bhinsara"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ type: "spring", stiffness: 520, damping: 20, mass: 0.6 }}
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_12px_30px_rgba(15,23,42,0.18)]"
          />
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-transparent px-0 pb-16 pt-28 md:pt-32"
    >
      {/* Main Content */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="hidden px-6 text-center text-lg md:text-3xl text-gray-600 mb-4 font-medium md:flex flex-wrap items-center justify-center gap-2"
      >
        Hey, I'm Dhruval Bhinsara
        <img src="/hand_emoji.png" alt="Waving Hand" className="inline-block w-7 h-7 align-middle" style={{marginLeft: '0.25em'}} />
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-6 max-w-6xl px-6 text-center text-4xl font-bold leading-tight text-black md:text-6xl lg:text-7xl"
      >
        iOS, ML & AI Developer
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.25 }}
        className="mb-8 max-w-3xl px-6 text-center text-base text-gray-600 md:text-xl"
      >
        Computer Science undergrad building AI-powered, data-driven apps with Swift, Python, and PyTorch.
      </motion.p>
      {/* Avatar - Memoji */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mb-8 flex justify-center"
      >
        <MemojiAvatar />
      </motion.div>
      {/* Portfolio guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.9 }}
      >
        <PortfolioGuide />
      </motion.div>
    </section>
  );
};

export default HeroSection;
