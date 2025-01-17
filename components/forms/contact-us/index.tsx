import ContactForm from './form';
import { SocialIcons } from './SocialIcons';
import { AddressCardData, AddressCard } from './AddressCard';

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
          <SocialIcons />
          {/* Address Sections */}
          {AddressCardData.map(data => (
            <AddressCard key={data.address} {...data} />
          ))}
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
