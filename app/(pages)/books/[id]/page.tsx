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
import BtnDropdown from "./PublicationModal";

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
  const [loading, setLoading] = useState(true);
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
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
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
                    onClick={() => router.push(`${publication.sellerUrl}`)}
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
                      <li>
                        <span className="font-bold">Pages: </span>
                        <span>{publication.pages}</span>
                      </li>
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
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {morePublications.map((pub, index) => (
            <PublicationCard
              key={index}
              id={pub.id}
              title={pub.title}
              desc={pub.desc}
              price={pub.price}
              imageUrl={pub.imageUrl}
            />
          ))}
        </div> */}
      </div>
      <WhyBuyBooks />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </>
  );
};

export default Publication;
