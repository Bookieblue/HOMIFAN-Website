'use client';
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
    <div id="membership" className="padding-container max-container">
      <div className="flex flex-col items-center px-6 py-8">
        <div className=" w-full flex flex-col lg:flex-row items-center gap-8 bg-white shadow-lg rounded-md p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full text-main-50 lg:w-1/2 space-y-4 "
          >
            <h2 className="text-3xl uppercase font-semibold">
              Become a Member
            </h2>
            <p className="text-gray-600">
              Are you ready to take the next step and officially become part of
              our church family? Fill out this form to express your interest!
            </p>

            <div className="p-6 rounded-md space-y-5 bg-gray-100">
              <p className="uppercase font-bold">Fill our membership form</p>
              <div className="flex flex-col *:w-full sm:flex-row gap-4">
                <div className="grid gap-1.5">
                  <label className="text-black-50/80" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="eg. Ademola"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-black-50/80" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="eg, Johnson"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
                  />
                </div>
              </div>
              <div className="flex flex-col *:w-full sm:flex-row gap-4">
                <div className="grid gap-1.5">
                  <label className="text-black-50/80" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-black-50/80" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
                  />
                </div>
              </div>

              <div className="flex flex-col *:w-full sm:flex-row gap-4">
                <div className="grid gap-1.5">
                  <label className="text-black-50/80" htmlFor="country">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-black-50/80" htmlFor="cityState">
                    City & State
                  </label>
                  <input
                    type="text"
                    name="cityState"
                    placeholder="City & State"
                    value={formData.cityState}
                    onChange={handleChange}
                    className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row *:w-full gap-4">
                <div className="grid gap-1.5">
                  <label className="text-black-50/80" htmlFor="interestArea">
                    Areas of Interest
                  </label>
                  <select
                    name="interestArea"
                    value={formData.interestArea}
                    onChange={handleChange}
                    className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
                  >
                    <option disabled value="">
                      Areas of Interest
                    </option>
                    <option value="ministry">Joining the Ministry</option>
                    <option value="volunteering">Volunteering</option>
                    <option value="events">Church Events</option>
                  </select>
                </div>
                <div className="grid gap-1.5">
                  <label className="text-black-50/80" htmlFor="contactMethod">
                    Preferred method of contact.
                  </label>
                  <select
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
                  >
                    <option disabled value="">
                      Preferred Contact Method
                    </option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                  </select>
                </div>
              </div>

              <textarea
                name="prayerRequest"
                placeholder="Prayer Requests"
                value={formData.prayerRequest}
                onChange={handleChange}
                className="w-full bg-transparent border-black-50 border rounded-xl indent-4 py-2.5"
              />

              <button
                type="submit"
                className="w-full bg-purple-50 text-white font-semibold p-3 rounded-md transition"
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
