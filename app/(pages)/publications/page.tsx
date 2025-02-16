import { footerProps, publications, publicationData } from '@/app/constants';
import AuthorHighlight from '@/components/Author';
import BackToTopButton from '@/components/BackToTop';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import { HeroContent } from '@/components/HeroContent';
import Navbar from '@/components/NavBar';
import PublicationCard from '@/components/PublicationCard';
import WhyBuyBooks from '@/components/WhyBuyBooks';
import React from 'react';

const Publications: React.FC = () => {

  
  return (
    <>
      <Navbar />
      <HeroSection backgroundImage="/pub_hero_img.jpg">
        <HeroContent {...publicationData} />
      </HeroSection>
      <AuthorHighlight />
      <div className="max-container padding-container p-6">
        <h1 className="text-center uppercase">Our books</h1>
        <p className="uppercase text-4xl font-bold text-center text-[#161722] mb-5 mt-3">
          Explore our Christian publications
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {publications.map((pub, index) => (
            <PublicationCard
              key={index}
              id={pub.id}
              title={pub.title}
              desc={pub.desc}
              price={pub.price}
              imageUrl={pub.imageUrl}
            />
          ))}
        </div>
      </div>
      <WhyBuyBooks />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </>
  );
};

export default Publications;
