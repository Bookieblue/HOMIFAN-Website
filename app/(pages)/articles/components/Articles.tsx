'use client';
import React, { useEffect, useState } from 'react';
import FeaturedArticle, { Article } from './FeaturedArticle';
import SearchBar from './SearchBar';
import ArticlesList from './ArticleList';

export const ArticlePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>('all'); // Default to all languages
  const [originalArticles, setOriginalArticles] = useState<Article[]>([]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/articles`);
        const data = await response.json();

        if (data.success && Array.isArray(data.data.articles)) {
          setArticles(data.data.articles);
          setOriginalArticles(data.data.articles); // Store original data
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      filterByLanguage(originalArticles, language); // Pass the current language state
      return;
    }
  
    const filteredArticles = originalArticles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setArticles(filteredArticles);
  };
  


  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    filterByLanguage(originalArticles, selectedLanguage); // Pass the new language directly
  };
  
  const filterByLanguage = (articlesToFilter: Article[], selectedLanguage: string) => {
    if (selectedLanguage === 'all') {
      setArticles(articlesToFilter);
    } else {
      setArticles(
        articlesToFilter.filter(article =>
          article.language && article.language.toLowerCase() === selectedLanguage.toLowerCase()
        )
      );
    }
  };
  
  

  // Ensure featuredArticle is always from the original list (not affected by filters)
  const featuredArticle = originalArticles.length ? originalArticles[originalArticles.length - 1] : null;

  return (
    <>
      {featuredArticle && <FeaturedArticle {...featuredArticle} />}
      <h2 className="text-center text-3xl font-bold my-6">View All Articles</h2>

      {/* Language Filter Buttons */}
      <div className="flex justify-center gap-4 my-4">
        <button
          className={`px-4 py-2 rounded ${language === 'all' ? 'bg-purple-50 text-white' : 'bg-gray-200'}`}
          onClick={() => handleLanguageChange('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${language === 'english' ? 'bg-purple-50 text-white' : 'bg-gray-200'}`}
          onClick={() => handleLanguageChange('english')}
        >
          English
        </button>
        <button
          className={`px-4 py-2 rounded ${language === 'yoruba' ? 'bg-purple-50 text-white' : 'bg-gray-200'}`}
          onClick={() => handleLanguageChange('yoruba')}
        >
          Yoruba
        </button>
      </div>

      <SearchBar onSearch={handleSearch} />
      <ArticlesList articles={articles} loading={loading} />
    </>
  );
};
