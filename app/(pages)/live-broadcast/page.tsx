import FacebookLiveVideo from "@/components/FacebookLiveVideo";
import { footerProps, JoinLiveData,} from '@/app/constants';
import FooterSection from '@/components/Footer';
import JoinUsSection from '@/components/JoinUs';
import React from 'react';
import Navbar from '@/components/NavBar';
import BackToTopButton from '@/components/BackToTop';
import { HeroSection } from "@/components/Hero";
import { HeroContent } from "@/components/HeroContent";


export default function LivePage() {
  return (
    <div>
    <Navbar />
    <HeroSection>
        <HeroContent {...JoinLiveData} />
    </HeroSection>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Live Service</h1>
      <FacebookLiveVideo videoUrl="https://www.facebook.com/YOUR_PAGE/videos/YOUR_LIVE_VIDEO_ID/" />
    </div>
    <JoinUsSection />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </div>
  );
}
