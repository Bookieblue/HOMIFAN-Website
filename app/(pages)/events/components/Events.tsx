import React from 'react';
import EventCard from './EventCard';
import Heading from '@/components/Heading';
import { events } from './constants';

const Events: React.FC = () => {
  return (
    <div className="py-6 max-container padding-container pb-20">
      <Heading
        className="pb-12"
        heading="View All Events"
        subHeading="Don't Miss Out"
      />
      <div className="grid gap-x-4 gap-y-16 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <EventCard key={event.id} index={index} {...event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
