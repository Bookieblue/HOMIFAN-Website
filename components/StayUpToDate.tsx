import { ArrowRight } from "lucide-react";
import React from "react";

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
}

const cardData = [
  {
    imageSrc: "/sermon.jpeg",
    title: "WATCH AND LISTEN TO OUR SERMONS",
    description:
      "Each sermon is crafted to nourish your spirit and deepen your understanding of God’s Word as a believer.",
    buttonText: "VIEW SERMONS",
  },
  {
    imageSrc: "/article-bg.svg",
    title: "LEARN FROM OUR CHRISTIAN ARTICLES",
    description:
      "Dive into articles that explore various topics related to faith, Christian living, and work of God as a Christian.",
    buttonText: "READ ARTICLES",
  },
  {
    imageSrc: "/books-bg.svg",
    title: "GET CHRISTIAN SPIRITUAL BOOKS",
    description:
      "Explore Christian books on topics related to faith, Christian living, and spiritual growth. Christian living, ",
    buttonText: "GET BOOKS",
  },
];

const StayUpToDateSection: React.FC = () => {
  return (
    <section className=" p-2 py-10 padding-container max-container">
      <div className="flex flex-col items-left justify-center py-12">
        <p className="text-center text-black-50">
          WATCH, READ, LISTEN AND GROW
        </p>
        <h2 className="text-center text-black-50 text-3xl lg:text-5xl font-bold mt-4">
          STAY UP TO DATE WITH GOD'S WORD WITH US
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-4 w-full ">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="relative border w-full p-3 pb-10 border-black-50 rounded-lg overflow-hidden "
            >
              <div className="relative h-96 w-full">
                <img
                  src={card.imageSrc}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black-50 bg-opacity-50"></div>
                <div className="absolute top-32 lg:top-40 p-2 lg:p-6 text-left bg-transparent">
                  <h3 className="text-lg lg:text-2xl font-bold text-[white]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-white-50">{card.description}</p>
                  <button className="bg-purple-50 gap-3 text-white-50 font-semibold mt-6 w-full lg:w-[250px] py-2 rounded-lg flex items-center justify-center mx-auto">
                    {card.buttonText} <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StayUpToDateSection;
