'use client'
import React, { useState } from 'react';

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    country: '',
    cityState: '',
    interestArea: '',
    contactMethod: '',
    prayerRequest: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add any form submission logic here, e.g., API call
  };

  return (
    <div className='padding-container max-container'>
    <div className="flex flex-col items-center px-6 py-8">
      <div className=" w-full flex flex-col lg:flex-row items-center gap-8 bg-[white] shadow-lg rounded-md p-8">
        <form onSubmit={handleSubmit} className="w-full lg:w-1/2 space-y-4 ">
          <h2 className="text-3xl uppercase font-semibold text-main-50">Become a Member</h2>
          <p className="text-gray-600">
            Are you ready to take the next step and officially become part of our church family? Fill out this form to express your interest!
          </p>

          <div className=" p-6 rounded-md space-y-4 bg-[#F5F2F0]">
            <p className='uppercase'>Fill our membership form</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md p-3"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md p-3"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md p-3"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md p-3"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md p-3"
              />
              <input
                type="text"
                name="cityState"
                placeholder="City & State"
                value={formData.cityState}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md p-3"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                name="interestArea"
                value={formData.interestArea}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md p-3"
              >
                <option value="">Areas of Interest</option>
                <option value="ministry">Joining the Ministry</option>
                <option value="volunteering">Volunteering</option>
                <option value="events">Church Events</option>
              </select>
              <select
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md p-3"
              >
                <option value="">Preferred Contact Method</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
                <option value="phone">Phone Call</option>
              </select>
            </div>

            <textarea
              name="prayerRequest"
              placeholder="Prayer Requests"
              value={formData.prayerRequest}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-3"
            />

            <button
              type="submit"
              className="w-full bg-purple-50 text-[white] font-semibold p-3 rounded-md transition"
            >
              Submit Form
            </button>
          </div>
        </form>

        <div className="hidden lg:block w-full lg:w-1/2">
          <img
            src="/woman-worshipping.svg"
            alt="Person worshipping"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default MembershipForm;
