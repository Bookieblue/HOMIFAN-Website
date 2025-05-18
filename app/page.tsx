'use client'
import FooterSection from '@/components/Footer';
import {
  footerProps,
  founderCardProps,
  heroData,
  videoDisplayData,
} from './constants/index';
import JoinUsSection from '@/components/JoinUs';
import Testimonials from '@/components/Testimonials';
import { UpcomingEvents } from '@/components/UpcomingEvents';
import MomentsGallery from '@/components/MomentGallery';
import StayUpToDateSection from '@/components/StayUpToDate';
import DonateSection from '@/components/Donate';
import ChurchSection from '@/components/Branches';
import Navbar from '@/components/NavBar';
import { FounderGreeting } from '@/components/FounderGreetings';
import { HeroSection } from '@/components/Hero';
import BackToTopButton from '@/components/BackToTop';
import { HeroContent } from '@/components/HeroContent';
import VideoDisplay from '@/components/VideoDisplay';
import { useEffect, useState } from 'react';

export default function Home() {
  const { subHeading, heading, videoUrl } = videoDisplayData;
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';




  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/events?page=1&limit=20`);
        if (!response.ok) throw new Error('Failed to fetch events');

        const data = await response.json();
        let sortedEvents = data?.data?.events ?? [];

        // Sort events by date (oldest to newest)
        sortedEvents = sortedEvents.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setEvents(sortedEvents);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection>
        <HeroContent {...heroData} />
      </HeroSection>
      <FounderGreeting {...founderCardProps} />
      <div className="flex flex-col items-center pb-20 px-4 padding-container max-container">
        <div className="text-center mb-8 mx-auto grid gap-2 w-[60%]">
          <h4 className="uppercase max-md:text-sm tracking-widest">
            {subHeading}
          </h4>
          <h1 className="md:text-4xl lg:text-5xl text-3xl text-balance font-bold uppercase">
            {heading}
          </h1>
        </div>
        <VideoDisplay link={videoUrl} autoPlay loop showControls={false}/>
      </div>
      <ChurchSection />
      <StayUpToDateSection />
      <DonateSection />
      <MomentsGallery />

      {/* Pass the first event if available, otherwise don't render */}
      {events.length > 0 && <UpcomingEvents eventId={events[0].id} event={events[0]} />}

      <Testimonials />
      <JoinUsSection />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </>
  );
}
