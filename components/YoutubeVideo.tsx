'use client';
import { PlayIcon } from 'lucide-react';
import React, { useState } from 'react';

interface VideoDisplayProps {
  link: string;
  autoPlay?: boolean;
  loop?: boolean;
  showControls?: boolean;
}

const YoutubeVideoDisplay: React.FC<VideoDisplayProps> = ({
  link,
  autoPlay = false,
  loop = false,
  showControls = true,
}) => {
  const [isPlaying, setPlaying] = useState(autoPlay);
  const isYouTubeLink = link?.includes("youtube.com") || link?.includes("youtu.be");

  const getEmbedUrl = (link: string) => {
    let videoId = '';
    if (link.includes('youtu.be/')) {
      videoId = link.split('youtu.be/')[1];
    } else if (link.includes('watch?v=')) {
      videoId = link.split('watch?v=')[1];
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <div className="relative w-full border border-black-50 rounded-lg overflow-hidden">
      {isYouTubeLink ? (
        isPlaying ? (
          <iframe
            src={getEmbedUrl(link)}
            className="w-full h-[300px] lg:h-[500px] rounded-2xl"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="relative">
            {/* YouTube Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${getEmbedUrl(link).split('/embed/')[1].split('?')[0]}/hqdefault.jpg`}
              alt="YouTube thumbnail"
              className="w-full h-[300px]  lg:h-[500px] object-cover rounded-2xl"
            />
            {/* Overlay + Play Button */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <button
                onClick={() => setPlaying(true)}
                className="bg-white-50 text-white px-3.5 py-5 border-4 border-[#ACAABC]/40 rounded-full flex items-center justify-center"
                aria-label="Play Video"
              >
                <div className="bg-red-500 rounded-lg px-3 p-1.5">
                  <PlayIcon className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        )
      ) : (
        <video
          src={link}
          controls={showControls}
          muted={autoPlay}
          autoPlay={autoPlay}
          loop={loop}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="p-3 w-full h-full object-cover rounded-2xl"
        />
      )}
    </div>
  );
};

export default YoutubeVideoDisplay;
