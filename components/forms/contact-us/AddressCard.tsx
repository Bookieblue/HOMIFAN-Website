export const AddressCardData = [
  {
    title: 'OUR HEADQUARTER ADDRESS',
    address:
      'Opposite CAC Grammar School, Behind Damilak Filling Station, Ondo Road, Akure.',
    phone: '0803 858 3154',
    email: 'info@houseofprayerministries.org',
  },
  {
    title: 'LAGOS BRANCH ADDRESS',
    address:
      '91B, Isawo Road, Agric Owutu, Opposite Mechanic Village, Ikorodu, Lagos.',
    phone: '0803 389 8727',
    email: 'info@houseofprayerministries.org',
  },
];

// AddressCard Component
export const AddressCard: React.FC<{
  title: string;
  address: string;
  phone: string;
  email: string;
}> = ({ title, address, phone, email }) => (
  <div className="text-main-50 border border-main-50 rounded-lg p-4 mb-4">
    <h3>{title}</h3>
    <p className="text-main-50 text-[24px] font-bold">{address}</p>
    <p className="text-lg">Phone number: {phone}</p>
    <p className="break-all">
      <span className="font-bold break-all">Email:</span> {email}
    </p>
  </div>
);
