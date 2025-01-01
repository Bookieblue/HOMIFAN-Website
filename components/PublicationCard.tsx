import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface PublicationCardProps {
  id: string;
  title: string;
  desc: string;
  price: string;
  imageUrl: string;
}

const PublicationCard: React.FC<PublicationCardProps> = ({
  id,
  title,
  desc,
  price,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col rounded-lg shadow-md overflow-hidden hover:shadow-lg">
      <img src={imageUrl} alt={title} className="h-40 w-full object-cover" />
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-[#161722]">{desc}</p>
        <div className="flex items-center my-2">
          <span className="text-yellow-500">⭐</span>
          <span className="text-yellow-500">⭐</span>
          <span className="text-yellow-500">⭐</span>
          <span className="text-yellow-500">⭐</span>
          <span className="text-yellow-500">⭐</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-[#161722]">NGN {price}</p>
          <Link href={`/publications/${id}`}>
            <button className="mt-3 bg-purple-50 text-white text-sm px-2 py-1 rounded-lg hover:bg-purple-700">
              <ArrowRight className="size-4 text-white-50" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
