import { contactData, footerProps } from '@/app/constants';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import JoinUsSection from '@/components/JoinUs';
import React from 'react';
import Navbar from '@/components/NavBar';
import BackToTopButton from '@/components/BackToTop';
import { HeroContent } from '@/components/HeroContent';
import Contact from '@/components/forms/contact-us';
import Biography from '@/components/Biography';

const page = () => {
  return (
    <div>
      <Biography />
      <JoinUsSection />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </div>
  );
};

export default page;
