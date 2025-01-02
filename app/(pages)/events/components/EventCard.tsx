import { Clock, Search } from 'lucide-react';
import React from 'react';

interface EventCardProps {
  day: string;
  date: string;
  title: string;
  channel: string;
  endTime: string;
  startTime: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({
  day,
  date,
  title,
  channel,
  endTime,
  startTime,
  description,
}) => {
  return (
    <div className="bg-purple-10 border border-purple-50 grid gap-4 md:gap-6 hover:shadow-lg rounded-lg py-4 px-6 md:py-8 md:px-12 text-main-50">
      <div className="grid gap-2">
        <h2 className="font-bold text-xl md:text-2xl">{title}</h2>
        <p>
          Join us as we seek to learn how to be God&apos;s own on{' '}
          <span className="font-semibold">{date}</span> as we always do.
        </p>
      </div>
      <div className="grid gap-4">
        <div className="flex gap-3 items-center">
          <Clock size={20} />
          <div className="flex gap-1">
            <p>{day}</p>
            <p>
              <span>{startTime}</span> - <span>{endTime}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Search className="rotate-45" size={20} />
          <span>{channel}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
