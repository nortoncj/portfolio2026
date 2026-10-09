"use client";

import Image from "next/image";
import { useEffect, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import {
  getCategoryTheme,
  sanityLoader,
  type GalleryImage,
  type ProjectImage,
} from "./categoryTheme";

export type MediaItem =
  | {
      kind: "video";
      key: string;
      youtubeId: string;
      poster?: ProjectImage | null;
    }
  | {
      kind: "image";
      key: string;
      image: ProjectImage;
      caption?: string | null;
    };

type Props = {
  title: string;
  categorySlug?: string | null;
  cover?: ProjectImage | null;
  gallery?: GalleryImage[] | null;
  youtube?: string | null;
  /** Bump this number to jump to the video and start playing it (from a "Watch demo" button). */
  playSignal?: number;
};

export function buildMediaItems({
  cover,
  gallery,
  youtube,
}: Pick<Props, "cover" | "gallery" | "youtube">) {
  const items: MediaItem[] = [];
  if (youtube)
    items.push({
      kind: "video",
      key: `yt-${youtube}`,
      youtubeId: youtube,
      poster: cover,
    });
  else if (cover) items.push({ kind: "image", key: "cover", image: cover });
  for (const g of gallery ?? []) {
    if (cover && g.url === cover.url && !youtube) continue; // don't show the cover twice
    items.push({ kind: "image", key: g._key, image: g, caption: g.caption });
  }
  return items;
}

const SWIPE_PX = 60;

/**
 * Big media frame + thumbnail strip. Swipe on touch, arrow keys on desktop.
 * The video loads only when someone hits play (the cover image is the poster),
 * so YouTube's ~800KB of script never touches people who don't watch.
 */
export default function MediaViewer({
  title,
  categorySlug,
  cover,
  gallery,
  youtube,
  playSignal = 0,
}: Props) {
  const items = buildMediaItems({ cover, gallery, youtube });
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [playing, setPlaying] = useState(false);
  const { Icon } = getCategoryTheme(categorySlug);

  // "Watch demo" from the hero
  useEffect(() => {
    if (playSignal === 0) return;
    const videoIndex = items.findIndex((i) => i.kind === "video");
    if (videoIndex === -1) return;
    setDirection(videoIndex >= index ? 1 : -1);
    setIndex(videoIndex);
    setPlaying(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playSignal]);

  if (items.length === 0) {
    return (
      <div
        className="grid aspect-[16/10] place-items-center rounded-[28px] shadow-[var(--premium-shadow)]"
        style={{ background: "var(--cat-gradient)" }}
      >
        <Icon className="h-16 w-16 text-[var(--cat-on-accent)] opacity-80" />
      </div>
    );
  }

  const current = items[Math.min(index, items.length - 1)];
  const many = items.length > 1;

  function go(next: number) {
    const wrapped = (next + items.length) % items.length;
    setDirection(next > index ? 1 : -1);
    setIndex(wrapped);
    setPlaying(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!many) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_PX) go(index + 1);
    else if (info.offset.x > SWIPE_PX) go(index - 1);
  }

  return (
    <div className="relative isolate">
      {/* glow behind the frame */}
      <div
        aria-hidden
        className="liquid-morph absolute -inset-6 -z-10 opacity-35 blur-3xl"
        style={{ background: "var(--cat-gradient)" }}
      />

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} media`}
        tabIndex={many ? 0 : -1}
        onKeyDown={onKeyDown}
        className="relative aspect-[16/10] overflow-hidden rounded-[28px] border border-[var(--border-primary)] bg-[var(--surface-secondary)] shadow-[var(--premium-shadow)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--cat-accent)]"
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.key}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            drag={many && !playing ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
          >
            {current.kind === "video" ? (
              playing ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={`${title} demo video`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 h-full w-full cursor-pointer"
                  aria-label={`Play ${title} demo video`}
                >
                  {current.poster ? (
                    <Image
                      loader={sanityLoader}
                      src={current.poster.url}
                      alt=""
                      fill
                      priority
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      placeholder={current.poster.lqip ? "blur" : "empty"}
                      blurDataURL={current.poster.lqip ?? undefined}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://i.ytimg.com/vi/${current.youtubeId}/hqdefault.jpg`}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="relative grid h-20 w-20 place-items-center">
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full"
                        style={{ background: "var(--cat-gradient)" }}
                        animate={{
                          scale: [1, 1.35, 1],
                          opacity: [0.6, 0, 0.6],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                      <span
                        className="relative grid h-20 w-20 place-items-center rounded-full text-[var(--cat-on-accent)] shadow-2xl transition-transform duration-300 group-hover:scale-110"
                        style={{ background: "var(--cat-gradient)" }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="ml-1 h-8 w-8"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                        </svg>
                      </span>
                    </span>
                  </span>
                  <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    Watch the demo
                  </span>
                </button>
              )
            ) : (
              <>
                <Image
                  loader={sanityLoader}
                  src={current.image.url}
                  alt={current.image.alt || title}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  placeholder={current.image.lqip ? "blur" : "empty"}
                  blurDataURL={current.image.lqip ?? undefined}
                  className="pointer-events-none select-none object-cover"
                  draggable={false}
                />
                {current.caption && (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-12 text-sm text-white">
                    {current.caption}
                  </span>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {many && !playing && (
          <>
            {(["prev", "next"] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => go(dir === "next" ? index + 1 : index - 1)}
                aria-label={dir === "next" ? "Next media" : "Previous media"}
                className={`btn-floating absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center !p-0 opacity-90 transition-opacity duration-200 hover:opacity-100 ${
                  dir === "next" ? "right-3" : "left-3"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`h-5 w-5 ${dir === "prev" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
            ))}
            <span className="absolute right-4 top-4 z-10 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
              {index + 1} / {items.length}
            </span>
          </>
        )}
      </div>

      {many && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item, i) => {
            const thumb = item.kind === "video" ? item.poster : item.image;
            const active = i === index;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => go(i)}
                aria-label={
                  item.kind === "video"
                    ? "Show demo video"
                    : `Show image ${i + 1}`
                }
                aria-current={active}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-[12px] border transition-opacity duration-200 ${
                  active
                    ? "border-transparent opacity-100"
                    : "border-[var(--border-primary)] opacity-60 hover:opacity-100"
                }`}
              >
                {thumb ? (
                  <Image
                    loader={sanityLoader}
                    src={thumb.url}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : item.kind === "video" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://i.ytimg.com/vi/${item.youtubeId}/mqdefault.jpg`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : null}
                {item.kind === "video" && (
                  <span className="absolute inset-0 grid place-items-center bg-black/30">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-white"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                    </svg>
                  </span>
                )}
                {active && (
                  <motion.span
                    layoutId="media-thumb-ring"
                    aria-hidden
                    className="absolute inset-0 rounded-[12px]"
                    style={{ boxShadow: "inset 0 0 0 2.5px var(--cat-accent)" }}
                    transition={{ type: "spring", stiffness: 450, damping: 34 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
