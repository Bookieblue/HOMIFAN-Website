import React from 'react';
import { PlayIcon } from 'lucide-react';
import Image from 'next/image';

const VideoDisplay = ({
  text,
  heading,
  subHeading,
  imageUrl = '/hero-bg.svg',
}: {
  text?: string;
  heading?: string;
  imageUrl?: string;
  subHeading?: string;
}) => {
  return (
    <>
      {(subHeading || heading || text) && (
        <div className="text-center mb-8 mx-auto grid gap-2 md:w-1/2">
          {subHeading && (
            <h4 className="uppercase max-md:text-sm tracking-widest">
              {subHeading}
            </h4>
          )}
          {heading && (
            <h1 className="md:text-4xl text-3xl text-balance font-bold uppercase">
              {heading}
            </h1>
          )}
          {text && <p className="text-base lg:text-lg mt-2">{text}</p>}
        </div>
      )}
      {/* Video Container */}
      <div className="relative w-full lg:h-auto border border-black-50 p-3 rounded-lg overflow-hidden">
        {/* Background Image */}
        <Image
          width={16}
          height={9}
          src={imageUrl}
          layout="responsive"
          className="w-full h-full rounded-lg object-cover"
          alt="Experience the Life at House of Prayer Ministries"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="bg-white-50 text-white px-3.5 py-5 border-4 border-[#ACAABC]/40 rounded-full flex items-center justify-center"
            aria-label="Play Video"
          >
            <div className="bg-red-500 rounded-lg px-3 p-1.5">
              <PlayIcon className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoDisplay;