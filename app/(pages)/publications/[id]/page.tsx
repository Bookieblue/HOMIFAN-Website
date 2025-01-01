'use client';

import React, { useState } from 'react';
import { footerProps, publications } from '@/app/constants';
import AuthorHighlight from '@/components/Author';
import BackToTopButton from '@/components/BackToTop';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import Navbar from '@/components/NavBar';
import PublicationCard from '@/components/PublicationCard';
import WhyBuyBooks from '@/components/WhyBuyBooks';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import Redirect from '@/components/Redirect';

const Publication: React.FC = () => {
  const { id } = useParams();
  const [] = useState(false)
  const publication = publications.find(publication => publication.id == id);

  Redirect(publication, '/publications');

  const morePublications =
    publications.length > 4 ? publications.slice(0, 4) : publications;

  return (
    publication !== undefined && (
      <>
        <Navbar />
        <HeroSection
          className="h-[50svh]"
          backgroundImage="/pub_hero_img.jpg"
        />
        <div className="max-container text-main-50 padding-container px-6 relative -top-12">
          <div className="bg-[#F5F2F0] py-3 rounded-t-[12px]"></div>
          <div className="bg-white flex *:w-full gap-x-6 gap-y-3 p-4 md:p-6 lg:px-8 lg:py-10">
            <div className="max-lg:hidden relative w-full min-h-[500px]">
              <Image
                layout="fill"
                className="object-fill"
                src={publication.imageUrl}
                alt={publication.title}
              />
            </div>
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2.5">
                <p>OUR PUBLICATION</p>
                <div className="grid gap-y-3">
                  <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    {publication.title}
                  </h2>
                </div>
                <h3 className="text-lg md:text-xl font-semibold lg:text-2xl">
                  {publication.price}
                </h3>
                <p>{publication.desc}</p>
              </div>
              <div className="flex flex-col max-lg:flex-col-reverse gap-y-6">
                <button className="bg-purple-50 max-w-52 border-purple-50 text-white hover:font-bold py-2 px-4 flexCenter gap-2 relative rounded-lg">
                  BUY YOUR COPY NOW
                  <ChevronDown
                    strokeWidth={3}
                    absoluteStrokeWidth
                    className="size-4"
                  />
                </button>
                <div>
                  <p className="uppercase grid gap-y-2.5 font-semibold text-base lg:text-lg">
                    Feature of the book
                  </p>
                  <ul className="*:pt-2">
                    <li>
                      <span className="font-bold">Book Type: </span>
                      <span>{publication.bookType}</span>
                    </li>
                    <li>
                      <span className="font-bold">Language: </span>
                      <span>{publication.language}</span>
                    </li>
                    <li>
                      <span className="font-bold">Paperback: </span>
                      <span>{publication.pagination}</span>
                    </li>
                    <li>
                      <span className="font-bold">Dimension: </span>
                      <span>{publication.dimension}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AuthorHighlight />
        <div className="max-container padding-container p-6">
          <h1 className="text-center uppercase">Our books</h1>
          <p className="uppercase max-w-lg mx-auto text-4xl font-bold text-center text-[#161722] mb-5 mt-3">
            Explore our other publications
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    )
  );
};

export default Publication;
