import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import { Minus, Plus, RotateCcw, RotateCw, Sparkles } from "lucide-react";
import AppleGradient from "./AppleGradient";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MIN_SCALE = 0.7;
const MAX_SCALE = 3;
const SCALE_STEP = 0.2;

const clampScale = (value: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

// One shared spring drives device rotation, content counter-rotation, the
// content box size AND the PDF scale, so the page eases in/out in lockstep
// with the rotation instead of snapping at the end.
const ROTATE_SPRING = { type: "spring", stiffness: 120, damping: 18, mass: 0.85 } as const;

type Orientation = "portrait" | "landscape";

const ResumeSection: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [baseWidth, setBaseWidth] = useState(0);
  const [scale, setScale] = useState(1);
  const [gestureScale, setGestureScale] = useState(1);
  const [glowOn, setGlowOn] = useState(false);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [screen, setScreen] = useState({ w: 0, h: 0 });

  const sectionRef = useRef<HTMLElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Glow chime (amplified via Web Audio). Plays once on first reveal + on manual enable.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio("/assets/apple_intelligence.mp3");
    audio.preload = "auto";
    audio.volume = 1;
    audioRef.current = audio;
  }, []);

  const playChime = () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx && !audioCtxRef.current) {
        const ctx = new AudioCtx();
        const source = ctx.createMediaElementSource(audio);
        const gain = ctx.createGain();
        gain.gain.value = 4; // ~+12dB
        source.connect(gain);
        gain.connect(ctx.destination);
        audioCtxRef.current = ctx;
      }
      if (audioCtxRef.current?.state === "suspended") void audioCtxRef.current.resume();
    } catch {
      /* Web Audio unavailable — element plays at its own volume */
    }
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  };

  const handleShow = () => {
    setGlowOn(true);
    if (!soundedRef.current) {
      soundedRef.current = true;
      playChime();
    }
  };

  const toggleGlow = () =>
    setGlowOn((v) => {
      const next = !v;
      if (next) playChime();
      return next;
    });

  // Grow the iPad as the section scrolls into view (default size -> larger).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);

  const scaleRef = useRef(scale);
  scaleRef.current = scale;
  const gestureScaleRef = useRef(gestureScale);
  gestureScaleRef.current = gestureScale;

  const landscape = orientation === "landscape";
  const landscapeRef = useRef(landscape);

  // Animated content geometry (motion values so the PDF can track them frame-by-frame).
  const cw = useMotionValue(0); // content width
  const ch = useMotionValue(0); // content height
  const deviceRotate = useMotionValue(0);
  const contentRotate = useMotionValue(0);
  // PDF scale = live content width / committed fit width -> 1 at rest, eases
  // during the rotation as cw animates.
  const pdfScale = useTransform(cw, (v) => (baseWidth > 0 ? v / baseWidth : 1));

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // Measure the physical screen box (fixed by the device aspect; unaffected by rotation).
  useLayoutEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const measure = () => setScreen({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Set content geometry instantly when the screen is (re)measured.
  useEffect(() => {
    if (!screen.w) return;
    const ls = landscapeRef.current;
    cw.set(ls ? screen.h : screen.w);
    ch.set(ls ? screen.w : screen.h);
  }, [screen.w, screen.h, cw, ch]);

  // Animate the rotation when orientation toggles (everything on one spring).
  useEffect(() => {
    landscapeRef.current = landscape;
    if (!screen.w) return;
    const controls = [
      animate(cw, landscape ? screen.h : screen.w, ROTATE_SPRING),
      animate(ch, landscape ? screen.w : screen.h, ROTATE_SPRING),
      animate(deviceRotate, landscape ? 90 : 0, ROTATE_SPRING),
      animate(contentRotate, landscape ? -90 : 0, ROTATE_SPRING),
    ];
    return () => controls.forEach((c) => c.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [landscape]);

  // Fit the PDF to the content width (debounced -> commits crisp render after the spring settles).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let timer = 0;
    const update = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setBaseWidth(el.clientWidth), 140);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Pinch-to-zoom: trackpad pinch / ctrl+wheel and two-finger touch pinch.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let commitTimer = 0;
    const scheduleCommit = () => {
      window.clearTimeout(commitTimer);
      commitTimer = window.setTimeout(() => {
        setScale((s) => clampScale(s * gestureScaleRef.current));
        setGestureScale(1);
      }, 180);
    };
    const setEffective = (effective: number) => {
      setGestureScale(clampScale(effective) / scaleRef.current);
      scheduleCommit();
    };

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      setEffective(scaleRef.current * gestureScaleRef.current * (1 - e.deltaY * 0.01));
    };

    let lastDist = 0;
    const distance = (touches: TouchList) =>
      Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) lastDist = distance(e.touches);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2) return;
      e.preventDefault();
      const d = distance(e.touches);
      if (lastDist) setEffective(scaleRef.current * gestureScaleRef.current * (d / lastDist));
      lastDist = d;
    };
    const onTouchEnd = () => {
      lastDist = 0;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      window.clearTimeout(commitTimer);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const renderWidth = baseWidth > 0 ? Math.round(baseWidth * scale) : 0;
  const displayPercent = Math.round(scale * gestureScale * 100);

  const controlPill =
    "z-20 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-md backdrop-blur transition hover:bg-white";

  return (
    <section ref={sectionRef} id="resume" className="overflow-x-clip py-16 md:py-24 px-6 md:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center tracking-tight">Resume</h2>
        <p className="text-lg md:text-2xl text-gray-500 mb-10 text-center">
          Education, projects, certifications, and the current skill direction in one place
        </p>

        {/* Stage reserves room for the rotated device. */}
        <div
          className="relative flex w-full items-center justify-center [--dw:min(64vw,600px)]"
          style={{ minHeight: "calc(var(--dw) * 1.4 * 1.22)" }}
        >
          {/* Scroll-driven grow wrapper */}
          <motion.div className="origin-center" style={{ scale: scrollScale }}>
          {/* Device — physically rotates 90deg */}
          <motion.div
            className="origin-center"
            style={{ width: "var(--dw)", height: "calc(var(--dw) * 1.4)", rotate: deviceRotate }}
          >
            <AppleGradient
              radiusClass="rounded-[2.2rem] md:rounded-[2.6rem]"
              className="h-full w-full"
              intensity={22}
              on={glowOn}
              triggerOnView
              onShow={handleShow}
              onHide={() => setGlowOn(false)}
            >
              {/* Side buttons (rotate with the device) */}
              <div className="absolute right-[-3px] top-20 h-14 w-[3px] rounded-r-sm bg-gray-800" aria-hidden="true" />
              <div className="absolute left-[-3px] top-16 h-10 w-[3px] rounded-l-sm bg-gray-800" aria-hidden="true" />
              <div className="absolute left-[-3px] top-28 h-10 w-[3px] rounded-l-sm bg-gray-800" aria-hidden="true" />

              {/* Bezel */}
              <div className="flex h-full w-full rounded-[2.2rem] bg-gray-900 p-2.5 shadow-[0_30px_80px_rgba(15,23,42,0.30)] ring-1 ring-white/10 md:rounded-[2.6rem] md:p-3.5">
                {/* Screen */}
                <div
                  ref={screenRef}
                  className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-white md:rounded-[1.9rem]"
                >
                  {/* Content counter-rotates + resizes so it stays upright and eases with the turn */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 origin-center"
                    style={{ x: "-50%", y: "-50%", width: cw, height: ch, rotate: contentRotate }}
                  >
                    {/* Orientation toggle */}
                    <button
                      type="button"
                      onClick={() => setOrientation((o) => (o === "portrait" ? "landscape" : "portrait"))}
                      title="Rotate the iPad"
                      className={`absolute left-3 top-3 ${controlPill}`}
                    >
                      <RotateCw className="h-3.5 w-3.5 text-gray-500" />
                      <span className="hidden sm:inline">{landscape ? "Portrait" : "Landscape"}</span>
                    </button>

                    {/* Glow toggle */}
                    <button
                      type="button"
                      onClick={toggleGlow}
                      aria-pressed={glowOn}
                      title="Toggle Apple Intelligence glow"
                      className={`absolute right-3 top-3 ${controlPill}`}
                    >
                      <Sparkles className={`h-3.5 w-3.5 ${glowOn ? "text-violet-500" : "text-gray-400"}`} />
                      <span className="hidden sm:inline">{glowOn ? "Glow on" : "Glow off"}</span>
                    </button>

                    <div ref={scrollRef} className="h-full w-full overflow-auto overscroll-contain">
                      {/* Orientation scale (eases with the spring) */}
                      <motion.div className="flex min-h-full w-full justify-center" style={{ scale: pdfScale, originY: 0 }}>
                        {/* Pinch zoom (live transform) */}
                        <div
                          className="w-fit"
                          style={{ transform: `scale(${gestureScale})`, transformOrigin: "top center" }}
                        >
                          <Document
                            file="/assets/Dhruval_Bhinsara_Resume.pdf"
                            onLoadSuccess={onDocumentLoadSuccess}
                            externalLinkTarget="_blank"
                            externalLinkRel="noopener noreferrer"
                            loading={
                              <div
                                className="skeleton h-full min-h-[320px] w-full"
                                aria-busy="true"
                                aria-label="Loading resume PDF"
                              />
                            }
                            error={<div className="py-32 text-center text-red-600">Failed to load PDF</div>}
                          >
                            {renderWidth > 0 && (
                              <Page
                                pageNumber={pageNumber}
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                                width={renderWidth}
                              />
                            )}
                          </Document>
                        </div>
                      </motion.div>
                    </div>

                    {/* Zoom controls */}
                    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded-full border border-black/10 bg-white/90 p-1 shadow-md backdrop-blur">
                      <button
                        type="button"
                        onClick={() => setScale((s) => clampScale(s - SCALE_STEP))}
                        disabled={displayPercent <= MIN_SCALE * 100}
                        aria-label="Zoom out"
                        className="grid h-8 w-8 place-items-center rounded-full text-gray-700 transition hover:bg-black/5 disabled:opacity-30"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-[3.5ch] text-center text-xs font-semibold tabular-nums text-gray-700">
                        {displayPercent}%
                      </span>
                      <button
                        type="button"
                        onClick={() => setScale((s) => clampScale(s + SCALE_STEP))}
                        disabled={displayPercent >= MAX_SCALE * 100}
                        aria-label="Zoom in"
                        className="grid h-8 w-8 place-items-center rounded-full text-gray-700 transition hover:bg-black/5 disabled:opacity-30"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setScale(1);
                          setGestureScale(1);
                        }}
                        disabled={displayPercent === 100}
                        aria-label="Reset zoom"
                        className="grid h-8 w-8 place-items-center rounded-full text-gray-700 transition hover:bg-black/5 disabled:opacity-30"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>

                  {/* Home indicator */}
                  <div
                    className="pointer-events-none absolute bottom-2 left-1/2 z-10 h-1 w-24 -translate-x-1/2 rounded-full bg-black/25"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </AppleGradient>
          </motion.div>
          </motion.div>
        </div>

        {numPages && numPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
              disabled={pageNumber <= 1}
              className="px-4 py-2 text-sm font-medium transition-opacity hover:opacity-60 disabled:opacity-30"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
              disabled={pageNumber >= numPages}
              className="px-4 py-2 text-sm font-medium transition-opacity hover:opacity-60 disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}

        <a
          href="/assets/Dhruval_Bhinsara_Resume.pdf"
          download
          className="mt-6 inline-block rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-opacity hover:opacity-80"
        >
          Download PDF
        </a>
      </div>
    </section>
  );
};

export default ResumeSection;
