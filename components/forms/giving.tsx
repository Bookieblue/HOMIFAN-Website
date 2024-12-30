import React from "react";

const Giving: React.FC = () => {
  return (
    <div className="padding-container max-container">
      <div className="flex flex-col items-center py-10 px-4 my-10 text-main-50">
        <div className="text-center mb-8 w-1/2">
          <h4 className=" uppercase tracking-widest ">
            Why We Give
          </h4>
          <h1 className="text-4xl font-bold uppercase">
            Importance of Giving Generously and Cheerfully
          </h1>
          <p className="text-lg mt-2">
            We invite you to partner with us through your donations, offerings,
            and tithes as we continue to spread the Gospel and build the kingdom
            of God.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 w-full text-main-50 rounded-lg bg-[white]">
          {/* Left Section - Bank Transfer Information */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-3xl font-semibold mb-4 uppercase">
              Give to Church of God
            </h2>
            <p className=" text-lg mb-6">
              We believe that giving is an act of worship and a way to honor God
              with our resources.
            </p>

            {/* Bank Transfer Cards */}
            <div className="space-y-4">
              <div className="border border-main-50 rounded-lg p-4">
                <h3 className="uppercase font-semibold mb-2">
                  Do the Payment via Bank Transfer
                </h3>
                <p className="mb-4">
                  For offering, Tithe, Family Fest.
                </p>
                <div className="flex items-center gap-10">
                  <div className="">
                    <p className="uppercase font-semibold">Naira Account</p>
                    <p>Bank name: First Bank of Nigeria</p>
                    <p>Account number: 3099727513</p>
                    <p>Account name: House of Prayer</p>
                  </div>
                  <div className="">
                    <p className="uppercase font-semibold">Dollar Account</p>
                    <p>Bank name: Zenith Bank of Nigeria</p>
                    <p>Account number: 3099727513</p>
                    <p>Account name: House of Prayer</p>
                  </div>
                </div>
              </div>
              <div className="border border-main-50 rounded-lg p-4">
                <h3 className="uppercase font-semibold mb-2">
                  Do the Payment via Bank Transfer
                </h3>
                <p className=" text-main-50 mb-4">
                  For Church growth support, Branch Development Fund, Donation
                  to Missionaries.
                </p>
                <div className="flex items-center gap-6">
                <div className="">
                  <p className="uppercase font-semibold">Naira Account</p>
                  <p>Bank name: First Bank of Nigeria</p>
                  <p>Account number: 3099727513</p>
                  <p>Account name: House of Prayer</p>
                </div>
                <div className="">
                  <p className="uppercase font-semibold">Dollar Account</p>
                  <p>Bank name: Zenith Bank of Nigeria</p>
                  <p>Account number: 3099727513</p>
                  <p>Account name: House of Prayer</p>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Right Section - Online Payment Form */}
          <div className="p-4">
            <div className="bg-[#F5F2F0] rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">
                Do the Payment Online via Card
              </h2>
              <p className="text-gray-600 mb-6">
                Your contributions help further the mission of the church,
                support outreach efforts, and transform lives through the power
                of prayer and ministry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Giving;
