import { icons } from './constant';
import ContactForm from './form';

// AddressCard Component
const AddressCard: React.FC<{
  title: string;
  address: string;
  phone: string;
  email: string;
}> = ({ title, address, phone, email }) => (
  <div className=" text-main-50 border border-main-50 rounded-lg p-4 mb-4">
    <h3 className="">{title}</h3>
    <p className="text-main-50 text-[24px] font-bold">{address}</p>
    <p className="text-lg">Phone number: {phone}</p>
    <p>
      <span className="font-bold">Email:</span> {email}
    </p>
  </div>
);

const Contact: React.FC = () => {
  return (
    <div className="padding-container max-conatiner">
      <div className="flex flex-col md:flex-row gap-8 p-8 my-10 rounded-lg bg-white  ">
        {/* Left Section */}
        <div className="flex-1 bg-white">
          <h2 className="font-bold text-3xl mb-2">
            WE LOOK FORWARD TO HEARING FROM YOU AND HELPING YOUR NEEDS
          </h2>
          <p className="text-main-50 mb-6">
            Whether you have a question, a prayer request, or simply want to
            know more about our church and ministries, we are just a message
            away.
          </p>

          <h2 className="mb-2 uppercase">Our Social media handles</h2>
          {/* Social Media Icons */}
          <div className="flex gap-4 mb-6">
            {icons.map((icon, index) => (
              <i key={index} className={`${icon} text-2xl`}></i>
            ))}
          </div>

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
        <div className="flex-1 bg-gray-100  rounded-lg p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
