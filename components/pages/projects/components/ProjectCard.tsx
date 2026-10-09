import Image from "next/image";
import Link from "next/link";
import "@css/projects/category-themes.css";
import {
  ArrowIcon,
  getCategoryTheme,
  prettyType,
  projectHref,
  sanityLoader,
  type ProjectCardData,
  type ProjectStatus,
} from "./categoryTheme";

const STATUS: Record<
  ProjectStatus,
  { label: string; className: string; pulse: boolean }
> = {
  live: { label: "Shipped", className: "badge-success", pulse: false },
  "in-progress": {
    label: "In progress",
    className: "badge-glass",
    pulse: true,
  },
  archived: { label: "Archived", className: "badge-tech", pulse: false },
};

const MAX_CHIPS = 4;

/**
 * Presentational card. Colors come from its own data-category, so a DevOps
 * card stays cyan even on the index page, and adapts to light/dark mode.
 * Animation lives on the wrapper in ProjectGrid.
 */
export default function ProjectCard({ project }: { project: ProjectCardData }) {
  const { Icon } = getCategoryTheme(project.category?.slug);
  const status = STATUS[project.status ?? "live"];
  const type = prettyType(project.projectType);
  const stack = project.techStack ?? [];
  const extra = stack.length - MAX_CHIPS;

  return (
    <Link
      href={projectHref(project)}
      data-category={project.category?.slug}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--border-primary)] bg-[var(--surface-primary)] shadow-[var(--soft-shadow)] outline-none transition-[box-shadow,border-color] duration-300 hover:border-[var(--cat-border)] hover:shadow-[0_16px_44px_var(--cat-glow)] focus-visible:ring-2 focus-visible:ring-[var(--cat-accent)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-secondary)]">
        {project.image ? (
          <Image
            loader={sanityLoader}
            src={project.image.url}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            placeholder={project.image.lqip ? "blur" : "empty"}
            blurDataURL={project.image.lqip ?? undefined}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            className="grid h-full place-items-center"
            style={{ background: "var(--cat-gradient)" }}
          >
            <Icon className="h-12 w-12 text-[var(--cat-on-accent)] opacity-80" />
          </div>
        )}

        {/* category color bar */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1 origin-left transition-transform duration-500 group-hover:scale-y-150"
          style={{ background: "var(--cat-gradient)" }}
        />

        <span
          className={`${status.className} absolute left-4 top-4 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs backdrop-blur-md`}
        >
          {status.pulse && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
            </span>
          )}
          {status.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--cat-text)]">
          {project.category?.title}
          {type && (
            <span className="text-[var(--text-secondary)]"> · {type}</span>
          )}
        </p>

        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-[var(--text-primary)]">
          {project.title}
        </h3>

        {project.summary && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            {project.summary}
          </p>
        )}

        {project.impact && (
          <p className="mt-3 border-l-2 border-[var(--cat-accent)] pl-3 text-sm font-medium text-[var(--text-primary)]">
            {project.impact}
          </p>
        )}

        {stack.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech used">
            {stack.slice(0, MAX_CHIPS).map((t) => (
              <li
                key={t}
                className="rounded-[8px] border border-[var(--cat-border)] bg-[var(--cat-soft)] px-2.5 py-1 text-xs text-[var(--cat-text)]"
                style={{
                  fontFamily: "var(--font-code), ui-monospace, monospace",
                }}
              >
                {t}
              </li>
            ))}
            {extra > 0 && (
              <li className="px-1 py-1 text-xs text-[var(--text-secondary)]">
                +{extra} more
              </li>
            )}
          </ul>
        )}

        <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-[var(--cat-text)]">
          View project
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
