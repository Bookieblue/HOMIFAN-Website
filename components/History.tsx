import Image from "next/image";
import React from "react";

interface HistoryProps {
  title: string;
  founding: string;
  mission: string;
  ministry: string;
}

const History: React.FC<HistoryProps> = ({
  title,
  founding,
  mission,
  ministry,
}) => {
  return (
    <div className="padding-container max-container py-5 lg:py-10 flex flex-col items-center justify-center ">
      <p className="uppercase text-center">Our History</p>
      <h2 className="lg:text-5xl text-3xl text-center font-bold mb-8 uppercase lg:w-[50%]">
        {title}
      </h2>
      <div className="flex flex-col lg:flex-row gap-10">
        <ul className="space-y-4 list-disc text-gray-700 w-[100%] pl-8 lg:pr-32">
          <li><span className="font-bold">Founding:</span> {founding} </li>
          <li><span className="font-bold">Mission:</span> {mission}   </li>
          <li><span className="font-bold">Ministry:</span> {ministry} </li>
        </ul>
        <div className="">
          <Image
            src="/woman-worshipping.svg"
            alt=""
            width={10}
            height={50}
            className="w-[90%] "
          />
        </div>
      </div>
    </div>
  );
};

export default History;
