import React from 'react';
import { footerProps, publications, publicationData } from '@/app/constants';
import AuthorHighlight from '@/components/Author';
import BackToTopButton from '@/components/BackToTop';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import Navbar from '@/components/NavBar';
import PublicationCard from '@/components/PublicationCard';
import WhyBuyBooks from '@/components/WhyBuyBooks';

const Publication: React.FC = () => {
  const morePublications =
    publications.length > 4 ? publications.slice(0, 4) : publications;

  return (
    <>
      <Navbar />
      <HeroSection {...publicationData} />
      <AuthorHighlight />

      <div className="max-container padding-container p-6">
        <h1 className="text-center uppercase">Our books</h1>
        <p className="uppercase max-w-lg mx-auto text-4xl font-bold text-center text-[#161722] mb-5 mt-3">
          Explore our other publications
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {morePublications.map((pub, index) => (
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

export default Publication;
