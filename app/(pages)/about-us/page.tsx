import {
  aboutFounderCardProps,
  aboutUsData,
  footerProps,
  historyData,
  leadershipData,
  missionVisionData,
} from "@/app/constants";
import FooterSection from "@/components/Footer";
import { FounderGreeting } from "@/components/FounderGreetings";
import { HeroSection } from "@/components/Hero";
import History from "@/components/History";
import JoinUsSection from "@/components/JoinUs";
import Leadership from "@/components/Leadership";
import MissionVision from "@/components/MissionVision";
import React from "react";
import Navbar from "@/components/NavBar";
import BackToTopButton from "@/components/BackToTop";
import { HeroContent } from "@/components/HeroContent";
import Biography from "@/components/Biography";

const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection>
        <HeroContent {...aboutUsData} />
      </HeroSection>
      <FounderGreeting {...aboutFounderCardProps} />
      <History {...historyData} />
      <MissionVision {...missionVisionData} />
      <Leadership {...leadershipData} />

      <Biography />
      <JoinUsSection />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </div>
  );
};

export default page;
