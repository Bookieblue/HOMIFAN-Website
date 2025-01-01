import React from 'react';
import { footerProps, mediaData } from '@/app/constants';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import JoinUsSection from '@/components/JoinUs';
import Navbar from '@/components/NavBar';
import BackToTopButton from '@/components/BackToTop';
import { HeroContent } from '@/components/HeroContent';
import VideoDisplay from '@/components/VideoDisplay';
import { MediaCard, mediaCardData, videoDisplayData } from '.';

const Media: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection>
        <HeroContent {...mediaData} />
      </HeroSection>
      <div className="padding-container max-container">
        <div className=" py-10 px-4 my-10">
          <VideoDisplay {...videoDisplayData} />
        </div>
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mediaCardData.map(data => (
            <MediaCard key={data.id} {...data} />
          ))}
        </div>
      </div>
      <JoinUsSection />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </div>
  );
};

export default Media;
