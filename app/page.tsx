import FooterSection from "@/components/Footer";
import { footerProps, founderCardProps, heroData } from "./constants/index";
import JoinUsSection from "@/components/JoinUs";
import Testimonials from "@/components/Testimonials";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import MomentsGallery from "@/components/MomentGallery";
import StayUpToDateSection from "@/components/StayUpToDate";
import DonateSection from "@/components/Donate";
import ChurchSection from "@/components/Branches";
import Navbar from "@/components/NavBar";
import { FounderGreeting } from "@/components/FounderGreetings";
import ExperienceSection from "@/components/VideoExperience";
import { HeroSection } from "@/components/Hero";
import BackToTopButton from "@/components/BackToTop";
import { HeroContent } from "@/components/HeroContent";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroSection>
        <HeroContent {...heroData} />
      </HeroSection>
      <FounderGreeting  {...founderCardProps} />
      <ExperienceSection />
      <ChurchSection />
      <StayUpToDateSection />
      <DonateSection />
      <MomentsGallery />
      <UpcomingEvents />
      <Testimonials />
      <JoinUsSection />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </div>
  );
}
