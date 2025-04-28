'use client';
import { PlayIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface VideoDisplayProps {
  link: string;
  autoPlay?: boolean;
  loop?: boolean;
  showControls?: boolean;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({
  link,
  autoPlay = false,
  loop = false,
  showControls = true, // Default to true
}) => {
  const [isPlaying, setPlaying] = useState(autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play()
        .then(() => {
          setPlaying(true);
        })
        .catch(error => {
          console.error('Play failed:', error);
        });
    }
  };
  

  const handlePause = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };

  const isYouTubeLink = link?.includes("youtube.com") || link?.includes("youtu.be");


  return (
    <div className="relative w-full border border-black-50 rounded-lg overflow-hidden">
      {isYouTubeLink ? (
      <iframe
        src={link.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
        className="w-full h-[360px] rounded-2xl"
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    ) : (
      <video
        ref={videoRef}
        src={link}
        controls={showControls}
        muted={autoPlay}
        autoPlay={autoPlay}
        loop={loop}
        onCanPlay={autoPlay ? handlePlay : undefined}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="p-3 w-full h-full object-cover rounded-2xl"
      />
    )}

      {!isPlaying && !autoPlay && (
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
