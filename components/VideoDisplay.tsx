'use client';
import { PlayIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';

const VideoDisplay = ({ videoUrl }: { videoUrl: string }) => {
  const [isPlaying, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  const handlePause = () => {
    setPlaying(false);
    videoRef.current?.pause();
  };

  return (
    <div className="relative w-full border border-black-50 rounded-lg overflow-hidden">
      <video
        controls
        ref={videoRef}
        src={videoUrl}
        onPlay={handlePlay}
        onPause={handlePause}
        className="p-3 w-full h-full object-cover rounded-2xl"
      />

      {!isPlaying && (
        <>
          {/* Dark Overlay */}
          <div className="m-3 absolute inset-0 bg-[black] bg-opacity-40"></div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="bg-white-50 text-white px-3.5 py-5 border-4 border-[#ACAABC]/40 rounded-full flex items-center justify-center"
              aria-label="Play Video"
            >
              <div className="bg-red-500 rounded-lg px-3 p-1.5">
                <PlayIcon className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoDisplay;
