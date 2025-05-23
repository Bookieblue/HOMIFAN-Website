"use client";
import {
  ChevronDown,
  Facebook,
  LucideFacebook,
  LucideYoutube,
  Radio,
  Menu,
  X,
  Youtube,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NavbarLink {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownOptions?: { name: string; href: string }[];
}

const navbarData = {
  logo: "/logo.png",
  links: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Our Articles", href: "/articles" },
    { name: "Our Events", href: "/events" },
    {
      name: "Media Resources",
      hasDropdown: true,
      dropdownOptions: [
        { name: "Publication Store", href: "/books" },
        { name: "HOPMIFAN TV", href: "/media" },
      ],
    },
    { name: "Contact Us", href: "/contact-us" },
  ],
  givingText: "GIVING",
  joinUs: {
    name: "JOIN US ONLINE",
    hasDropdown: true,
    dropdownOptions: [
      {
        name: "Live Broadcast",
        href: "/live-broadcast", 
        icon: <Radio size={20} />,
      },
      {
        name: "Facebook",
        href: "https://web.facebook.com/watch/hopmifans/",
        icon: <Facebook size={20} />,
      },
      {
        name: "YouTube",
        href: "https://www.youtube.com/@houseofprayerministriesfor5802",
        icon: <Youtube size={20} />,
      },
    ],
  },
};

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navbarDropdownOpen, setNavbarDropdownOpen] = useState(false);
  const [joinUsDropdownOpen, setJoinUsDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const toggleMobileDropdown = (index: number) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleNavbarDropdown = () => {
    setNavbarDropdownOpen((prev) => !prev);
    setJoinUsDropdownOpen(false);
  };

  const toggleJoinUsDropdown = () => {
    setJoinUsDropdownOpen((prev) => !prev);
    setNavbarDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleGivingClick = () => {
    router.push("/giving");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-20 transition-colors duration-300 padding-container ${
        isScrolled ? "bg-white-50 shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto ">
        <div
          className={`${
            isScrolled ? "h-20" : "h-36"
          } flex justify-between items-center`}
        >
          <div className="flex-shrink-0">
            <Link href="/">
              <img
                src={navbarData.logo}
                alt="Logo"
                className={`${isScrolled ? "w-10 lg:w-14" : "w-10 lg:w-20"}`}
              />
            </Link>
          </div>
          <div
            className={`${
              isScrolled ? "" : "px-7 xl:border xl:border-[#545252]"
            } rounded-3xl flex gap-14 py-3  transition-all duration-300`}
          >
            <div className="hidden xl:flex items-center space-x-10">
              {navbarData.links.map((link, index) => (
                <div key={index} className="relative">
                  <a
                    href={link.href}
                    onClick={
                      link.hasDropdown ? toggleNavbarDropdown : undefined
                    }
                    className={`${
                      isScrolled
                        ? "text-[black] hover:text-purple-50"
                        : "text-white hover:text-yellow-50"
                    }  hover:font-bold font-medium flex items-center`}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown className="ml-1 size-4" />
                    )}
                  </a>
                  {link.hasDropdown && navbarDropdownOpen && (
                    <div className="absolute top-full mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
                      {link.dropdownOptions?.map((option, idx) => (
                        <a
                          key={idx}
                          href={option.href}
                          className="block px-4 py-2 text-black-50  hover:text-purple-50 hover:bg-gray-20 hover:font-medium"
                        >
                          {option.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="hidden xl:flex items-center relative space-x-4">
              <button
                onClick={handleGivingClick}
                className={`${
                  isScrolled
                    ? "bg-transparent border border-black-50 text-[black] hover:bg-white hover:font-bold"
                    : "bg-transparent border text-white hover:font-bold"
                } py-2 px-4 rounded-lg`}
              >
                {navbarData.givingText}
              </button>
              <button className="bg-purple-50 border-purple-50 text-white py-2 px-4 gap-2 relative rounded-lg">
                <a
                  onClick={toggleJoinUsDropdown}
                  className="hover:font-bold font-medium flex gap-1 items-center"
                >
                  {navbarData.joinUs.name}
                  <ChevronDown className="size-4" />
                </a>
                {navbarData.joinUs.hasDropdown && joinUsDropdownOpen && (
                  <div className="absolute py-1 top-full left-0 mt-2 w-full bg-white shadow-lg rounded-md overflow-hidden">
                    {navbarData.joinUs.dropdownOptions?.map((option, idx) => (
                      <a
                        key={idx}
                        href={option.href}
                        target="blank"
                        className="px-4 py-2 flex items-center  gap-1 text-gray-500  hover:text-purple-50 hover:bg-gray-20 hover:font-medium"
                      >
                        {option.icon}
                        {option.name}
                        <hr></hr>
                      </a>
                    ))}
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
              {isMobileMenuOpen ? (
                <X
                  size={24}
                  className={`${isScrolled ? "text-primary" : "text-white"}`}
                />
              ) : (
                <Menu
                  size={24}
                  className={`${isScrolled ? "text-primary" : "text-white"}`}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden h-screen bg-white-50  rounded-md">
          <div className="flex flex-col space-y-4 px-4 py-2">
            {navbarData.links.map((link, index) => (
              <div key={index} className="w-full">
                {link.hasDropdown && link.dropdownOptions ? (
                  <div>
                    <button
                      onClick={() => toggleMobileDropdown(index)}
                      className="text-gray-900  w-full text-left flex items-center gap-3"
                    >
                      {link.name} <ChevronDown className="h-4 w-4"/>
                    </button>
                    {mobileDropdowns[index] && (
                      <div className="flex flex-col space-y-1 mt-1 p-4 bg-white shadow-lg rounded-md ">
                        {link.dropdownOptions.map((option, idx) => (
                          <a
                            key={idx}
                            href={option.href}
                            className="text-gray-700 hover:text-purple-500"
                          >
                            {option.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={link.href}
                    className="text-gray-700 hover:text-purple-500 block"
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}

            <div className="lg:hidden flex flex-col gap-5 ">
              <button
                onClick={handleGivingClick}
                className={`${
                  isScrolled
                    ? "bg-transparent border border-black-50 text-[black] hover:bg-white hover:font-bold"
                    : "bg-transparent border border-black-50 lg:border-gray-20 lg:text-white hover:font-bold"
                } py-2 px-4 rounded-lg`}
              >
                {navbarData.givingText}
              </button>
              <button className="bg-purple-50 border-purple-50 text-white py-2 px-4 gap-2 relative rounded-lg">
                <a
                  onClick={toggleJoinUsDropdown}
                  className="hover:font-bold font-medium flex justify-between gap-1 items-center"
                >
                  {navbarData.joinUs.name}
                  <ChevronDown className="size-4" />
                </a>
                {navbarData.joinUs.hasDropdown && joinUsDropdownOpen && (
                  <div className="absolute py-1 top-full left-0 mt-2 w-full bg-white shadow-lg rounded-md overflow-hidden">
                    {navbarData.joinUs.dropdownOptions?.map((option, idx) => (
                      <a
                        key={idx}
                        href={option.href}
                        target="blank"
                        className="px-4 py-2 flex items-center  gap-1 text-gray-500  hover:text-purple-50 hover:bg-gray-20 hover:font-medium"
                      >
                        {option.icon}
                        {option.name}
                        <hr></hr>
                      </a>
                    ))}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
