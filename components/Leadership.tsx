import React from 'react';

interface Leader {
  name: string;
  title: string;
  imageUrl: string;
}

interface LeadershipProps {
  leaders: Leader[];
}

export const Leadership: React.FC<LeadershipProps> = ({ leaders }) => {
  // Ensure there are exactly five leaders
  if (leaders.length < 5) return null;

  return (
    <div className="p-8 py-20 padding-container max-container flex flex-col items-center justify-center">
       <p className="uppercase text-center">Our Leadership</p>
      <h2 className="lg:text-5xl text-3xl text-center font-bold mb-8 uppercase w-[70%]">
         Meet Our Inspirational Leaders of the Church
      </h2>

      {/* First Leader on top */}
      <div className="flex justify-center mb-8">
        <div className="text-center space-y-2 border border-black-50 rounded-lg p-4">
          <img
            src={leaders[0].imageUrl}
            alt={`${leaders[0].name} - ${leaders[0].title}`}
            className="h-52 w-64 rounded-full object-cover mx-auto"
          />
          <div>
            <h4 className="font-bold text-2xl text-black-50">{leaders[0].name}</h4>
            <p className="text-sm text-gray-500">{leaders[0].title}</p>
          </div>
        </div>
      </div>

      {/* Remaining Four Leaders in a Grid */}
      <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-4 gap-6">
        {leaders.slice(1, 5).map((leader, index) => (
          <div key={index} className="text-center w-full space-y-2 border border-black-50 rounded-lg p-4">
            <img
              src={leader.imageUrl}
              alt={`${leader.name} - ${leader.title}`}
              className="w-40 h-52 rounded-full object-cover mx-auto"
            />
            <div>
              <h4 className="font-bold text-2xl text-black-50">{leader.name}</h4>
              <p className="text-sm text-gray-500">{leader.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leadership;
