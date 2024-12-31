import { ArrowRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ServiceProps {
  title: string;
  time: string;
}

interface BranchProps {
  title: string;
  address: string;
  contactNumber: string;
  buttonText: string;
}

const servicesData: ServiceProps[] = [
  {
    title: 'Sunday Service',
    time: 'Every Sunday, 07:30 AM to 01:00 AM',
  },
  {
    title: 'Bible Study',
    time: 'Every Wednesday, 04:30 PM to 05:30 PM',
  },
  {
    title: 'Prayer Meetings',
    time: 'Every Friday, 02:00 PM to 04:00 PM',
  },
];

const branchData: BranchProps[] = [
  {
    title: 'HEADQUARTER IN ONDO STATE',
    address:
      'Opposite CAC Grammar School, Behind Damilak Filling Station, Ondo Road, Akure.',
    contactNumber: '0803 942 5631',
    buttonText: 'Whatsapp Us',
  },
  {
    title: 'LAGOS BRANCH - IKORODU',
    address:
      '91B, Isawo Road, Agric Owutu, Opposite Mechanic Village, Ikorodu, Lagos.',
    contactNumber: '0803 942 5631',
    buttonText: 'Whatsapp Us',
  },
];

const ChurchSection: React.FC = () => {
  return (
    <section className=" bg-purple-50 py-20 flex flex-col items-center justify-center text-white padding-container">
      <div className="max-container px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Left Side - Services */}
          <div className="w-full lg:w-[20%] relative bg-[#EDEAFE] rounded-lg p-8 shadow-lg">
            <h3 className="text-lg text-purple-50 font-semibold mb-4">
              OUR SERVICES
            </h3>
            <ul>
              {servicesData.map((service, index) => (
                <li key={index} className="mb-6">
                  <h4 className="text-lg font-bold flex gap-3">
                    <Image
                      src="/chevron-down.svg"
                      width={10}
                      height={10}
                      alt="chevron"
                    />
                    {service.title}
                  </h4>
                  <p className="text-sm">{service.time}</p>
                </li>
              ))}
            </ul>
            <button className="bg-black-50 gap-3  text-white-50 font-semibold mt-6 px-4 py-2 w-fit rounded-lg flex items-center">
              LEARN MORE <ArrowRight className="size-4" />
            </button>
            <Image
              src="/quote2.svg"
              width={30}
              height={10}
              alt="chevron"
              className="absolute right-8 top-8"
            />
          </div>

          {/* Right Side - Branches */}
          <div className="w-full lg:w-[80%]">
            <p className="mb-7 text-white text-xl">
              You can't afford to miss a wonderful service at any of our
              churches.
            </p>
            <div className="gap-6 flex flex-col lg:flex-row ">
              {branchData.map((branch, index) => (
                <div key={index} className="border p-2 rounded-lg">
                  <div
                    key={index}
                    className="w-full bg-[#FEEBD7] text-black-50 rounded-lg p-8 shadow-lg"
                  >
                    <h4 className=" text-[#161722]">{branch.title}</h4>
                    <p className="text-xl font-bold mt-4">
                      <span className="text-sm font-normal text-[#161722]">
                        Address
                      </span>
                      <br />
                      {branch.address}
                    </p>
                    <div className="lg:flex gap-3">
                      <p className="mt-4">
                        <span className="font-semibold">Contact Number</span>
                        <br />
                        {branch.contactNumber}
                      </p>
                      <button className="border-b border-black-50 gap-3 text-white font-semibold mt-6 px-2 py-1 flex items-center">
                        <Image
                          src="/whatsap-icon.svg"
                          width={20}
                          height={10}
                          alt="chevron"
                        />{' '}
                        {branch.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChurchSection;
