import React from 'react';
import VideoDisplay from '@/components/VideoDisplay';
import Link from 'next/link';

interface MediaCardProps {
  id: string;
  title: string;
  creator: string;
  videoType: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  id,
  title,
  creator,
  videoType,
}) => {
  return (
    <div className="border border-black-50 rounded-xl ">
      <Link href={`/media/${id}`}>
        <VideoDisplay />
      </Link>
      <div className="md:px-4 *:uppercase py-4 px-2.5">
        <p className="text-sm md:text-base">{videoType}</p>
        <h2 className="text-lg pt-1 md:text-xl font-semibold">
          {title} by {creator}
        </h2>
      </div>
    </div>
  );
};
