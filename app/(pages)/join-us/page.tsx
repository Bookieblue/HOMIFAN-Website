import {
    footerProps,
    JoinusData,
  } from "@/app/constants";
  import FooterSection from "@/components/Footer";
  import { HeroSection } from "@/components/Hero";
  import JoinUsSection from "@/components/JoinUs";
  import React from "react";
  import Navbar from "@/components/NavBar";
import BackToTopButton from "@/components/BackToTop";
import WeeklySchedule from "@/components/WeeklySchedule";
import MembershipForm from "@/components/forms/membership";


  
  const page = () => {
    return (
      <div>
        <Navbar />
        <HeroSection {...JoinusData} />
        <WeeklySchedule />
        <MembershipForm />
        <JoinUsSection />
        <FooterSection {...footerProps} />
        <BackToTopButton />
      </div>
    );
  };
  
  export default page;
  