import React, { useState } from 'react';

interface PaginationProps {
  data: Array<any>;
  noOfContent: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  data,
  noOfContent,
  currentPage,
  setCurrentPage,
}) => {
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(data?.length / noOfContent);

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`mx-1 px-3 py-2 border rounded-md ${
              currentPage === i ? 'bg-purple-50 text-white' : 'bg-white'
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage > 3) pages.push(<span key="start-ellipsis">...</span>);

      for (
        let i = Math.max(1, currentPage - 2);
        i <= Math.min(totalPages, currentPage + 2);
        i++
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`mx-1 px-3 py-2 border rounded-md ${
              currentPage === i ? 'bg-purple-50 text-white' : 'bg-white'
            }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2)
        pages.push(<span key="end-ellipsis">...</span>);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center my-8 space-x-2">
      <button
        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-md ${
          currentPage === 1
            ? 'bg-gray-200 text-black-50 cursor-not-allowed'
            : 'bg-white '
        }`}
      >
        Previous
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-md ${
          currentPage === totalPages
            ? 'bg-gray-200 text-black-50  cursor-not-allowed'
            : 'bg-white'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
