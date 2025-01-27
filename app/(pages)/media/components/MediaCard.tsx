import React from 'react';
import VideoDisplay from '@/components/VideoDisplay';
import Link from 'next/link';

interface MediaCardProps {
  id: string;
  title: string;
  creator: string;
  videoUrl: string;
  videoType: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  id,
  title,
  creator,
  videoUrl,
  videoType,
}) => {
  return (
    <div className="border border-black-50 rounded-xl ">
      <Link href={`/media/${id}?videoUrl=${videoUrl}`}>
        <VideoDisplay videoUrl={videoUrl} />
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
