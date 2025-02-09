'use client';

import Image from 'next/image';
import Navbar from '@/components/NavBar';
import { footerProps } from '@/app/constants';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import JoinUsSection from '@/components/JoinUs';
import React, { useEffect, useMemo } from 'react';
import ArticleCard from '../components/ArticleCard';
import BackToTopButton from '@/components/BackToTop';
import { useArticle } from '@/app/providers/articles';
import { useParams, useRouter } from 'next/navigation';
import { formatDate } from '@/app/providers/articles/util';

const Article: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data } = useArticle();
  const articles = useMemo(() => data?.articles || [], [data?.articles]);
  const article = articles.find(article => article.id === id);

  useEffect(() => {
    if (article === undefined) {
      router.push('/articles');
    }
  }, [article, router]);

  const moreArticles =  articles.filter(article => article.id !== id).slice(0, 3);

  return (
    article !== undefined && (
      <div className="relative">
        <Navbar />
        <HeroSection className="h-[50svh]" />
        <div className="max-container padding-container px-6 relative -top-14">
          <div className="bg-gray-100 py-6 md:py-10 lg:py-16 rounded-lg shadow-md text-main-50">
            <div className="grid gap-4 text-center">
              <h1 className="text-2xl text-balance max-w-3xl mx-auto uppercase tracking-wide sm:text-3xl font-bold md:text-4xl lg:text-5xl">
                {article.title}
              </h1>
              <div className="flexCenter text-sm md:text-base gap-3">
                <p>{formatDate(article.createdAt)}</p>
                <p>{article.author}</p>
              </div>
            </div>
            <div
              className="my-6 md:my-10 lg:my-16"
              style={{ position: 'relative', width: 'full', height: '500px' }}
            >
              <Image layout="fill" src={article.imageUrl} alt={article.title} />
            </div>
            <div className="w-5/6 grid gap-10 mx-auto max-w-3xl text-balance">
              {article.content}
            </div>
          </div>
        </div>
        <div className="padding-container pb-8 max-container">
          <div className="py-6 grid gap-1 md:gap-2">
            <p className="uppercase text-sm md:text-base text-center">
              Related Post
            </p>
            <h2 className="text-center text-3xl lg:text-4xl font-bold uppercase">
              View More ARTICLES
            </h2>
          </div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {moreArticles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        </div>
        <JoinUsSection />
        <FooterSection {...footerProps} />
        <BackToTopButton />
      </div>
    )
  );
};

export default Article;
