"use client";
import { useState } from "react";
import { HEADSHOT_PRIMARY, HEADSHOT_ALTERNATE } from "@/data/about";

// ─── ANIME TRANSITION PHOTO ───────────────────────────────────────────────────
export function AnimePhoto() {
  const [revealed, setRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const trigger = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setRevealed((r) => !r);
      setIsAnimating(false);
    }, 600);
  };

  return (
    <div className="photo-wrapper" onClick={trigger} title="Click to reveal">
      {/* Ink-slash overlay — anime page-turn effect */}
      <div className={`slash-overlay ${isAnimating ? "slash-active" : ""}`}>
        <div className="slash-blade slash-1" />
        <div className="slash-blade slash-2" />
        <div className="slash-blade slash-3" />
      </div>

      {/* Photos stacked; transform swaps which is on top */}
      <img
        src={HEADSHOT_PRIMARY}
        alt="Chris Norton Jr."
        className={`photo-img photo-primary ${revealed ? "photo-behind" : "photo-front"}`}
      />
      <img
        src={HEADSHOT_ALTERNATE}
        alt="Chris Norton Jr. — alternate"
        className={`photo-img photo-alt ${revealed ? "photo-front" : "photo-behind"}`}
      />

      {/* Hint badge */}
      <div className="photo-hint">{revealed ? "← back" : "click ✦"}</div>
    </div>
  );
}
