import {
    contactData,
    footerProps,
  } from "@/app/constants";
  import FooterSection from "@/components/Footer";
  import { HeroSection } from "@/components/Hero";
  import JoinUsSection from "@/components/JoinUs";
  import React from "react";
  import Navbar from "@/components/NavBar";
import BackToTopButton from "@/components/BackToTop";
import ContactForm from "@/components/forms/contact-us";
  
  const page = () => {
    return (
      <div>
        <Navbar />
        <HeroSection {...contactData} />
        <ContactForm />
        <FooterSection {...footerProps} />
        <BackToTopButton />
      </div>
    );
  };
  
  export default page;