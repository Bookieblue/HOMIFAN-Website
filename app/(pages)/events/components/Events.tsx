'use client';

import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import Heading from '@/components/Heading';
interface Event {
  id: string;
  date: string;
  time: string;
  month: string;
  title: string;
  description: string;
  channel:string;
  eventImage: string;
}

interface EventsProps {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const Events: React.FC<EventsProps> = ({ events, loading, error }) => {
  
  console.log('events', events)

  return (
    <div className="py-6 max-container padding-container pb-20">
      <Heading
        className="pb-12"
        heading="View All Events"
        subHeading="Don't Miss Out"
      />
      {loading ? (
        <div className="text-center text-gray-500">Loading events...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : Array.isArray(events) && events.length > 0 ? ( // ✅ Ensure `events` is an array
        <div className="grid gap-x-4 gap-y-16 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventCard location={''} key={event.id} index={index} {...event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center text-gray-500">
          <img
            src="/event-empty.svg"
            alt="No Events"
            className="w-[400px] h-[300px]"
          />
          <p className="text-lg font-semibold">No events available</p>
          <p className="mt-2">Check back later for upcoming events.</p>
        </div>
      )}
    </div>
  );
};

export default Events;
