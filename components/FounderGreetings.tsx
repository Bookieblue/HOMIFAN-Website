import Image from 'next/image';
import React from 'react';

interface HeroCardProps {
  title: string;
  name: string;
  description: string;
  missionTitle: string;
  missionTexts: string[]; // Updated to accept an array of quotes
  imageSrc: string;
}

export const FounderGreeting: React.FC<HeroCardProps> = ({
  title,
  name,
  description,
  missionTitle,
  missionTexts,
  imageSrc,
}) => {
  return (
    <section className="lg:p-16">
      <div className="container bg-white py-10 lg:my-0 mx-auto flex flex-col lg:flex-row items-center justify-between gap-8  padding-container">
        {/* Left Section: Introduction Text */}
        <div className="lg:w-[30%] text-black bg-white">
          <h4 className="uppercase text-sm text-gray-500">{title}</h4>
          <h2 className="text-xl lg:text-3xl font-bold my-4">{name}</h2>
          <p className="text-gray-600 mb-6">{description}</p>
        </div>

        {/* Center Section: Image */}
        <div className="lg:w-[40%]">
          <img
            src={imageSrc}
            alt={name}
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
        </div>

        {/* Right Section: Mission Statement with Multiple Quotes */}
        <div className="lg:w-[30%] relative bg-[#EDEAFE] p-8 rounded-lg shadow-lg border-l-4 border-purple-500">
          <h4 className="text-purple-500 font-bold">{missionTitle}</h4>
          {missionTexts.map((quote, index) => (
            <p key={index} className="text-black mt-2">
              "{quote}"
            </p>
          ))}
          <Image
            src="/quote2.svg"
            width={40}
            height={10}
            alt="chevron"
            className="absolute right-10 top-6"
          />
        </div>
      </div>
    </section>
  );
};
