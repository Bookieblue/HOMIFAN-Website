import React from 'react';
import PrayerForm from './form';

const PrayerRequest: React.FC = () => {
  return (
    <div className="padding-container max-container">
      <div className="min-h-screen flex justify-center items-center my-10">
        {/* className="w-full lg:w-1/2 space-y-4 p-6 bg-gray-100 rounded-md" */}
        <div className="w-full bg-white rounded-xl p-3 lg:p-8 md:flex md:gap-8">
          {/* Left Section - Form */}
          <div className="lg:w-1/2 w-full bg-gray-100 p-3 lg:p-6 rounded-lg">
            <PrayerForm />
          </div>
          {/* Right Section - Image */}
          <div className="w-1/2 max-lg:hidden mt-8 md:mt-0 flex justify-center items-center">
            <img
              src="/woman-worshipping3.svg"
              alt="Prayer"
              className="rounded-lg object-cover w-full h-80 md:h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerRequest;
