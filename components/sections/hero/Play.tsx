"use client";
import { useState } from "react";
import VideoModal from "./videoModal";

export function Play() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="play-btn-wrap">
        <span className="play-ring"></span>
        <span className="play-ring"></span>
        <button
          className="play-btn btn-primary"
          id="playBtn"
          onClick={() => setModalOpen(true)}
          aria-label="Watch intro video"
        >
          {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="#fcfcfa">
                  <polygon points="5,3 19,12 5,21" />
                </svg> */}
          {/* <FaPlay className=" text-white h-5 w-5" /> */}
          {/* Play */}
        </button>
      </div>
      <VideoModal
        open={modalOpen}
        url="https://youtube.com"
        onClose={() => setModalOpen(false)}
      />
      <span className="watch-label">Watch intro</span>
    </>
  );
}
