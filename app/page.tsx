import FooterSection from '@/components/Footer';
import {
  footerProps,
  founderCardProps,
  heroData,
  videoDisplayData,
} from './constants/index';
import JoinUsSection from '@/components/JoinUs';
import Testimonials from '@/components/Testimonials';
import { UpcomingEvents } from '@/components/UpcomingEvents';
import MomentsGallery from '@/components/MomentGallery';
import StayUpToDateSection from '@/components/StayUpToDate';
import DonateSection from '@/components/Donate';
import ChurchSection from '@/components/Branches';
import Navbar from '@/components/NavBar';
import { FounderGreeting } from '@/components/FounderGreetings';
import { HeroSection } from '@/components/Hero';
import BackToTopButton from '@/components/BackToTop';
import { HeroContent } from '@/components/HeroContent';
import VideoDisplay from '@/components/VideoDisplay';

export default function Home() {
  const { subHeading, heading, videoUrl } = videoDisplayData;
  return (
    <>
      <Navbar />
      <HeroSection>
        <HeroContent {...heroData} />
      </HeroSection>
      <FounderGreeting {...founderCardProps} />
      <div className="flex flex-col items-center py-20 px-4 padding-container max-container">
        <div className="text-center mb-8 mx-auto grid gap-2 md:w-1/2">
          <h4 className="uppercase max-md:text-sm tracking-widest">
            {subHeading}
          </h4>
          <h1 className="md:text-4xl lg:text-5xl text-3xl text-balance font-bold uppercase">
            {heading}
          </h1>
        </div>
        <VideoDisplay videoUrl={videoUrl} />
      </div>
      <ChurchSection />
      <StayUpToDateSection />
      <DonateSection />
      <MomentsGallery />
      <UpcomingEvents />
      <Testimonials />
      <JoinUsSection />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </>
  );
}
