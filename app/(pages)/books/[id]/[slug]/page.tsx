"use client";

import React, { useEffect, useState } from "react";
import { footerProps } from "@/app/constants";
import AuthorHighlight from "@/components/Author";
import BackToTopButton from "@/components/BackToTop";
import FooterSection from "@/components/Footer";
import { HeroSection } from "@/components/Hero";
import Navbar from "@/components/NavBar";
import PublicationCard from "@/components/PublicationCard";
import WhyBuyBooks from "@/components/WhyBuyBooks";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Heading from "@/components/Heading";
import BtnDropdown from "../PublicationModal";

interface Publication {
  sellerUrl: string;
  description: string;
  coverImage: string;
  pages: string;
  id: string;
  title: string;
  desc: string;
  price: string;
  bookType: string;
  language: string;
  pagination: string;
  dimension: string;
  imageUrl: string;
}

const Publication: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [publication, setPublication] = useState<Publication | null>(null);
  const [morePublications, setMorePublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [error, setError] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  useEffect(() => {
    if (!id) return;

    const fetchPublication = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`${API_BASE_URL}/api/books/${id}`);
        if (!response.ok) throw new Error("Failed to fetch publication");

        const jsonResponse = await response.json();
        const data = jsonResponse.data; // Extract the `data` field

        setPublication(data);
      } catch (error) {
        console.error("Error fetching publication:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [id]);

  useEffect(() => {
    const fetchMorePublications = async () => {
      try {
        setLoadingMore(true);

        const response = await fetch(`${API_BASE_URL}/api/books`);
        if (!response.ok) throw new Error("Failed to fetch more publications");

        const jsonResponse = await response.json();

        // Extract the books array from the nested structure
        let data =
          jsonResponse.data?.books ||
          jsonResponse.books ||
          jsonResponse.data ||
          jsonResponse;

        // Filter out the current publication and limit to 4 items
        const filteredPublications = Array.isArray(data)
          ? data.filter((pub: Publication) => pub.id !== id).slice(0, 4)
          : [];

        setMorePublications(filteredPublications);
      } catch (error) {
        console.error("Error fetching more publications:", error);
      } finally {
        setLoadingMore(false);
      }
    };

    if (id) {
      fetchMorePublications();
    }
  }, [id, API_BASE_URL]);

  return (
    <>
      <Navbar />
      <HeroSection className="h-[50svh]" backgroundImage="/pub_hero_img.jpg" />
      <div className="max-container text-main-50 padding-container px-6 relative -top-14">
        <div className="bg-gray-100 py-3 rounded-t-[12px]"></div>

        <div className="bg-white flex flex-col lg:flex-row *:w-full gap-x-6 gap-y-3 p-4 md:p-6 lg:px-8 lg:py-10">
          {loading ? (
            // Cool Loading Effect
            <div className="w-full flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-50 border-solid"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">
              Error loading publication. Try again later.
            </p>
          ) : !publication ? (
            <p className="text-center text-gray-600">Publication not found.</p>
          ) : (
            <>
              {/* Image Section */}
              <div className="relative w-full lg:min-h-[500px]">
                <div className="h-[500px] w-full">
                  <Image
                    fill
                    className="w-full h-full object-cover"
                    src={publication.coverImage}
                    alt={publication.title}
                  />
                </div>
              </div>
              {/* Details Section */}
              <div className="flex flex-col gap-y-6">
                <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  {publication.title}
                </h2>
                <h3 className="text-lg md:text-xl font-semibold lg:text-2xl">
                  NGN {publication.price}
                </h3>
                <p>{publication.description}</p>

                <div className="flex flex-col max-lg:flex-col-reverse gap-y-6">
                  <button
                    className="bg-purple-50 px-4 max-w-56 border-purple-50 text-white hover:font-bold p-3 flexCenter gap-1 relative rounded-lg"
                    onClick={() => window.open(publication.sellerUrl, "_blank")}
                  >
                    BUY YOUR COPY NOW
                  </button>
                  {/* <BtnDropdown bookId={id}/> */}
                  <div>
                    <p className="uppercase grid gap-y-2.5 font-semibold text-base lg:text-lg">
                      Feature of the book
                    </p>
                    <ul className="*:pt-2">
                      <li>
                        <span className="font-bold">Book Type: </span>
                        <span>{publication.bookType}</span>
                      </li>
                      <li>
                        <span className="font-bold">Language: </span>
                        <span>{publication.language}</span>
                      </li>
                      {/* <li>
                        <span className="font-bold">Pages: </span>
                        <span>{publication.pages}</span>
                      </li> */}
                      <li>
                        <span className="font-bold">Dimension: </span>
                        <span>{publication.dimension}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <AuthorHighlight />
      <div className="max-container padding-container p-6">
        <Heading
          heading="Explore our other publications"
          subHeading="Our books"
        />

        {loadingMore ? (
          // Loading state for more publications
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 md:mt-10">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 h-40 w-full rounded-t-lg"></div>
                <div className="p-4 bg-white rounded-b-lg">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                    <div className="h-8 bg-gray-300 rounded w-8"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : morePublications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 md:mt-10">
            {morePublications.map((pub) => (
              <PublicationCard
                key={pub.id}
                id={pub.id}
                title={pub.title}
                desc={pub.desc || pub.description || ""}
                price={pub.price}
                imageUrl={pub.imageUrl || pub.coverImage}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">
              No other publications available at the moment.
            </p>
          </div>
        )}
      </div>
      <WhyBuyBooks />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </>
  );
};

export default Publication;
