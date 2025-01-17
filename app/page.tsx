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
  return (
    <>
      <Navbar />
      <HeroSection>
        <HeroContent {...heroData} />
      </HeroSection>
      <FounderGreeting {...founderCardProps} />
      <div className="flex flex-col items-center py-20 px-4 padding-container max-container">
        <VideoDisplay {...videoDisplayData} />
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
