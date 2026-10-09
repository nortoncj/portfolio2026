import Image from "next/image";
import Link from "next/link";
import {
  ArrowIcon,
  getCategoryTheme,
  prettyType,
  sanityLoader,
  type ProjectCardData,
  type ProjectStatus,
} from "./CategoryTheme";

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

/** Presentational card. Animation lives on the wrapper in ProjectsIndex. */
export default function ProjectCard({ project }: { project: ProjectCardData }) {
  const theme = getCategoryTheme(project.category?.slug);
  const status = STATUS[project.status ?? "live"];
  const type = prettyType(project.projectType);
  const stack = project.techStack ?? [];
  const extra = stack.length - MAX_CHIPS;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--border-primary)] bg-[var(--surface-primary)] shadow-[var(--soft-shadow)] outline-none transition-shadow duration-300 hover:shadow-[var(--soft-hover)] focus-visible:ring-2 focus-visible:ring-[var(--pink)]"
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
            style={{ background: theme.gradient }}
          >
            <theme.Icon className="h-12 w-12 text-white/80" />
          </div>
        )}

        {/* category color bar */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1"
          style={{ background: theme.gradient }}
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
        <p
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: theme.accent }}
        >
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
          <p
            className="mt-3 border-l-2 pl-3 text-sm font-medium text-[var(--text-primary)]"
            style={{ borderColor: theme.accent }}
          >
            {project.impact}
          </p>
        )}

        {stack.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech used">
            {stack.slice(0, MAX_CHIPS).map((t) => (
              <li key={t} className="badge-tech px-2.5 py-1 text-xs">
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

        <span
          className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold"
          style={{ color: theme.accent }}
        >
          View project
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
