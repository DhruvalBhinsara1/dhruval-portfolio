import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { memojiImages, nextMemoji } from "../data/memoji";

type MemojiScreenProps = {
  open: boolean;
  onClose: () => void;
};

export default function MemojiScreen({ open, onClose }: MemojiScreenProps) {
  const [index, setIndex] = useState(0);

  // Close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Lock background scroll while the screen is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white/70 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Memoji"
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/80 text-gray-700 shadow-sm transition hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
            Say hi
          </p>
          <p className="mb-8 max-w-md px-6 text-center text-base text-gray-500">
            Tap to shuffle, or drag me around.
          </p>

          {/* Draggable, tappable memoji */}
          <motion.button
            type="button"
            onClick={() => setIndex((i) => nextMemoji(i))}
            aria-label="Shuffle memoji"
            drag
            dragElastic={0.35}
            dragConstraints={{ left: -180, right: 180, top: -120, bottom: 120 }}
            dragSnapToOrigin
            whileTap={{ scale: 0.92 }}
            whileDrag={{ scale: 1.05, cursor: "grabbing" }}
            className="relative h-60 w-60 cursor-grab touch-none md:h-80 md:w-80"
            animate={{ y: [0, -12, 0] }}
            transition={{ y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={index}
                src={memojiImages[index]}
                alt="Dhruval's memoji"
                draggable={false}
                initial={{ opacity: 0, scale: 0.45, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.45, rotate: 8 }}
                transition={{ type: "spring", stiffness: 520, damping: 20, mass: 0.6 }}
                className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_20px_50px_rgba(15,23,42,0.22)]"
              />
            </AnimatePresence>
          </motion.button>

          {/* Picker */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 px-6">
            {memojiImages.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show memoji ${i + 1}`}
                aria-pressed={i === index}
                className={`grid h-14 w-14 place-items-center rounded-2xl border bg-white/80 shadow-sm transition ${
                  i === index ? "border-gray-900/30 ring-2 ring-gray-900/30" : "border-black/10 hover:bg-white"
                }`}
              >
                <img src={src} alt="" className="h-10 w-10 object-contain" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
