import {
    articlesData,
    footerProps,
  } from "@/app/constants";
  import FooterSection from "@/components/Footer";
  import { HeroSection } from "@/components/Hero";
  import JoinUsSection from "@/components/JoinUs";
  import React from "react";
  import Navbar from "@/components/NavBar";
import { ArticlePage } from "./components/Articles";
import BackToTopButton from "@/components/BackToTop";
  
  const page = () => {
    return (
      <div>
        <Navbar />
        <HeroSection {...articlesData} />
        <ArticlePage />
        <JoinUsSection />
        <FooterSection {...footerProps} />
        <BackToTopButton />
      </div>
    );
  };
  
  export default page;
  