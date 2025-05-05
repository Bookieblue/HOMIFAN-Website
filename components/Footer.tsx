import React from 'react';

interface ContactInfo {
  location: string;
  address: string;
  email: string;
  phone: string;
}

interface FooterProps {
  logoSrc: string;
  navigationLinks: { name: string; href: string }[];
  socialMediaLinks: { platform: string; href: string }[];
  headquarters: ContactInfo;
  lagosBranch: ContactInfo;
  copyright: string;
}

const FooterSection: React.FC<FooterProps> = ({
  logoSrc,
  navigationLinks,
  socialMediaLinks,
  headquarters,
  lagosBranch,
  copyright,
}) => {
  return (
    <footer className="relative bg-main-50 overflow-hidden text-white   ">
      <div className="container  grid grid-cols-1 md:grid-cols-6 gap-3 relative p-10 padding-container">
        {/* Purple Background Curved Element */}
        <div className=" hidden lg:block absolute w-[40vw] h-[55vh] top-0 right-0 bg-purple-50 rounded-tl-[150px] z-0" />

        {/* Logo and Ministry Name */}
        <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start z-10">
          <img src={logoSrc} alt="Ministry Logo" className="mb-4 w-20 h-auto" />
          <h3 className="text-sm font-bold mb-4 text-white">
            House of Prayer Ministries for All Nations
          </h3>
        </div>

        {/* Navigation Links */}
        <div className="col-span-1 md:col-span-1 z-10 text-white">
          <h4 className=" mb-4 border-b-4 border-[#FFD0A0] inline-block pb-1">
            Navigation
          </h4>
          <ul>
            {navigationLinks.map(link => (
              <li key={link.name} className="mb-2">
                <a href={link.href} className="hover:underline" >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="col-span-1 md:col-span-1 z-10 text-white">
          <h4 className=" mb-4 border-b-4 border-[#FFD0A0] inline-block pb-1">
            Social Media
          </h4>
          <ul>
            {socialMediaLinks.map(social => (
              <li key={social.platform} className="mb-2">
                <a href={social.href} className="hover:underline" target='blank'>
                  {social.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div className="col-span-2 md:col-span-2 z-10 text-white">
          <div className="lg:p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Headquarters Contact */}
              <div>
                <h4 className="  mb-4 border-b-4 border-[#FFD0A0] inline-block pb-1">
                  Headquarter Contact
                </h4>
                <p>{headquarters.address}</p>
                <a href={`mailto:${headquarters.email}`} className="underline break-all">
                  {headquarters.email}
                </a>
                <p className="font-bold mt-2">{headquarters.phone}</p>
              </div>

              {/* Lagos Branch Contact */}
              <div>
                <h4 className=" text-sm mb-4 border-b-4 border-[#FFD0A0] inline-block pb-1">
                  Lagos Branch Contact
                </h4>
                <p>{lagosBranch.address}</p>
                <a href={`mailto:${lagosBranch.email}`} className="underline">
                  {lagosBranch.email}
                </a>
                <p className="font-bold mt-2">{lagosBranch.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t mb-10 lg:mb-0 border-gray-500 mt-8 padding-container max-container text-white pt-6 flex flex-col md:flex-row items-center justify-between text-center text-sm">
        <p>{copyright}</p>
        <div className="flex justify-center space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Policy Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
