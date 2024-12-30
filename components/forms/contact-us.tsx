import { FacebookIcon, LucideTwitter } from "lucide-react";
import React from "react";
import * as yup from "yup";



// SocialMediaIcons Component
interface SocialMediaIconsProps {
  icons: string[];
}

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({ icons }) => (
  <div className="flex gap-4 mb-6">
    {icons.map((icon, index) => (
      <i key={index} className={`${icon} text-2xl`}></i>
    ))}
  </div>
);

// AddressCard Component
interface AddressCardProps {
  title: string;
  address: string;
  phone: string;
  email: string;
}

const AddressCard: React.FC<AddressCardProps> = ({
  title,
  address,
  phone,
  email,
}) => (
  <div className=" text-main-50 border border-main-50 rounded-lg p-4 mb-4">
    <h3 className="">{title}</h3>
    <p className="text-main-50 text-[24px] font-bold">{address}</p>
    <p className="text-lg">Phone number: {phone}</p>
    <p><span className="font-bold">Email:</span> {email}</p>
  </div>
);

// Main ContactForm Component

// Validation schema with Yup
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup
    .string()
    .matches(/^\+?[0-9]{10,15}$/, "Phone number is not valid")
    .required("Phone number is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City & State is required"),
  preferredContact: yup.string().required("Please select a contact method"),
  message: yup.string().required("Message is required"),
});

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  city: string;
  preferredContact: string;
  message: string;
}

// Main ContactForm Component
const ContactForm: React.FC = () => {
  
  const icons = [
    "fab fa-facebook-f",
    "fab fa-instagram",
    "fab fa-twitter",
    "fab fa-youtube",
    "fab fa-whatsapp",
  ];

  return (
    <div className="padding-container max-conatiner">
    <div className="flex flex-col md:flex-row gap-8 p-8 my-10 rounded-lg bg-[white]  ">
      {/* Left Section */}
      <div className="flex-1 bg-[white]">
        <h2 className="font-bold text-3xl mb-2">
          WE LOOK FORWARD TO HEARING FROM YOU AND HELPING YOUR NEEDS
        </h2>
        <p className="text-main-50 mb-6">
          Whether you have a question, a prayer request, or simply want to know
          more about our church and ministries, we are just a message away.
        </p>
        

        <h2 className="mb-2 uppercase">
           Our Social media handles
        </h2>
        {/* Social Media Icons */}
        <SocialMediaIcons icons={icons} />

        {/* Address Sections */}
        <AddressCard
          title="OUR HEADQUARTER ADDRESS"
          address="Opposite CAC Grammar School, Behind Damilak Filling Station, Ondo Road, Akure."
          phone="0803 942 5631"
          email="info@houseofprayerministries.org"
        />
        <AddressCard
          title="LAGOS BRANCH ADDRESS"
          address="91B, Isawo Road, Agric Owutu, Opposite Mechanic Village, Ikorodu, Lagos."
          phone="0803 942 5631"
          email="info@houseofprayerministries.org"
        />
      </div>

      {/* Right Section - Contact Form */}
      <div className="flex-1 bg-[#F5F2F0]  rounded-lg p-8">
        <h2 className="text-lg font-bold mb-6">FILL OUR CONTACT FORM</h2>
        
      </div>
    </div>
    </div>
  );
};

export default ContactForm;
