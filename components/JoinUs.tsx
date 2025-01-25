import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const JoinUsSection: React.FC = () => {
  return (
    <section
      className="relative flexCenter py-16 flex-col bg-cover text-[#161722] bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/join-us-background.svg')" }}
    >
      <div className="absolute inset-0 bg-black-50 bg-opacity-50"></div>
      <div className="flexBetween p-7 py-10 border-b-8 border-yellow-50 md:w-[700px] bg-white z-10">
        <div className="">
          <h2 className="text-4xl font-bold mt-10">
            YOU WANT TO SERVE GOD BETTER?
          </h2>
          <p className="text-sm mt-4 mb-10 text-black-50 text-left w-[90%]">
            As a community of believers, we are committed to loving God, growing
            in faith, and serving others. Join us as we seek to glorify God in
            everything we do.
          </p>
          <a
            href="/join-us"
            className="w-fit bg-purple-50 flexCenter gap-3 text-white-50 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-500 transition-colors duration-300"
          >
            JOIN US HERE <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="">
          <Image src="/quote.svg" alt="quote" width={400} height={10} />
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection;
