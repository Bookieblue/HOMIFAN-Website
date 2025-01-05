'use client';
import React, { useState } from 'react';
import FeaturedArticle from './FeaturedArticle';
import SearchBar from './SearchBar';
import ArticlesList from './ArticleList';
import { articlesData } from './constants';

export const ArticlePage: React.FC = () => {
  const [articles, setArticles] = useState(articlesData);
  const featuredArticle = articles[articles.length - 1];

  const handleSearch = (query: string) => {
    const filteredArticles = articlesData.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setArticles(filteredArticles);
  };

  return (
    <>
      <FeaturedArticle {...featuredArticle} />
      <h2 className="text-center text-3xl font-bold my-6">View All Articles</h2>
      <SearchBar onSearch={handleSearch} />
      <ArticlesList articles={articles} />
    </>
  );
};
