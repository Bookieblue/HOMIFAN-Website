import formatDate from '@/components/DateFormat';
import Link from 'next/link';
import React from 'react';

export interface Article {
  language?: string;
  id: string;
  updatedAt: string;
  title: string;
  content: string;
  author: string;
  imageUrl: string;
}

const FeaturedArticle: React.FC<Article> = ({
  id,
  updatedAt,
  title,
  content,
  author,
  imageUrl,
}) => (
  <section className=" py-8 px-4 max-w-4xl mx-auto mt-8">
    <h4 className="text-center uppercase text-gray-500 text-sm">Our Article</h4>
    <h2 className="text-center text-3xl font-bold mt-2 uppercase">
      Our Featured Article
    </h2>
    <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md p-8 mt-6 space-y-4 lg:space-y-0 lg:space-x-8">
      <img src={imageUrl} alt={title} className="w-full lg:w-1/2 rounded-md border border-gray-300" />
      <div className="lg:w-1/2 space-y-4">
      <p className="text-sm text-gray-500">{formatDate(updatedAt)}</p>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-gray-600">{content}</p>
        <p className="text-sm text-gray-500">By {author}</p>
        <Link href={`/articles/${id}`}>
          <button className="bg-purple-50 text-white py-2 px-4 rounded-md mt-4 hover:bg-purple-700">
            Read More
          </button>
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturedArticle;
