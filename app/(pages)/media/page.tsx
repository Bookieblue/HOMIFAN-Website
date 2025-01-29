import React from 'react';
import { footerProps, mediaData } from '@/app/constants';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import JoinUsSection from '@/components/JoinUs';
import Navbar from '@/components/NavBar';
import BackToTopButton from '@/components/BackToTop';
import { HeroContent } from '@/components/HeroContent';
import VideoDisplay from '@/components/VideoDisplay';
import { videoDisplayData } from '.';
import MediaList from './components/MediaList';

const Media: React.FC = () => {
  const { heading, text, videoUrl } = videoDisplayData;
  return (
    <>
      <Navbar />
      <HeroSection className="80svh">
        <HeroContent {...mediaData} />
      </HeroSection>
      <div className="padding-container max-container">
        <div className="py-10 px-4 my-10">
          <div className="text-center mb-8 md:w-1/2 mx-auto grid gap-2">
            <h1 className="md:text-4xl lg:text-5xl text-3xl text-balance font-bold uppercase">
              {heading}
            </h1>
            <p className="text-base md:text-lg mt-2">{text}</p>
          </div>
          <VideoDisplay videoUrl={videoUrl} />
        </div>
        <MediaList />
      </div>
      <JoinUsSection />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </>
  );
};

export default Media;
