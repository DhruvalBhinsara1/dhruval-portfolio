import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const memojiImages = [
  '/memoji.png',
  '/memoji2.png',
  '/memoji3.png',
  '/memoji4.png',
  '/memoji5.png',
];

export default function LoadingScreen() {
  const [index, setIndex] = useState(0);
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % memojiImages.length);
      setAnimateKey((k) => k + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen w-full py-12 bg-gradient-to-b from-white via-blue-50 to-white z-[9999]">
      <div className="mb-6 text-2xl font-bold text-gray-700">Loading...</div>
      <motion.img
        key={animateKey}
        src={memojiImages[index]}
        alt="Loading Memoji"
        className="w-24 h-24 md:w-32 md:h-32 object-contain"
        initial={{ y: 0, scale: 1 }}
        animate={{ y: -12, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18, duration: 0.4 }}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
