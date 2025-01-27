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
import Heading from '@/components/Heading';
import BtnDropdown from './PublicationModal';

const Publication: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
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
        <HeroSection
          className="h-[50svh]"
          backgroundImage="/pub_hero_img.jpg"
        />
        <div className="max-container text-main-50 padding-container px-6 relative -top-14">
          <div className="bg-gray-100 py-3 rounded-t-[12px]"></div>
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
                  <h2 className="font-bold text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    {publication.title}
                  </h2>
                </div>
                <h3 className="text-lg md:text-xl font-semibold lg:text-2xl">
                  NGN {publication.price}
                </h3>
                <p>{publication.desc}</p>
              </div>
              <div className="flex flex-col max-lg:flex-col-reverse gap-y-6">
                <BtnDropdown />
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
          <Heading
            className="mb-5"
            heading="Explore our other publications"
            subHeading="Our books"
          />
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
