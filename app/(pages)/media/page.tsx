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
  return (
    <>
      <Navbar />
      <HeroSection className='80svh'>
        <HeroContent {...mediaData} />
      </HeroSection>
      <div className="padding-container max-container">
        <div className="py-10 px-4 my-10">
          <VideoDisplay {...videoDisplayData} />
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
