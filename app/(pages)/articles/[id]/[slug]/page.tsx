"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";
import FooterSection from "@/components/Footer";
import { HeroSection } from "@/components/Hero";
import JoinUsSection from "@/components/JoinUs";
import BackToTopButton from "@/components/BackToTop";
import { footerProps } from "@/app/constants";
import Image from "next/image";
import ArticleCard from "../../components/ArticleCard";
import formatDate from "@/components/DateFormat";

interface Article {
  updatedAt: string;
  id: string;
  title: string;
  tag: string;
  author: string;
  imageUrl: string;
  content: string;
}

const ArticlePage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [moreArticles, setMoreArticles] = useState<Article[]>([]);
  const [loadingArticle, setLoadingArticle] = useState(true); // For article loading
  const [loadingMoreArticles, setLoadingMoreArticles] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      setLoadingArticle(true); // Start loading for the article section
      try {
        const response = await fetch(`${API_BASE_URL}/api/articles/${id}`);
        const data = await response.json();

        if (data.success && data.data) {
          setArticle(data.data);
        } else {
          setError("Article not found");
          router.push("/articles");
        }
      } catch (error) {
        console.error("Failed to fetch article:", error);
        setError("Something went wrong");
        router.push("/articles");
      } finally {
        setLoadingArticle(false); // Stop loading when the article is fetched
      }
    };

    fetchArticle();
  }, [id, API_BASE_URL, router]);

  useEffect(() => {
    const fetchMoreArticles = async () => {
      setLoadingMoreArticles(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/articles`);
        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          const filteredArticles = data.data.filter(
            (article: Article) => article.id !== id
          );

          // Shuffle and pick 3 random articles
          const shuffled = filteredArticles.sort(() => 0.5 - Math.random());
          setMoreArticles(shuffled.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch related articles:", error);
      } finally {
        setLoadingMoreArticles(false);
      }
    };

    fetchMoreArticles();
  }, [id, API_BASE_URL]);

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    article && (
      <div className="relative">
        <Navbar />
        <HeroSection className="h-[50svh]" />
        {/* Article Section */}
        <div className="max-container padding-container px-6 relative -top-14">
          <div className="bg-gray-100 py-6 md:py-10 lg:py-16 rounded-lg shadow-md text-main-50">
            {loadingArticle ? (
              <p className="text-center py-10">Loading article...</p>
            ) : (
              <>
                <div className="grid gap-4 text-center">
                  <p className="purple-gradient">Christianity</p>
                  <h1 className="text-2xl text-balance max-w-3xl mx-auto uppercase tracking-wide sm:text-3xl font-bold md:text-4xl lg:text-5xl">
                    {article?.title}
                  </h1>
                  <div className="flexCenter text-sm md:text-base gap-3">
                    <p>{formatDate(article?.updatedAt)}</p>
                    <p>By {article?.author}</p>
                  </div>
                </div>
                <div
                  className="my-6 md:my-10 lg:my-16 flex justify-center items-center"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "400px",
                  }}
                >
                  <Image
                    layout="fill"
                    src={article?.imageUrl}
                    alt={article?.title}
                    className="object-cover"
                    style={{
                      objectPosition: "center 50%",
                      paddingLeft: "10%",
                      paddingRight: "10%",
                    }}
                  />
                </div>

                <div className="w-5/6 grid gap-10 mx-auto max-w-3xl text-balance">
                  <p className="text-base pb-3 md:text-lg">
                    {article?.content}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* View More Articles Section */}
        <div className="padding-container pb-8 max-container">
          <div className="py-6 grid gap-1 md:gap-2">
            <p className="uppercase text-sm md:text-base text-center">
              Related Post
            </p>
            <h2 className="text-center text-3xl lg:text-4xl font-bold uppercase">
              View More ARTICLES
            </h2>
          </div>

          {loadingMoreArticles ? (
            <p className="text-center py-10">Loading related articles...</p>
          ) : moreArticles.length > 0 ? (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {moreArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg py-10">
              No related articles available at the moment.
            </p>
          )}
        </div>

        <JoinUsSection />
        <FooterSection {...footerProps} />
        <BackToTopButton />
      </div>
    )
  );
};

export default ArticlePage;
