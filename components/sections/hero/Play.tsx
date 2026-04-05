"use client";
import { useState } from "react";
import VideoModal from "./videoModal";
import { FaPlay } from "react-icons/fa6";

export function Play({onClick}: {onClick?: () => void}) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="play-btn-wrap">
        <span className="play-ring"></span>
        <span className="play-ring"></span>
        <button
          className="play-btn "
          id="playBtn"
          onClick={onClick}
          aria-label="Watch intro video"
        >
          {/* <svg className="zIndex: 2;" width="20" height="20" viewBox="0 0 24 24" fill="#fcfcfa">
                  <polygon points="5,3 19,12 5,21" />
                </svg> */}
          <FaPlay className=" text-[#fcfcfa] h-5 w-5" />
          {/* Play */}
        </button>
      </div>
      
      {/* <span className="watch-label">Watch intro</span> */}
    </>
  );
}
