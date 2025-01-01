'use client';

import React, { useEffect } from 'react';
import { footerProps, publications } from '@/app/constants';
import AuthorHighlight from '@/components/Author';
import BackToTopButton from '@/components/BackToTop';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import Navbar from '@/components/NavBar';
import PublicationCard from '@/components/PublicationCard';
import WhyBuyBooks from '@/components/WhyBuyBooks';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const Publication = () => {
  const { id } = useParams();
  const router = useRouter();
  const publication = publications.find(publication => publication.id == id);

  useEffect(() => {
    if (publication === undefined) {
      router.push('/publications');
    }
  }, [publication, router]);

  const morePublications =
    publications.length > 4 ? publications.slice(0, 4) : publications;

  return (
    publication !== undefined && (
      <>
        <Navbar />
        <HeroSection backgroundImage="/pub_hero_img.jpg" />
        <div className="max-container padding-container w-4/5 relative -top-10">
          <div className="bg-[#F5F2F0] py-3 rounded-t-[12px]"></div>
          <div className="bg-white flex *:w-full gap-x-6 gap-y-3 p-4 md:p-6 lg:px-8 lg:py-10">
            <Image
              width={5}
              height={7}
              layout="responsive"
              className="max-lg:hidden"
              src={publication.imageUrl}
              alt={publication.title}
            />
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2 lg:gap-y-4">
                <p className="font-light">OUR PUBLICATION</p>
                <div className="grid gap-y-3">
                  <h2 className="text-main-50 font-semibold text-2xl lg:text-5xl">
                    {publication.title}
                  </h2>
                </div>
                <h3 className="text-lg lg:text-2xl">{publication.price}</h3>
                <p>{publication.desc}</p>
              </div>
              <div className="flex flex-col max-lg:flex-col-reverse gap-y-6">
                <button className="flex max-sm:justify-center max-w-56 w-full sm:w-3/4 max-lg:mx-auto items-center justify-between bg-purple-50 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-purple-700">
                  <span className="text-base font-medium lg:text-lg">
                    BUY YOUR COPY NOW
                  </span>
                  <ArrowRight
                    strokeWidth={3}
                    absoluteStrokeWidth
                    className="size-4 max-sm:hidden text-white"
                  />
                </button>
                <div>
                  <p className="uppercase text-main-50 font-medium text-base lg:text-lg">
                    Feature of the book
                  </p>
                  <ul className="*:pt-2">
                    <li>
                      <span className="font-medium">Book Type: </span>
                      <span>{publication.bookType}</span>
                    </li>
                    <li>
                      <span className="font-medium">Language: </span>
                      <span>{publication.language}</span>
                    </li>
                    <li>
                      <span className="font-medium">Paperback: </span>
                      <span>{publication.pagination}</span>
                    </li>
                    <li>
                      <span className="font-medium">Dimension: </span>
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
