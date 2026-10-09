"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProjectCard from "./ProjectCard";
import type { ProjectCardData } from "./categoryTheme";

type Props = {
  projects: ProjectCardData[];
  /** Animate cards in on first load (true near the top of a page, false below the fold). */
  animateFirstRender?: boolean;
  empty?: ReactNode;
};

/** Grid that reflows smoothly when the list is filtered. Used by the index and category pages. */
export default function ProjectGrid({
  projects,
  animateFirstRender = false,
  empty,
}: Props) {
  if (projects.length === 0 && empty) return <>{empty}</>;

  return (
    <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout" initial={animateFirstRender}>
        {projects.map((p, i) => (
          <motion.div
            key={p._id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                delay: Math.min(i, 8) * 0.05,
                type: "spring",
                stiffness: 160,
                damping: 22,
              },
            }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="h-full"
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
