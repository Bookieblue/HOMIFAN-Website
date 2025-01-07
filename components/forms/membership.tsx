import React from 'react';
import MembershipForm from '.';

const Membership = () => {
  return (
    <div id="membership" className="padding-container max-container">
      <div className="flex flex-col items-center px-6 py-8">
        <div className=" w-full flex flex-col lg:flex-row items-center gap-8 bg-white shadow-lg rounded-md p-8">
          <MembershipForm />
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

export default Membership;
