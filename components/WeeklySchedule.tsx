"use client";
import React, { useState } from "react";

const WeeklySchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Akure" | "Ikorodu">("Akure");

  const schedules = {
    Akure: [
      { day: "Sunday", time: "7:30 AM - 12:00 PM", program: "SUNDAY SERVICE" },
      { day: "Monday", time: "10:00 AM - 5:00 PM", program: "COUNSELING" },
      {
        day: "Tuesday",
        time: "10:00 AM - 12:00 PM",
        program: "FRUIT OF THE WOMB",
      },
      {
        day: "Wednesday",
        time: "4:30 PM - 5:30 PM",
        program: "BIBLE STUDY/PRAYER MEETING",
      },
      {
        day: "Friday",
        time: "12:00 AM - 2:00 AM",
        program: "DELIVERANCE/BREAKTHROUGH SERVICE",
      },
    ],
    Ikorodu: [
      { day: "Sunday", time: "8:00 AM - 11:00 AM", program: "SUNDAY WORSHIP" },
      {
        day: "Wednesday",
        time: "5:00 PM - 6:30 PM",
        program: "MID-WEEK SERVICE",
      },
      {
        day: "Thursday",
        time: "10:00 AM - 12:00 PM",
        program: "HEALING SERVICE",
      },
      { day: "Saturday", time: "2:00 PM - 4:00 PM", program: "YOUTH MEETING" },
    ],
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-20 max-container pt-5 padding-container">
      <div className="text-center mb-8 w-full sm:w-3/4 lg:w-1/2">
        <p className="text-gray-500 font-semibold text-sm">BECOME A MEMBER</p>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
          JOIN US IN MAKING A DIFFERENCE
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Whether you&apos;re new to the faith or looking for a church to call
          home, we invite you to become part of our family and experience the
          joy of walking together in Christ.
        </p>
        <a href="#membership">
          <button className="mt-6 px-6 py-3 bg-purple-50 text-white font-semibold rounded transition">
            FILL MEMBERSHIP FORM
          </button>
        </a>
      </div>

      <div className="w-full bg-white p-4 sm:p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
          WEEKLY SCHEDULE
        </h2>
        <p className="text-gray-600 text-center sm:text-left mb-6">
          We offer a variety of services designed to meet you wherever you are
          in your faith journey. With us, you’ll find a place that feels like
          home.
        </p>
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[70%]">
          <div className="flex flex-wrap justify-start space-x-2 sm:space-x-4 mb-6 bg-gray-100 p-3 rounded-lg">
            {Object.keys(schedules).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as "Akure" | "Ikorodu")}
                className={`py-2 px-4 rounded-full font-semibold text-sm lg:text-base ${
                  activeTab === key ? "bg-purple-50 text-white" : "text-main-50"
                }`}
              >
                <p className="hidden md:block">{key.toUpperCase()} WEEKLY PROGRAMS</p>
                <p className="md:hidden block">{key.toUpperCase()}</p>
              </button>
            ))}
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full border border-gray-200 text-left text-gray-700">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 border-b">Day</th>
                  <th className="p-4 border-b">Time</th>
                  <th className="p-4 border-b">Program</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {schedules[activeTab].map((item, index) => (
                  <tr key={index}>
                    <td className="p-4 border-b">{item.day}</td>
                    <td className="p-4 border-b w-full">{item.time}</td>
                    <td className="p-4 border-b">{item.program}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>

          <div className="w-full lg:w-[30%] space-y-4">
            <div className="bg-gray-100 p-4 border rounded-md">
              <h3 className="font-bold">YOUTH FELLOWSHIP</h3>
              <p>
                <strong>Time:</strong> Saturdays at 4:00 PM - 6:00 PM
              </p>
              <p>
                <strong>Location:</strong> Main Auditorium
              </p>
              <p>
                Our youth fellowship provides a safe and exciting space for
                young people to connect, learn, and grow in their faith.
              </p>
            </div>
            <div className="bg-gray-100 p-4 border rounded-md">
              <h3 className="font-bold">SPECIAL SERVICES</h3>
              <p>
                <strong>Yearly Programme:</strong> Church Convention and
                Anniversary
              </p>
              <p>
                <strong>Location:</strong> Main Auditorium
              </p>
              <p>
                We also host special gatherings throughout the year, including
                worship nights, special prayer meetings, and more.
              </p>
            </div>
            <div className="bg-gray-100 p-4 border rounded-md">
              <h3 className="font-bold">VIRTUAL SERVICE OPTIONS</h3>
              <p>Location: YouTube</p>
              <p>
                Missed a service? You can catch up with our recorded services
                available on our website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySchedule;
