'use client';
import SearchBar from './SearchBar';
import ArticleCard from './ArticleCard';
import React, { useMemo, useState } from 'react';
import FeaturedArticle from './FeaturedArticle';
import Pagination from '@/components/Pagination';
import { useArticle } from '@/app/providers/articles';

export const ArticlePage: React.FC = () => {
  const { data, isLoading, error } = useArticle();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const articlesPerPage = data?.perPage || 10;
  const articles = useMemo(() => data?.articles || [], [data?.articles]);

  const featuredArticle = articles[0];

  // Filtered Article (Based on Search)
  const filteredArticle = useMemo(() => {
    return articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, articles]);

  // Paginated Article
  const paginatedArticle = useMemo(() => {
    const start = (currentPage - 1) * articlesPerPage;
    return filteredArticle.slice(start, start + articlesPerPage);
  }, [currentPage, filteredArticle, articlesPerPage]);

  return (
    <div className="my-6">
      {isLoading && (
        <p className="text-center text-3xl font-bold">Loading...</p>
      )}
      {error && (
        <p className="text-center text-3xl font-bold text-red-500">
          Failed to load articles. Please try again.
        </p>
      )}
      {!isLoading && !error && (
        <>
          {featuredArticle && <FeaturedArticle {...featuredArticle} />}
          <div className="padding-container max-container pt-10">
            <h2 className="text-center text-3xl font-bold">
              View All Articles
            </h2>
            {filteredArticle.length === 0 ? (
              <p className="text-center">No article found.</p>
            ) : (
              <>
                <SearchBar onSearch={setSearchQuery} />
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedArticle.map((article, index) => (
                    <ArticleCard key={index} {...article} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={data?.totalPages || 1}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
