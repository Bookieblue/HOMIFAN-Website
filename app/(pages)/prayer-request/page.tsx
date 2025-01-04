import {
    footerProps,
    givingData,
    prayerData,
  } from "@/app/constants";
  import FooterSection from "@/components/Footer";
  import { HeroSection } from "@/components/Hero";
  import React from "react";
  import Navbar from "@/components/NavBar";
import BackToTopButton from "@/components/BackToTop";
import PrayerRequestForm from "@/components/forms/prayer";
import { HeroContent } from "@/components/HeroContent";

  const page = () => {
    return (
      <div>
        <Navbar />
        <HeroSection>
          <HeroContent {...prayerData} />
        </HeroSection>
        <PrayerRequestForm />
        <FooterSection {...footerProps} />
        <BackToTopButton />
      </div>
    );
  };
  
  export default page;
  