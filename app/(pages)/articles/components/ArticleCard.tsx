import React from 'react';
import Link from 'next/link';
import { Article } from './FeaturedArticle';
import formatDate from '@/components/DateFormat';

const ArticleCard: React.FC<Article> = ({
  id,
  updatedAt,
  title,
  content,
  author,
  imageUrl,
}) => {
  // Function to create excerpt (e.g., first 100 characters)
  const getExcerpt = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <Link href={`/articles/${id}`}>
      <div className="block overflow-hidden rounded-lg shadow-md hover:shadow-xl hover:border-purple-50 hover:border transition-shadow transform hover:scale-[1.04] duration-200 h-full">
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full border-b border-gray-100"
          />
        </div>
        <div className="p-4 flex flex-col h-[200px] bg-white">
          <p className="text-xs text-gray-500">{formatDate(updatedAt)}</p>
          <h2 className="text-lg font-bold text-gray-800 mt-2">{title}</h2>
          {/* Use getExcerpt to show truncated content */}
          <p className="text-sm text-gray-600 mt-1 flex-grow">{getExcerpt(content, 100)}</p>
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
