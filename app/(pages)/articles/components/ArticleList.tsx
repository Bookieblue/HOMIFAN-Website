import React, { useState } from 'react';
import ArticleCard from './ArticleCard';
import Pagination from '@/components/Pagination';
import { Article } from './FeaturedArticle';

interface ArticlesListProps {
  articles: Article[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  const articlesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);


  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  return (
    <div className="padding-container max-container">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {currentArticles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
      <Pagination
        data={articles}
        currentPage={currentPage}
        noOfContent={articlesPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ArticlesList;
