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
      className={`relative bg-cover lg:px-20 py-32 flex px-6 items-center justify-start ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black-50 bg-opacity-50"></div>
      {children}
    </div>
  );
};
