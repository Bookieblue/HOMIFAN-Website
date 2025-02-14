'use client'
import { eventsData, footerProps } from '@/app/constants';
import BackToTopButton from '@/components/BackToTop';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import { HeroContent } from '@/components/HeroContent';
import JoinUsSection from '@/components/JoinUs';
import Navbar from '@/components/NavBar';
import { UpcomingEvents } from '@/components/UpcomingEvents';
import React, { useEffect, useState } from 'react';
import Events from './components/Events';

const Page = () => {
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

        // Ensure the upcoming event is first (assuming events have a `date` field)
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
    <div>
      <Navbar />
      <HeroSection>
        <HeroContent {...eventsData} />
      </HeroSection>
      {events.length > 0 && <UpcomingEvents event={events[0]} eventId={events[0].id} />} {/* Passing the first event */}
      <Events events={events} loading={loading} error={error} />
      <JoinUsSection />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </div>
  );
};

export default Page;
