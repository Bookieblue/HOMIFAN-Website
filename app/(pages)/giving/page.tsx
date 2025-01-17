import React from 'react';
import Navbar from '@/components/NavBar';
import Giving from '@/components/forms/giving';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import JoinUsSection from '@/components/JoinUs';
import BackToTopButton from '@/components/BackToTop';
import { HeroContent } from '@/components/HeroContent';
import { footerProps, givingData } from '@/app/constants';

const page: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection>
        <HeroContent {...givingData} />
      </HeroSection>
      <Giving />
      <JoinUsSection />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </div>
  );
};

export default page;
