import { footerProps, JoinusData } from '@/app/constants';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import JoinUsSection from '@/components/JoinUs';
import React from 'react';
import Navbar from '@/components/NavBar';
import BackToTopButton from '@/components/BackToTop';
import WeeklySchedule from '@/components/WeeklySchedule';
import { HeroContent } from '@/components/HeroContent';
import MembershipForm from '@/components/forms/join-us';

const page: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection>
        <HeroContent {...JoinusData} />
      </HeroSection>
      <WeeklySchedule />
      <MembershipForm />
      <JoinUsSection />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </div>
  );
};

export default page;
