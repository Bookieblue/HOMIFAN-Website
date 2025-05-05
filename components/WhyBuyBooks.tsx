import React from 'react';

const WhyBuyBooks = () => {
  return (
    <section className="max-container padding-container my-10">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md py-16 px-10">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src="/publication-img.svg" // Replace with the actual image path
            alt="People reading a book together"
            className="rounded-lg w-full h-auto"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0 text-center md:text-left">
          <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">
            Why Buy Books
          </h4>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
            Grow in Faith. Empower Your Spirit. Transform Your Life.
          </h2>
          <p className="text-gray-600 text-left lg:text-center leading-relaxed">
            At House of Prayer Ministries for All Nations, we are committed to
            spreading the Word of God and empowering believers through
            faith-building resources. Our Publication Store is filled with
            spiritually enriching materials that will help you grow deeper in
            your walk with Christ, strengthen your prayer life, and provide
            guidance in your daily spiritual journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyBuyBooks;
