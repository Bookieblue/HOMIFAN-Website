import React from 'react';
import { Clock, Search } from 'lucide-react';
import { Event } from '@/components/UpcomingEvents';
import { bgColors } from './constants';
import FormattedDay from '@/components/FormatDay';
import FormattedTime from '@/components/FormatTime';
import FormattedMonth from '@/components/FormatMonth';
import FormattedDate from '@/components/FormatDate';

const EventCard: React.FC<Event & { index: number }> = ({
  time,
  date,
  index,
  month,
  title,
  channel,
  description,
  location,
}) => {
  const bgColor = bgColors[index];
  const color = index % 2 === 0 ? 'black' : 'white';

  return (
    <div className="bg-purple-10 relative border border-purple-50 grid gap-4 md:gap-6 hover:shadow-lg rounded-lg p-6 pt-8 md:px-12 text-main-50">
      <div
        style={{ backgroundColor: bgColor, color: color }}
        className="rounded-full shadow-md -left-4 md:-left-6 md:-top-5 -top-8 absolute pt-1 pb-2.5 text-center px-5"
      >
        <h2 className="text-lg md:text-xl relative top-2 lg:text-2xl font-bold">
       <FormattedDate dateString={date} />
        </h2>
        <p className="text-base md:text-lg"> <FormattedMonth dateString={date} /> </p>
      </div>
      <div className="grid gap-2">
        <h2 className="font-bold uppercase text-xl md:text-2xl">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="grid gap-4">
        <div className="flex gap-3 items-center">
          <Clock size={20} />
          <p> <FormattedDay dateString={date} /> -  <FormattedTime timeString={time} /></p>
        </div>
        <div className="flex gap-3 items-center">
          <Search className="rotate-45" size={20} />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
