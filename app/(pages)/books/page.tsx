"use client";
import { useEffect, useState } from "react";
import { footerProps, publicationData } from "@/app/constants";
import AuthorHighlight from "@/components/Author";
import BackToTopButton from "@/components/BackToTop";
import FooterSection from "@/components/Footer";
import { HeroSection } from "@/components/Hero";
import { HeroContent } from "@/components/HeroContent";
import Navbar from "@/components/NavBar";
import PublicationCard from "@/components/PublicationCard";
import WhyBuyBooks from "@/components/WhyBuyBooks";

interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  price: number;
}

const Publications: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/books`
        );
        const data = await response.json();
        if (data.success) {
          setBooks(data.data.books);
        }
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection backgroundImage="/join-us-background.svg">
        <HeroContent {...publicationData} />
      </HeroSection>
      <AuthorHighlight />
      <div className="max-container padding-container p-6">
        <h1 className="text-center uppercase">Our Books</h1>
        <p className="uppercase text-4xl font-bold text-center text-[#161722] mb-5 mt-3">
          Explore our Christian publications
        </p>

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-16 mb-16">
            {/* Animated Spinner */}
            <div className="relative">
              {/* Outer ring */}
              <div className="w-16 h-16 border-4 border-gray-200 border-solid rounded-full"></div>
              {/* Spinning inner ring */}
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-purple-50 border-solid rounded-full animate-spin"></div>
            </div>
            
            {/* Loading text */}
            <p className="text-lg font-semibold text-gray-600 mt-4 animate-pulse">
              Loading our publications...
            </p>
            
            {/* Optional: Loading dots animation */}
            <div className="flex space-x-1 mt-2">
              <div className="w-2 h-2 bg-purple-50 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <img
              src="/book-empty.svg"
              alt="No books available"
              className="w-64 h-64"
            />
            <p className="text-lg font-semibold text-gray-600 mt-4">
              No books available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <PublicationCard
                key={book.id}
                id={book.id}
                title={book.title}
                desc={book.description}
                price={book.price.toString()} // Convert price to string if needed
                imageUrl={book.coverImage}
              />
            ))}
          </div>
        )}
      </div>
      <WhyBuyBooks />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </>
  );
};

export default Publications;