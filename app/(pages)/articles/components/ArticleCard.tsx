import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/app/providers/articles/type';
import { formatDate } from '@/app/providers/articles/util';

const ArticleCard: React.FC<Article> = ({
  id,
  createdAt,
  title,
  content,
  author,
  imageUrl,
}) => {
  return (
    <Link href={`/articles/${id}`}>
      <div className="block overflow-hidden rounded-lg shadow-md hover:shadow-xl hover:border-purple-50 hover:border transition-shadow transform hover:scale-[1.04] duration-200 h-full">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover h-full"
          />
        </div>
        <div className="p-4 flex flex-col h-[200px] bg-white">
          <p className="text-xs text-gray-500">{formatDate(createdAt)}</p>
          <h2 className="text-lg font-bold text-gray-800 mt-2">{title}</h2>
          <p className="text-sm text-gray-600 mt-1 flex-grow">{content}</p>
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
