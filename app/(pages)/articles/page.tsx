'use client'
import { articlesData, footerProps } from '@/app/constants';
import FooterSection from '@/components/Footer';
import { HeroSection } from '@/components/Hero';
import JoinUsSection from '@/components/JoinUs';
import React, {useEffect, useState} from 'react';
import Navbar from '@/components/NavBar';
import { ArticlePage } from './components/Articles';
import BackToTopButton from '@/components/BackToTop';
import { HeroContent } from '@/components/HeroContent';

const Page = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  

  const getArticles = async() => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/articles`);
      const data = await response.json();
      setArticles(data?.data?.articles)
      setIsLoading(false)
    } catch (error: any) {
      setError(error?.message || 'Failed to fetch articles')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getArticles();
  }, [])
  return (
    <div>
      <Navbar />
      <HeroSection>
        <HeroContent {...articlesData} />
      </HeroSection>
      {/* {
        articles && articles?.length > 0 &&   <ArticlePage article={articles}/>
      } */}
    <ArticlePage article={articles}/>
      <JoinUsSection />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </div>
  );
};

export default Page;
