import React from 'react';
import EventCard from './EventCard';
import Heading from '@/components/Heading';
import { eventCardData } from './constants';

const Events: React.FC = () => {
  const colors = ['#FFD0A0', '#695CAE', '#FFFFFF'];

  return (
    <div className="py-6 max-container padding-container pb-20">
      <Heading
        className="pb-8"
        heading="View All Events"
        subHeading="Don't Miss Out"
      />
      <div className="grid gap-x-4 gap-y-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {eventCardData.map(event => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
