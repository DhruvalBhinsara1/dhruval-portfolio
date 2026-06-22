import React from "react";
import { motion } from "framer-motion";
import PortfolioGuide from "./AISearch";

const memojiImages = [
  "/memoji.png",
  "/memoji2.png",
  "/memoji3.png",
  "/memoji4.png",
  "/memoji5.png",
];

function MemojiAvatar() {
  const [index, setIndex] = React.useState(0);
  const timerRef = React.useRef<number | null>(null);

  // Change memoji randomly every 4-6 seconds
  React.useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => {
        let next;
        do {
          next = Math.floor(Math.random() * memojiImages.length);
        } while (next === i && memojiImages.length > 1);
        return next;
      });
    }, 6000 + Math.floor(Math.random() * 7000));
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [index]);

  // On hover, change immediately and reset timer
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIndex((i) => {
      let next;
      do {
        next = Math.floor(Math.random() * memojiImages.length);
      } while (next === i && memojiImages.length > 1);
      return next;
    });
  };
  const handleMouseLeave = () => {
    // No action needed
  };

  return (
    <motion.div
      className="h-24 w-24 cursor-pointer object-contain md:h-32 md:w-32 lg:h-36 lg:w-36"
      style={{ display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.img
        key={index}
        src={memojiImages[index]}
        alt="Dhruval Bhinsara"
        loading="lazy"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20, duration: 0.5 }}
        style={{ willChange: 'transform', width: '100%', height: '100%' }}
        whileHover={{ scale: 0.8 }}
      />
    </motion.div>
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
