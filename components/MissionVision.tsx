import React from "react";

interface MissionVisionProps {
  mission: string;
  vision: string[];
  beliefs: string[];
}

export const MissionVision: React.FC<MissionVisionProps> = ({
  mission,
  vision,
  beliefs,
}) => {
  return (
    <div className="p-8 bg-white padding-container max-container">
      <div className="p-6 border shadow-sm  rounded-lg">
        <h2 className="text-3xl lg:text-5xl font-bold mb-4 pb-4 text-main-50 border-b-[16px] border-purple-50">
          Our Mission
        </h2>
        <p className="text-xl lg:text-[44px] font-bold text-gray-700 mb-6">{mission}</p>
      </div>
      <div className="p-6 border shadow-sm rounded-lg mt-8">
        <h3 className="text-3xl lg:text-5xl font-semibold mb-4 border-b-[16px]  border-purple-50 pb-4">Our Vision</h3>
        <ul className="list-disc grid grid-cols-1 lg:grid-cols-2 text-[13.5px] list-inside space-y-2 text-gray-700">
          {vision.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="p-6 border shadow-sm rounded-lg mt-8">
        <h3 className="text-3xl lg:text-5xl font-semibold mb-4 border-b-[16px] border-purple-50 pb-4">Our Beliefs</h3>
        <ul className="list-disc grid grid-cols-1 lg:grid-cols-2 text-[13.5px] list-inside space-y-2 text-gray-700">
          {beliefs.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MissionVision;
