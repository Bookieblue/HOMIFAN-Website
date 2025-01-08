'use client';

import React from 'react';
import Navbar from '@/components/NavBar';
import { useParams } from 'next/navigation';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import JoinUsSection from '@/components/JoinUs';
import ArticleCard from '../components/ArticleCard';
import BackToTopButton from '@/components/BackToTop';
import { footerProps } from '@/app/constants';
import Redirect from '@/components/Redirect';
import Image from 'next/image';
import { articlesData } from '../components/constants';

const Article: React.FC = () => {
  const { id } = useParams();
  const article = articlesData.find(article => article.id === id);

  Redirect(article, '/articles');

  const moreArticles =
    articlesData.length > 3 ? articlesData.slice(0, 3) : articlesData;

  return (
    article !== undefined && (
      <div className="relative">
        <Navbar />
        <HeroSection className="h-[50svh]" />
        <div className="max-container padding-container px-6 relative -top-14">
          <div className="bg-gray-100 py-6 md:py-10 lg:py-16 rounded-lg shadow-md text-main-50">
            <div className="grid gap-4 text-center">
              <p className="purple-gradient">{article.tag}</p>
              <h1 className="text-2xl text-balance max-w-3xl mx-auto uppercase tracking-wide sm:text-3xl font-bold md:text-4xl lg:text-5xl">
                {article.title}
              </h1>
              <div className="flexCenter text-sm md:text-base gap-3">
                <p>{article.date}</p>
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
              {article.content?.map((section, index) => (
                <div key={index}>
                  {/* Target the first heading */}
                  {index === 0 ? (
                    /* Style for the first heading */
                    <h1 className="font-bold pb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                      {section.heading}
                    </h1>
                  ) : (
                    /* Style for other headings */
                    <h2 className="font-bold pb-3 text-lg md:text-xl lg:text-2xl">
                      {section.heading}
                    </h2>
                  )}
                  <div className="grid gap-3">
                    {/* If paragraph is an array of string */}
                    {Array.isArray(section.paragraph) ? (
                      section.paragraph.map(item => (
                        <p key={item} className="text-base pb-3 md:text-lg">
                          {item}
                        </p>
                      ))
                    ) : (
                      /* else when an paragraph is a string */
                      <p className="text-base pb-3 md:text-lg">
                        {section.paragraph}
                      </p>
                    )}
                    {/* Display image if it in the content */}
                    {section.image && (
                      <Image
                        src={section.image}
                        alt={`Image used for ${section.heading}`}
                      />
                    )}
                  </div>
                </div>
              ))}
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
