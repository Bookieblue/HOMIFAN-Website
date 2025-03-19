import React from 'react';
import Link from 'next/link';
import { Article } from './FeaturedArticle';
import  ArticleDetails from "../[id]/page"

const ArticleCard: React.FC<Article> = (article) => {
  return (
    <Link href={`/articles/${article?.id}`}>
      <div className="block overflow-hidden rounded-lg shadow-md hover:shadow-xl hover:border-purple-50 hover:border transition-shadow transform hover:scale-[1.04] duration-200 h-full">
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={article?.imageUrl}
            alt={article?.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4 flex flex-col h-[200px] bg-white">
          <p className="text-xs text-gray-500">{new Date(article?.updatedAt)?.toDateString()}</p>
          <h2 className="text-lg font-bold text-gray-800 mt-2">{article?.title}</h2>
          <p className="text-sm text-gray-600 mt-1 flex-grow">{article?.content}</p>
          <div className="flex items-end justify-between mt-4">
            <p className="text-xs text-gray-500">By {article?.author}</p>
          </div>
          <div className="bg-yellow-50 w-full h-1 mt-2"></div>
        </div>
      </div>
      {
        article?.id && <ArticleDetails singleArticle={article}/>
      }
    </Link>
  );
};

export default ArticleCard;
