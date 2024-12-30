import { PlayIcon } from 'lucide-react';
import React from 'react';


const ExperienceSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center py-20 px-4  padding-container max-container ">
      {/* Heading */}
      <div className="text-center w-[80%] mb-8">
        <p className=" text-black-50">WITNESS OUR SERVICE</p>
        <h2 className=" font-bold text-3xl lg:text-5xl text-black-50 mt-2">
          EXPERIENCE THE LIFE AT HOUSE OF PRAYER MINISTRIES
        </h2>
      </div>

      {/* Video Container */} 
      <div className="relative w-full h-[300px] lg:h-auto  border border-black-50 p-3 rounded-lg overflow-hidden shadow-lg">
        {/* Background Image */}
        <img
          src="/hero-bg.svg" 
          alt="Experience the Life at House of Prayer Ministries"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="bg-white-50 text-white p-4 rounded-full flex items-center justify-center"
            aria-label="Play Video"
          >
            <PlayIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
