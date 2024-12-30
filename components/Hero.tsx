import React from 'react';

interface HeroSectionProps {
  backgroundImage?: string;
  children: React.ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  children,
  backgroundImage = '/hero-bg.svg',
}) => {
  return (
    <div
      className="relative h-screen max-h-[800px] bg-cover lg:p-20 flex p-6 items-center justify-start"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black-50 bg-opacity-50"></div>
      {children}
    </div>
  );
};
