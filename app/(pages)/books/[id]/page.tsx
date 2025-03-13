'use client';

import React, { useEffect, useState } from 'react';
import { footerProps } from '@/app/constants';
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

interface Publication {
  description: ReactNode;
  coverImage: string | StaticImport;
  id: string;
  title: string;
  desc: string;
  price: string;
  bookType: string;
  language: string;
  pagination: string;
  dimension: string;
  imageUrl: string;
}

const Publication: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [publication, setPublication] = useState<Publication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPublication = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`https://homifan-website.vercel.app/api/books/${id}`);
        if (!response.ok) throw new Error('Failed to fetch publication');

        const data: Publication = await response.json();
        setPublication(data);
      } catch (error) {
        console.error('Error fetching publication:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [id]);


  console.log("pub", publication)

  if (loading) return <p className="text-center text-gray-600">Loading publication...</p>;
  if (error) return <p className="text-center text-red-500">Error loading publication. Try again later.</p>;
  if (!publication) return <p className="text-center text-gray-600">Publication not found.</p>;

  return (
    <>
      <Navbar />
      <HeroSection className="h-[50svh]" backgroundImage="/pub_hero_img.jpg" />
      <div className="max-container text-main-50 padding-container px-6 relative -top-14">
        <div className="bg-gray-100 py-3 rounded-t-[12px]"></div>
        <div className="bg-white flex *:w-full gap-x-6 gap-y-3 p-4 md:p-6 lg:px-8 lg:py-10">
          <div className="max-lg:hidden relative w-full min-h-[500px]">
            <div className="relative w-full h-full">
              <Image
                fill
                className="object-fill"
                src={publication.coverImage}
                alt={publication.title}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-6">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              {publication.title}
            </h2>
            <h3 className="text-lg md:text-xl font-semibold lg:text-2xl">
              NGN {publication.price}
            </h3>
            <p>{publication.description}</p>
            <BtnDropdown />
          </div>
        </div>
      </div>
      <AuthorHighlight />
      <div className="max-container padding-container p-6">
        <Heading heading="Explore our other publications" subHeading="Our books" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* {morePublications.map((pub, index) => (
            <PublicationCard
              key={index}
              id={pub.id}
              title={pub.title}
              desc={pub.desc}
              price={pub.price}
              imageUrl={pub.imageUrl}
            />
          ))} */}
        </div>
      </div>
      <WhyBuyBooks />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </>
  );
};

export default Publication;
