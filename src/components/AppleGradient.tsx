import { useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Apple Intelligence-style animated gradient border.
 * Inspired by Skiper UI "skiper86" (https://skiper-ui.com/v1/skiper86),
 * rebuilt with framer-motion (no use-sound dependency).
 *
 * The glow is controlled by the parent via `on`. A sound plays on every
 * off -> on transition (manual toggle or the `triggerOnView` first-view
 * activation). The rotation uses a CSS @property angle (see index.css).
 */
type AppleGradientProps = {
  children: ReactNode;
  /** Whether the glow is shown. */
  on: boolean;
  /** Blur radius of the glow in px. */
  intensity?: number;
  /** Fire `onActivate` when first scrolled into view (parent flips `on`). */
  triggerOnView?: boolean;
  onActivate?: () => void;
  /** Sound played when the glow turns on. */
  soundSrc?: string;
  /** Tailwind radius classes; should match the wrapped element's corners. */
  radiusClass?: string;
  className?: string;
};

export default function AppleGradient({
  children,
  on,
  intensity = 18,
  triggerOnView = false,
  onActivate,
  soundSrc = "/assets/apple_intelligence.mp3",
  radiusClass = "rounded-[2.6rem]",
  className = "",
}: AppleGradientProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const activatedRef = useRef(false);
  const activateCb = useRef(onActivate);
  activateCb.current = onActivate;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const prevOnRef = useRef(on);

  // Lazily build the audio element once.
  useEffect(() => {
    const audio = new Audio(soundSrc);
    audio.preload = "auto";
    audio.volume = 1;
    audioRef.current = audio;
  }, [soundSrc]);

  // Play the sound on each off -> on transition (manual toggle or auto-trigger).
  // Routed through a Web Audio GainNode so it can be amplified past 1.0.
  useEffect(() => {
    if (!prevOnRef.current && on && audioRef.current) {
      const audio = audioRef.current;
      const SOUND_GAIN = 4; // ~+12dB louder than the source file

      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

        if (AudioCtx && !ctxRef.current) {
          const ctx = new AudioCtx();
          const source = ctx.createMediaElementSource(audio);
          const gain = ctx.createGain();
          gain.gain.value = SOUND_GAIN;
          source.connect(gain);
          gain.connect(ctx.destination);
          ctxRef.current = ctx;
        }
        if (ctxRef.current?.state === "suspended") void ctxRef.current.resume();
      } catch {
        /* Web Audio unavailable — fall back to the plain element below */
      }

      audio.currentTime = 0;
      void audio.play().catch(() => {
        /* autoplay blocked until a user gesture — glow still works */
      });
    }
    prevOnRef.current = on;
  }, [on]);

  useEffect(() => {
    if (!triggerOnView) return;
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !activatedRef.current) {
            activatedRef.current = true;
            activateCb.current?.();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <AnimatePresence>
        {on && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className={`pointer-events-none absolute -inset-[6px] ${radiusClass}`}
            style={{ filter: `blur(${intensity}px)` }}
          >
            <div className={`apple-ai-gradient h-full w-full ${radiusClass}`} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">{children}</div>
    </div>
  );
}
