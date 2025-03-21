import React from "react";


const AuthorHighlight: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center max-container p-6 rounded-lg w-[60%] mx-auto my-10">
      <div className="flex-1 text-center md:text-left">
        <p className="text-lg text-gray-700 mb-4">Whether you&apos;re looking for in-depth Bible studies or encouragement for life&apos;s challenges, you&apos;ll find the perfect resource here. Strengthen your prayer life with our dedicated prayer books and guides. These publications provide practical steps for effective prayer, intercession, and seeking God&apos;s will.</p>
        <p className="font-bold text-gray-800">
        Prophet Segun Adewunmi <span className="font-normal text-gray-600">- Author</span>
        </p>
      </div>
      <div className="mt-4 md:mt-0 md:ml-6">
        <img
          src='/GO.svg'
          alt='Prophet Segun Adewunmi'
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthorHighlight;
