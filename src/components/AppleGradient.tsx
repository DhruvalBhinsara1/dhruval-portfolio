import { useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Apple Intelligence-style animated gradient border.
 * Inspired by Skiper UI "skiper86" (https://skiper-ui.com/v1/skiper86),
 * rebuilt with framer-motion. The rotating hue animation only runs while `on`
 * is true (the layer is unmounted otherwise), so it never animates off-screen.
 *
 * Controlled by the parent via `on`. With `triggerOnView` it reports viewport
 * entry/exit through `onShow` / `onHide` so the parent can switch the glow on
 * only while the wrapped element is visible.
 */
type AppleGradientProps = {
  children: ReactNode;
  /** Whether the glow is shown (and animating). */
  on: boolean;
  /** Blur radius of the glow in px. */
  intensity?: number;
  /** Report viewport entry/exit via onShow/onHide. */
  triggerOnView?: boolean;
  onShow?: () => void;
  onHide?: () => void;
  /** Tailwind radius classes; should match the wrapped element's corners. */
  radiusClass?: string;
  className?: string;
};

export default function AppleGradient({
  children,
  on,
  intensity = 18,
  triggerOnView = false,
  onShow,
  onHide,
  radiusClass = "rounded-[2.6rem]",
  className = "",
}: AppleGradientProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const showCb = useRef(onShow);
  showCb.current = onShow;
  const hideCb = useRef(onHide);
  hideCb.current = onHide;

  useEffect(() => {
    if (!triggerOnView) return;
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) showCb.current?.();
          else hideCb.current?.();
        });
      },
      { threshold: 0.15 },
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

      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}
