import {
    footerProps,
    givingData,
  } from "@/app/constants";
  import FooterSection from "@/components/Footer";
  import { HeroSection } from "@/components/Hero";
  import JoinUsSection from "@/components/JoinUs";
  import React from "react";
  import Navbar from "@/components/NavBar";
import BackToTopButton from "@/components/BackToTop";
import Giving from "@/components/forms/giving";
  
  const page = () => {
    return (
      <div>
        <Navbar />
        <HeroSection {...givingData} />
        <Giving />
        <JoinUsSection />
        <FooterSection {...footerProps} />
        <BackToTopButton />
      </div>
    );
  };
  
  export default page;
  