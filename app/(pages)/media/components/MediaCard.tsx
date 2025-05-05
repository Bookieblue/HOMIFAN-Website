import React from 'react';
import VideoDisplay from '@/components/VideoDisplay';
import Link from 'next/link';

interface MediaCardProps {
  id: string;
  title: string;
  preacher: string;
  link: string;
  description: string;
}

// Slugify function to make title URL-safe
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/(^-|-$)+/g, '');   // Remove leading/trailing hyphens
};

export const MediaCard: React.FC<MediaCardProps> = ({
  id,
  title,
  preacher,
  link,
  description,
}) => {

  const slug = slugify(title);
  return (
    <div className="border border-black-50 rounded-xl ">
      <Link href={`/media/${id}/${slug}`}>
        <VideoDisplay link='https://youtu.be/By706Mws8xc' />
      </Link>
      <div className="md:px-4 *:uppercase py-4 px-2.5">
        <p className="text-sm md:text-base">{description}</p>
        <h2 className="text-lg pt-1 md:text-xl font-semibold">
          {title} by {preacher}
        </h2>
      </div>
    </div>
  );
};
