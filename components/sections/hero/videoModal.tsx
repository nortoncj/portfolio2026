'use client';
import React, { useEffect } from "react";
import "@css/videoModal.css";
type Props = {
  url: string;
  open: boolean;
  onClose: () => void;
};

function VideoModal({ open, url, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;
  return (
    <div
      className="modal-overlay open"
      onClick={onClose}
      id="videoModal"
      role="dialog"
      aria-modal="true"
      aria-label="Intro video"
    >
      <div className="modal-box" onClick={(e)=> e.stopPropagation()}>
        <button
          className="modal-close"
          id="modalClose"
          aria-label="Close video"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="modal-video-wrap">
          {/* Replace with your real embed URL.
        YouTube format: https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1
        Vimeo format:   https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1 */}
          <iframe
            id="videoFrame"
            src={`${url}?autoplay=1`}
            title="Intro video"
            allow="autoplay; fullscreen"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
