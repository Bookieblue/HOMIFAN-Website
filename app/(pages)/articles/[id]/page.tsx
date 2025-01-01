'use client';

import React from 'react';
import Navbar from '@/components/NavBar';
import { useParams } from 'next/navigation';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import JoinUsSection from '@/components/JoinUs';
import ArticleCard from '../components/ArticleCard';
import BackToTopButton from '@/components/BackToTop';
import { articlesData } from '../components/Articles';
import { footerProps, articlesData as articleHeroInfo } from '@/app/constants';

const Article: React.FC = () => {
  const { id } = useParams();
  const article = articlesData.find(article => article.id === id);
  const moreArticles =
    articlesData.length > 3 ? articlesData.slice(0, 3) : articlesData;

  return (
    <>
      <Navbar />
      <HeroSection {...articleHeroInfo} />
      <div className="padding-container pb-8 max-container">
        <div className="py-6">
          <p className="uppercase text-sm text-center">Related Post</p>
          <h2 className="text-center text-3xl font-bold uppercase">
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
    </>
  );
};

export default Article;
