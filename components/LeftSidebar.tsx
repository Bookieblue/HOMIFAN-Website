import Link from "next/link";
import React from "react";
import Image from "next/image";
import { sidebarLinks } from "@/app/constants";

const LeftSidebar = () => {
  return (
    <section className=" bg-white lg:p-5 h-full flex flex-row fixed lg:relative max-w-[250px]">
      <nav className="flex flex-col gap-14 lg:gap-10">
        <Link
          href="/"
          className="mb-3 cursor-pointer justify-center flex items-center gap-2"
        >
          <Image
            src="/logo.svg"
            width={50}
            height={40}
            alt="Horizon Logo"
            className="w-[70%] lg:w-[40%] mt-8 lg:mt-0"
          />
        </Link>

        {sidebarLinks.map((item, index) => {
          return (
            <Link href={item.route} key={item.label} className="flex gap-5 ml-5 items-center">
              <div className="relative size-[23px] lg:size-5">
                <Image src={item.imgURL} alt={item.label} fill />
              </div>
              <p className={`hidden lg:block medium-16 ${index === 1 ? 'text-blue-50' : 'text-gray-50'}`}>{item.label}</p>
            </Link>
          );
        })}
        <div className="w-full hidden lg:block bg-gradient-to-b from-blue-50 to-blue-200 text-white h-fit rounded-lg mt-2  p-3.5">
          <p className="mt-10 bold-16 mb-1">GET more with PRO</p>
          <p className="regular-16">Upgrade to pro subscription for $9 / month</p>
        </div>
      </nav>
    </section>
  );
};

export default LeftSidebar;
