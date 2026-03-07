"use client";

import { useState, useEffect } from "react";

const WORDS = [
  "Systems",
  "Solutions",
  "Pipelines",
  "Products",
  "Experiences",
  "Automation",
];

const CLASSES = [
  "c-purple",
  "c-magenta",
  "c-pink",
  "c-cyan",
  "c-mint",
  "c-gold",
];

const DISPLAY_DURATION = 2200; // ms each word stays visible
const FADE_DURATION = 500; // ms for fade in / out

interface AnimatedWordProps {
  words?: string[];
  classes?: string[];
  displayDuration?: number;
  fadeDuration?: number;
  className?: string;
}

export function Fader({
  words = WORDS,
  classes = CLASSES,
  displayDuration = DISPLAY_DURATION,
  fadeDuration = FADE_DURATION,
  className = "",
}: AnimatedWordProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Stay visible for displayDuration, then fade out
    const showTimer = setTimeout(() => {
      setVisible(false);

      // After fade-out completes, swap word and fade back in
      const swapTimer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setVisible(true);
      }, fadeDuration);

      return () => clearTimeout(swapTimer);
    }, displayDuration);

    return () => clearTimeout(showTimer);
  }, [index, words, displayDuration, fadeDuration]);

  return (
    <span
      className={`${className} ${classes[index]}`}
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-6px)",
        transition: `opacity ${fadeDuration}ms ease, transform ${fadeDuration}ms ease`,
      }}
    >
      {words[index]}
    </span>
  );
}


