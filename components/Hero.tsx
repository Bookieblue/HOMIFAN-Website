import React from 'react';

interface HeroSectionProps {
  className?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  children,
  className = 'h-screen',
  backgroundImage = '/hero-bg.svg',
}) => {
  return (
    <div
      className={`relative bg-cover bg-center  lg:h-[600px] py-32 flex px-6 items-center justify-start ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black-50 bg-opacity-50"></div>
      <div className="relative z-10 w-full max-w-[1440px] mx-auto pl-0 lg:pl-10 2xl:pl-20">
        {children}
      </div>
    </div>
  );
};
