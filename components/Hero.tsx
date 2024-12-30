"use client"
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string; 
  prayerText?: string; 
  backgroundImage: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  prayerText,
  backgroundImage,
}) => {
  const router = useRouter();

  const handleCTAClick = () => {
    router.push('/join-us'); 
  };

  const handlePrayerClick = () => {
    router.push('/prayer-request'); 
  };

  return (
    <div
      className="relative h-screen max-h-[800px] bg-cover lg:p-20 flex p-6 items-center justify-start"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black-50 bg-opacity-50"></div>
      <div className="relative z-10 lg:w-[50%] text-start text-white-50 mt-10">
        <p className="text-xl md:text-2xl mb-5 lg:mb-8">{subtitle}</p>
        <h1 className="text-3xl md:text-6xl font-bold mb-4">{title}</h1>

        <div className="lg:flex-row flex flex-col gap-3">
          {ctaText && (
            <button
              onClick={handleCTAClick}
              className="border flex items-center justify-center gap-3 text-white-50 font-bold py-2 px-4 rounded-lg"
            >
              {ctaText} <ArrowRight className="size-4" />
            </button>
          )}
          {prayerText && (
            <button
              onClick={handlePrayerClick}
              className="bg-white-50 text-black-50 hover:bg-gray-100 font-bold py-2 px-4 rounded-lg"
            >
              {prayerText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
