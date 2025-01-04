import React from 'react';

const PrayerRequestForm: React.FC = () => {
  return (
    <div className="padding-container max-container">
      <div className="min-h-screen flex justify-center items-center my-10 p-4">
        <div className="w-full bg-white rounded-xl  p-8 md:flex md:gap-8">
          {/* Left Section - Form */}
          <div className="md:w-1/2 bg-[#F5F2F0] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              FILL OUR PRAYER REQUEST FORM
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">First Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ademola"
                    className="w-full border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Last Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Johnson"
                    className="w-full border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    placeholder="e.g. +234..."
                    className="w-full border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@gmail.com"
                    className="w-full border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Country</label>
                  <input
                    type="text"
                    placeholder="e.g. Nigeria"
                    className="w-full border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">City & State</label>
                  <input
                    type="text"
                    placeholder="e.g. Akure, Ondo state"
                    className="w-full border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Preferred method of contact
                  </label>
                  <select className="w-full border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-purple-500">
                    <option>Email</option>
                    <option>Phone</option>
                    <option>Whatsapp</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-main-50">Prayer Request</label>
                  <textarea
                    placeholder="Drop your prayer request"
                    className="w-full border-gray-300 rounded p-2 h-24 focus:outline-none focus:ring focus:ring-purple-500"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-50 text-white-50 p-2 rounded mt-4 hover:bg-purple-600 transition"
              >
                SUBMIT REQUEST
              </button>
            </form>
          </div>

          {/* Right Section - Image */}
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center items-center">
            <img
              src="/woman-worshipping.svg"
              alt="Prayer"
              className="rounded-lg object-cover w-full h-80 md:h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerRequestForm;
