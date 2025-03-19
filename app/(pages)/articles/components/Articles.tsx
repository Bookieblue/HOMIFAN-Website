'use client';
import React, { useState } from 'react';
import FeaturedArticle from './FeaturedArticle';
import SearchBar from './SearchBar';
import ArticlesList from './ArticleList';
import { articlesData } from './constants';


interface ArticleProps {
  article: any; 
}
export const ArticlePage: React.FC<ArticleProps> = (article) => {
  const [articles, setArticles] = useState(article.article);
  const featuredArticle = articles[articles.length - 1];
console.log(articles);

const getRandomObject = (arr: any) => arr[Math.floor(Math.random() * arr.length)];
const featured = getRandomObject(articles)

  const handleSearch = (query: string) => {
    const filteredArticles = articles.filter((article: any) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setArticles(filteredArticles);
  };

  return (
    <>
      <FeaturedArticle {...featured} />
      <h2 className="text-center text-3xl font-bold my-6">View All Articles</h2>
      <SearchBar onSearch={handleSearch} />
      <ArticlesList articles={articles} />
    </>
  );
};
