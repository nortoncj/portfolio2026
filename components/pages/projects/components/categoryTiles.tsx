"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  ArrowIcon,
  getCategoryTheme,
  type CategorySummary,
} from "./categoryTheme";

// ---------------------------------------------------------------------------
// Count-up number that fires once when it scrolls into view
// ---------------------------------------------------------------------------
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (reduce) {
      el.textContent = String(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className={className}>
      {reduce ? to : 0}
    </span>
  );
}

// ---------------------------------------------------------------------------
// One tile: cursor spotlight + subtle 3D tilt + active ring that slides between tiles
// ---------------------------------------------------------------------------
type TileProps = {
  category: CategorySummary;
  active: boolean;
  index: number;
  onSelect: (slug: string) => void;
};

function Tile({ category, active, index, onSelect }: TileProps) {
  const theme = getCategoryTheme(category.slug);
  const reduce = useReducedMotion();

  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const rotateX = useSpring(0, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 22 });
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, ${theme.glow}, transparent 70%)`;

  function handleMove(e: PointerEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mx.set(x);
    my.set(y);
    if (reduce || e.pointerType !== "mouse") return;
    rotateY.set((x / r.width - 0.5) * 7);
    rotateX.set(-(y / r.height - 0.5) * 7);
  }

  function handleLeave() {
    mx.set(-300);
    my.set(-300);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(category.slug)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      aria-pressed={active}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.08,
        type: "spring",
        stiffness: 120,
        damping: 18,
      }}
      whileTap={{ scale: 0.98 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-6 text-left shadow-[var(--soft-shadow)] outline-none transition-shadow duration-300 hover:shadow-[var(--medium-shadow)] focus-visible:ring-2 focus-visible:ring-[var(--pink)]"
    >
      {/* cursor spotlight */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />

      {/* active ring glides between tiles via shared layoutId */}
      {active && (
        <motion.span
          layoutId="category-tile-ring"
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[24px]"
          style={{
            boxShadow: `inset 0 0 0 2px ${theme.accent}, 0 16px 48px ${theme.glow}`,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}

      {/* gradient bar wipes in on hover, stays when active */}
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
        style={{ background: theme.gradient }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span
          className={`grid h-12 w-12 place-items-center rounded-[16px] text-[#fcfcfa] shadow-lg ${
            active ? "floating-soft" : ""
          }`}
          style={{ background: theme.gradient }}
        >
          <theme.Icon className="h-6 w-6" />
        </span>
        <div className="text-right">
          <CountUp
            to={category.count}
            className="block text-4xl font-semibold leading-none tracking-tight text-[var(--text-primary)]"
          />
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
            {category.count === 1 ? "project" : "projects"}
          </span>
        </div>
      </div>

      <h3 className="relative mt-6 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
        {category.title}
      </h3>
      {theme.tagline && (
        <p className="relative mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          {theme.tagline}
        </p>
      )}

      {category.topStack.length > 0 && (
        <ul
          className="relative mt-5 flex flex-wrap gap-2"
          aria-label="Common tools"
        >
          {category.topStack.map((t) => (
            <li key={t} className="badge-tech px-2.5 py-1 text-xs">
              {t}
            </li>
          ))}
        </ul>
      )}

      <span
        className="relative mt-auto flex items-center gap-2 pt-6 text-sm font-semibold"
        style={{ color: theme.accent }}
      >
        {active ? "Showing these" : "See the work"}
        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
type Props = {
  categories: CategorySummary[];
  active: string;
  onSelect: (slug: string) => void;
};

export default function CategoryTiles({ categories, active, onSelect }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {categories.map((c, i) => (
        <Tile
          key={c._id}
          category={c}
          index={i}
          active={active === c.slug}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
