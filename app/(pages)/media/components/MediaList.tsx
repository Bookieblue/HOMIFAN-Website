"use client"
import React, { useState } from 'react';
import { MediaCard } from './MediaCard';
import { mediaCardData } from './constants';
import Pagination from '@/components/Pagination';

const MediaList = () => {
  const mediaPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastArticle = currentPage * mediaPerPage;
  const indexOfFirstArticle = indexOfLastArticle - mediaPerPage;

  const currentMedia = mediaCardData.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  return (
    <>
      <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {currentMedia.map(data => (
          <MediaCard key={data.id} {...data} />
        ))}
      </div>
      <Pagination
        data={mediaCardData}
        currentPage={currentPage}
        noOfContent={mediaPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default MediaList;
