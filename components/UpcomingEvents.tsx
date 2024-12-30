import { ArrowRight } from 'lucide-react';
import React from 'react';

interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
  month: string;
  location: string;
}

const eventDetails: Event = {
    title: "2024 Church Convention Program",
    description: "Whether you are seeking spiritual growth, healing, or a deeper connection with God, we are here to walk with you on your journey.",
    date: "20",
    month: 'Sept',
    time: "Friday 04:30 PM - 05:30 PM",
    location: "YouTube Live & Church Premises"
  };



export const UpcomingEvents = () => {
  return (
    <section className=" py-16  padding-container max-container">
        <div className='text-center'>
        <p>Upcoming Events</p>
        <h2 className="lg:text-5xl text-3xl font-bold mb-8 uppercase">join us and become part of something great</h2>
        </div>
        
      <div className="mx-auto flex flex-col md:flex-row items-center">
        {/* Left Section: Event Details */}
        <div className="md:w-[30%] text-black-50 bg-[#F2EFFE] border border-black-50 p-6 lg:p-12 rounded-lg shadow-lg">
          <div className="mb-4 flex items-end gap-3">
          <div>
          <p className=" uppercase text-sm">{eventDetails.date}</p>
          <p className=" uppercase text-sm">{eventDetails.month}</p>
          </div>
            
            <p className=" text-sm text-purple-50 capitalize">Our Upcoming Event</p>
          </div>
          
          <h3 className="text-2xl font-bold mb-4">{eventDetails.title}</h3>
          <p className=" mb-6">
            {eventDetails.description}
          </p>
          <ul className="text-sm text-gray-600 mb-6">
            <li className="flex items-center mb-2">
              <span className="mr-2">📅</span> {eventDetails.time}
            </li>
            <li className="flex items-center">
              <span className="mr-2">📍</span> {eventDetails.location}
            </li>
          </ul>
          <button className="w-full bg-[#1E1E1E] text-[white] flexCenter gap-3 py-2 rounded-lg mb-3 hover:bg-purple-50 transition">Register Now <ArrowRight className='size-4' /></button>
          <button className="w-full border bg-[white] border-black-50 flexCenter gap-3 text-main-50 py-2 rounded-lg hover:bg-gray-100 transition">Partnership  <ArrowRight className='size-4' /></button>
          <button className=" mt-4  text-main-50 text-sm p-1 border-b w-fit flex items-center gap-3 border-black-50 transition">View Upcoming Events <ArrowRight className='size-4' /> </button>
        </div>

        {/* Right Section: Event Image */}
        <div className="md:w-[70%] mt-8 md:mt-0 ">
          <img
            src="/event-bg.svg"
            alt="Church Event"
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};




