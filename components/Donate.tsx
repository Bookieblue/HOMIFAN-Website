import { ArrowRight } from 'lucide-react';
import React from 'react';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
}

const donateData = [
  {
    imageSrc: '/giving.jpg',
    title: "DONATE TO SUPPORT GOD'S WORK",
    description:
      "Whether you want to make a one-time gift or set up recurring donations, your contributions, no matter the amount, make a difference. Donations help fund our community initiatives, global missions, and church projects that spread hope and change lives.",
    buttonText: 'DONATE NOW',
  },
];

const DonateSection: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-center p-6 lg:p-12 bg-[white] padding-container max-container">
      {donateData.map((card, index) => (
        <React.Fragment key={index}>
          {/* Left: Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={card.imageSrc}
              alt={card.title}
              className="w-full h-[400px] rounded-lg shadow-lg mb-5 lg:mb-0 object-cover"
            />
          </div>

          {/* Right: Text Content */}
          <div className="w-full lg:w-1/2 lg:px-8 flex flex-col justify-center">
            <h4 className="text-black-50">WAYS TO GIVE</h4>
            <h2 className="text-3xl lg:text-5xl font-bold mt-2">{card.title}</h2>
            <p className="text-gray-600 mt-4">{card.description}</p>
            <button className="bg-purple-50 w-fit gap-3 text-[white] font-semibold mt-6 px-6 py-2 rounded-lg flex items-center">
              {card.buttonText} <ArrowRight className='size-4' />
            </button>
          </div>
        </React.Fragment>
      ))}
    </section>
  );
};

export default DonateSection;
