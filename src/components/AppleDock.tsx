import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  Reorder,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Briefcase,
  FileText,
  FolderGit2,
  Github,
  Home,
  Layers,
  Linkedin,
  Mail,
  Music,
  User,
} from "lucide-react";

// macOS-style magnifying dock — a reliable framer-motion build of the
// "Apple Dock Navigation" Framer component (which needs the Framer runtime).
// Tiles are colorful and can be dragged to reorder; the order is persisted.
function scrollToSection(id: string) {
  let attempts = 0;
  const scroll = () => {
    const section = document.getElementById(id);
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
}

type DockEntry = {
  key: string;
  label: string;
  icon: ReactNode;
  /** CSS gradient for the icon's base layer (brand-accurate where it matters). */
  gradient: string;
} & ({ kind: "section"; id: string } | { kind: "link"; href: string });

// Order mirrors how the sections appear on the page (links come last).
const sectionIds = ["home", "about", "playlists", "experience", "projects", "skills", "resume", "contact"];

const entries: DockEntry[] = [
  { key: "home", kind: "section", id: "home", label: "Home", icon: <Home />, gradient: "linear-gradient(145deg,#5aa6ff 0%,#1f74f0 55%,#0a55d8 100%)" },
  { key: "about", kind: "section", id: "about", label: "About", icon: <User />, gradient: "linear-gradient(145deg,#c08bff 0%,#8b46f0 55%,#6d28d9 100%)" },
  { key: "music", kind: "section", id: "playlists", label: "Music", icon: <Music />, gradient: "linear-gradient(145deg,#fb5c74 0%,#fa233b 55%,#e21b32 100%)" },
  { key: "experience", kind: "section", id: "experience", label: "Experience", icon: <Briefcase />, gradient: "linear-gradient(145deg,#ffc46b 0%,#ff921f 55%,#f56a00 100%)" },
  { key: "projects", kind: "section", id: "projects", label: "Projects", icon: <FolderGit2 />, gradient: "linear-gradient(145deg,#4ee3a6 0%,#13bd86 55%,#059669 100%)" },
  { key: "skills", kind: "section", id: "skills", label: "Skills", icon: <Layers />, gradient: "linear-gradient(145deg,#48d9ec 0%,#0ea5c4 55%,#0d80b2 100%)" },
  { key: "resume", kind: "section", id: "resume", label: "Resume", icon: <FileText />, gradient: "linear-gradient(145deg,#ff9d6b 0%,#ff5e3a 55%,#ef3d1c 100%)" },
  { key: "contact", kind: "section", id: "contact", label: "Contact", icon: <Mail />, gradient: "linear-gradient(145deg,#ff86bd 0%,#ee4d9e 55%,#db2777 100%)" },
  { key: "github", kind: "link", href: "https://github.com/DhruvalBhinsara1", label: "GitHub", icon: <Github />, gradient: "linear-gradient(145deg,#3a4047 0%,#24292e 55%,#16191d 100%)" },
  { key: "linkedin", kind: "link", href: "https://www.linkedin.com/in/dhruvalbhinsara", label: "LinkedIn", icon: <Linkedin />, gradient: "linear-gradient(145deg,#2e85d8 0%,#0a66c2 55%,#064a8f 100%)" },
];

const entryByKey = Object.fromEntries(entries.map((e) => [e.key, e]));
const DEFAULT_ORDER = entries.map((e) => e.key);
const STORAGE_KEY = "dockOrder";

function loadOrder(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ORDER;
    const parsed = JSON.parse(raw) as string[];
    // Only trust a saved order that still matches the current entry set.
    const valid =
      Array.isArray(parsed) &&
      parsed.length === DEFAULT_ORDER.length &&
      parsed.every((k) => k in entryByKey);
    return valid ? parsed : DEFAULT_ORDER;
  } catch {
    return DEFAULT_ORDER;
  }
}

function DockItem({
  value,
  mouseX,
  active,
}: {
  value: string;
  mouseX: MotionValue<number>;
  active: boolean;
}) {
  const entry = entryByKey[value];
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(distance, [-140, 0, 140], [44, 74, 44]);
  const iconTransform = useTransform(distance, [-140, 0, 140], [20, 34, 20]);
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 170, damping: 14 });
  const iconSize = useSpring(iconTransform, { mass: 0.1, stiffness: 170, damping: 14 });

  const handleActivate = () => {
    if (entry.kind === "section") {
      scrollToSection(entry.id);
    } else {
      window.open(entry.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Reorder.Item
      value={value}
      as="div"
      whileDrag={{ scale: 1.08, zIndex: 50 }}
      className="relative cursor-grab touch-none active:cursor-grabbing"
    >
      <motion.div
        ref={ref}
        style={{
          width: size,
          height: size,
          backgroundImage: entry.gradient,
          boxShadow:
            "inset 0 1px 0.5px rgba(255,255,255,0.55), inset 0 -3px 6px rgba(0,0,0,0.28), 0 6px 14px rgba(15,23,42,0.22)",
        }}
        onClick={handleActivate}
        role="button"
        tabIndex={0}
        aria-label={entry.label}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleActivate();
          }
        }}
        className="group relative grid aspect-square place-items-center overflow-hidden rounded-[26%] text-white"
      >
        {/* Top gloss */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[55%] rounded-[inherit] bg-gradient-to-b from-white/40 via-white/10 to-transparent"
        />
        {/* Specular highlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/4 left-1/2 h-1/2 w-[70%] -translate-x-1/2 rounded-full bg-white/35 blur-md"
        />
        {/* Inner rim light */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/25"
        />

        {/* Tooltip */}
        <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100">
          {entry.label}
        </span>

        <motion.span
          style={{ width: iconSize, height: iconSize }}
          className="relative z-10 grid place-items-center [&>svg]:h-full [&>svg]:w-full [&>svg]:drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
        >
          {entry.icon}
        </motion.span>

        {active && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[inherit] ring-2 ring-inset ring-white/80"
          />
        )}
      </motion.div>
      {active && (
        <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gray-500" aria-hidden="true" />
      )}
    </Reorder.Item>
  );
}

export default function AppleDock() {
  const mouseX = useMotionValue(Infinity);
  const [active, setActive] = useState("home");
  const [order, setOrder] = useState<string[]>(DEFAULT_ORDER);

  // Load persisted order after mount (avoids SSR/storage access during render).
  useEffect(() => {
    setOrder(loadOrder());
  }, []);

  const handleReorder = (next: string[]) => {
    setOrder(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore storage failures */
    }
  };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const anchor = window.scrollY + window.innerHeight * 0.35;
      let current = sectionIds[0];
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
        const top = section.offsetTop;
        if (anchor >= top && anchor < top + section.offsetHeight) current = id;
      });
      setActive(current);
    };
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Map the active section id back to its entry key (Music -> playlists).
  const activeKey = entries.find((e) => e.kind === "section" && e.id === active)?.key;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 hidden justify-center md:flex">
      <Reorder.Group
        as="div"
        axis="x"
        values={order}
        onReorder={handleReorder}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-end gap-3 rounded-[1.5rem] border border-black/10 bg-white/65 px-4 py-3 shadow-[0_18px_55px_rgba(15,23,42,0.18)] backdrop-blur-2xl"
        aria-label="Dock navigation"
      >
        {order.map((key) => (
          <DockItem key={key} value={key} mouseX={mouseX} active={key === activeKey} />
        ))}
      </Reorder.Group>
    </div>
  );
}
