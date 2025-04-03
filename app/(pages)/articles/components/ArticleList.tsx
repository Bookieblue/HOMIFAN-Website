import React, { useState } from "react";
import ArticleCard from "./ArticleCard";
import Pagination from "@/components/Pagination";
import { Article } from "./FeaturedArticle";
import Image from "next/image";

interface ArticlesListProps {
  articles: Article[];
  loading: boolean; // Add a loading state prop
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles, loading }) => {
  const articlesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="padding-container max-container">
      {loading ? ( // Show loading state while data is being fetched
        <p className="text-center py-10 text-lg">Loading articles...</p>
      ) : articles.length === 0 ? ( // Show empty state only if fetching is complete and no articles are found
        <div className="flex flex-col items-center justify-center py-16">
          <Image
            src="/article-empty.svg"
            alt="No articles available"
            width={250}
            height={250}
            className="mb-4"
          />
          <p className="text-lg text-gray-500">
            No articles at the moment. Check back later.
          </p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default ArticlesList;
