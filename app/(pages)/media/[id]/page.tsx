'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/NavBar';
import Heading from '@/components/Heading';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import JoinUsSection from '@/components/JoinUs';
import { MediaCard } from '../components/MediaCard';
import VideoDisplay from '@/components/VideoDisplay';
import BackToTopButton from '@/components/BackToTop';
import { HeroContent } from '@/components/HeroContent';
import { mediaCardData } from '../components/constants';
import { footerProps, mediaData } from '@/app/constants';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

const SingleMediaPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [videoUrl] = useState<string | null>(
    searchParams.get('videoUrl')
  );
  const media = mediaCardData.find(media => media.id === id);

  const removeVideoUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('videoUrl');
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    if (media === undefined) {
      router.push('/media');
    } else {
      removeVideoUrl();
    }
  }, [media, router]);

  const moreMmedia =
    mediaCardData.length > 3 ? mediaCardData.slice(0, 3) : mediaCardData;

  return (
    media !== undefined && (
      <div className="relative">
        <Navbar />
        <HeroSection className="80svh">
          <HeroContent {...mediaData} />
        </HeroSection>
        <div className="padding-container max-container">
          <div className="py-10 px-4 my-10">
            <h1 className="md:text-4xl text-center mb-8 md:w-1/2 mx-auto lg:text-5xl text-3xl text-balance font-bold uppercase">
              {media.title}
            </h1>
            {videoUrl && <VideoDisplay videoUrl={videoUrl} />}
          </div>
          <div className="pb-20">
            <Heading
              className="py-6"
              subHeading="Related Media"
              heading="View More Content"
            />
            <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {moreMmedia.map(media => (
                <MediaCard key={media.id} {...media} />
              ))}
            </div>
          </div>
        </div>
        <JoinUsSection />
        <FooterSection {...footerProps} />
        <BackToTopButton />
      </div>
    )
  );
};

export default SingleMediaPage;
