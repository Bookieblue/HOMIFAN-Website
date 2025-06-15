import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

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
  // Truncate description to 50 characters
  const truncatedDesc =
    desc.length > 50 ? desc.substring(0, 100) + "..." : desc;

  // Slugify function to make title URL-safe
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
      .replace(/(^-|-$)+/g, ""); // Remove leading/trailing hyphens
  };

  const slug = slugify(title);

  return (
    <Link href={`/books/${id}/${slug}`}>
      <div className="flex flex-col rounded-lg bg-white pt-5 shadow-md overflow-hidden hover:shadow-lg h-full">
        <img
          src={imageUrl}
          alt={title}
          className="h-40 w-full object-contain"
        />
        <div className="p-4 bg-white flex flex-col flex-grow">
          {/* Content that can vary in height */}
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-[#161722]">{truncatedDesc}</p>
          </div>

          {/* Content that should be aligned at bottom */}
          <div className="mt-auto">
            <div className="flex items-center my-2">
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-[#161722]">NGN {price}</p>
              <button className="bg-purple-50 text-white text-sm px-2 py-1 rounded-lg hover:bg-purple-700">
                <ArrowRight className="size-4 text-white-50" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PublicationCard;
