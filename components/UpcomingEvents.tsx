'use client';

import Link from 'next/link';
import Heading from './Heading';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, Clock, Search } from 'lucide-react';
import { events } from '@/app/(pages)/events/components/constants';
import Modal from './Modal';
import EventForm from './forms/event';

export interface Event {
  id: string;
  date: string;
  time: string;
  month: string;
  title: string;
  channel: string;
  description: string;
}

export const UpcomingEvents = () => {
  const event = events[0];
  const pathname = usePathname();

  let [style, setStyle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setStyle(
      'md:mx-auto right-0 left-0 md:w-1/2 rounded-xl m-4 px-4 py-6 md:px-6 bg-gray-100'
    );
  };

  return (
    <section className="py-16 padding-container max-container">
      <Heading
        subHeading="Upcoming Events"
        heading="Join us and become part of something great"
      />
      <div className="mx-auto pt-12 flex flex-col md:flex-row">
        {/* Left Section: Event Details */}
        <div className="lg:w-[30%] text-black-50 bg-purple-10 p-6 lg:p-12 shadow-md">
          <div className="mb-4 flex items-end gap-3">
            <div className="text-right">
              <h2 className="text-xl relative top-2 lg:text-2xl font-bold">
                {event.date}
              </h2>
              <p className="text-base md:text-lg">{event.month}</p>
            </div>
            <p className="purple-gradient capitalize">{event.channel}</p>
          </div>
          <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
          <p className=" mb-6">{event.description}</p>

          <div className="grid gap-2">
            <div className="flex gap-3 items-center">
              <Clock size={20} />
              <p>{event.time}</p>
            </div>
            <div className="flex gap-3 items-center">
              <Search className="rotate-45" size={20} />
              <span>{event.channel}</span>
            </div>
          </div>
          <button
            onClick={toggleModal}
            className="w-full bg-[#1E1E1E] text-white flexCenter gap-3 py-2 rounded-lg mt-8 mb-3 hover:bg-purple-50 transition"
          >
            Register Now
            <ArrowRight
              absoluteStrokeWidth
              strokeWidth={3}
              className="size-4"
            />
          </button>
          <Link href="/giving">
            <button className="w-full border bg-white border-black-50 flexCenter gap-3 text-main-50 py-2 rounded-lg hover:bg-gray-100 transition">
              Partnership <ArrowRight className="size-4" />
            </button>
          </Link>
          {!pathname.includes('events') && (
            <Link href="/events">
              <button className=" mt-4  text-main-50 text-sm p-1 border-b w-fit flex items-center gap-3 border-black-50 transition">
                View Upcoming Events <ArrowRight className="size-4" />
              </button>
            </Link>
          )}
        </div>

        {/* Right Section: Event Image */}
        <div className="lg:w-[70%] mt-8 md:mt-0 ">
          <img
            src="/event-bg.svg"
            alt="Church Event"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {/* Modal */}
      <Modal isOpen={isOpen} style={style} toggleModal={toggleModal}>
        <EventForm toggleModal={toggleModal} />
      </Modal>
    </section>
  );
};
