import React, { useState } from 'react';
import ArticleCard, { ArticleCardProps } from './ArticleCard';

interface ArticlesListProps {
  articles: ArticleCardProps[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`mx-1 px-3 py-2 border rounded-md ${
              currentPage === i ? 'bg-purple-50 text-[white]' : 'bg-[white]'
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage > 3) pages.push(<span key="start-ellipsis">...</span>);

      for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
        pages.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`mx-1 px-3 py-2 border rounded-md ${
              currentPage === i ? 'bg-purple-50 text-[white]' : 'bg-[white]'
            }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) pages.push(<span key="end-ellipsis">...</span>);
    }
    return pages;
  };

  return (
    <div className="padding-container max-container">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {currentArticles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
      <div className="flex items-center justify-center my-8 space-x-2">
        <button
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1 ? 'bg-gray-200 text-black-50 cursor-not-allowed' : 'bg-[white] '
          }`}
        >
          Previous
        </button>
        
        {renderPageNumbers()}
        
        <button
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-md ${
            currentPage === totalPages ? 'bg-gray-200 text-black-50  cursor-not-allowed' : 'bg-[white]'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArticlesList;
