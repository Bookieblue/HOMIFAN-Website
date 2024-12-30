import React from 'react';
import Link from 'next/link';
import { Article } from './FeaturedArticle';

const ArticleCard: React.FC<Article> = ({
  id,
  date,
  title,
  excerpt,
  author,
  imageUrl,
}) => {
  return (
    <Link href={`/articles/${id}`}>
      <div className="block overflow-hidden rounded-lg shadow-md hover:shadow-xl hover:border-purple-50 hover:border transition-shadow transform hover:scale-[1.04] duration-200 h-full">
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4 flex flex-col h-[200px] bg-[white]">
          <p className="text-xs text-gray-500">{date}</p>
          <h2 className="text-lg font-bold text-gray-800 mt-2">{title}</h2>
          <p className="text-sm text-gray-600 mt-1 flex-grow">{excerpt}</p>
          <div className="flex items-end justify-between mt-4">
            <p className="text-xs text-gray-500">By {author}</p>
          </div>
          <div className="bg-yellow-50 w-full h-1 mt-2"></div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
