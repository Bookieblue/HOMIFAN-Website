"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import Heading from "@/components/Heading";
import FooterSection from "@/components/Footer";
import { HeroSection } from "@/components/Hero";
import JoinUsSection from "@/components/JoinUs";
import { MediaCard } from "../../components/MediaCard";
import BackToTopButton from "@/components/BackToTop";
import { HeroContent } from "@/components/HeroContent";
import { footerProps } from "@/app/constants";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import YoutubeVideoDisplay from "@/components/YoutubeVideo";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const SingleMediaPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [media, setMedia] = useState<any | null>(null);
  const [relatedMedia, setRelatedMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMedia = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/sermons/${id}`);
        const data = await response.json();

        if (data.success && data.data) {
          setMedia(data.data);
        } else {
          router.push("/media");
        }
      } catch (error) {
        console.error("Failed to fetch media:", error);
        router.push("/media");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [id, router]);

  useEffect(() => {
    if (!id) return;

    const fetchRelatedMedia = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/sermons`);
        const data = await response.json();

        if (data.success && Array.isArray(data.data.sermons)) {
          const filtered = data.data.sermons
            .filter((item: any) => item.id !== id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          setRelatedMedia(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch related media:", error);
      }
    };

    fetchRelatedMedia();
  }, [id]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.has("videoUrl")) {
      params.delete("videoUrl");
      router.replace(`/media/${id}?${params.toString()}`);
    }
  }, [id, router, searchParams]);

  if (!media) {
    return (
      <div className="flex items-center justify-center min-h-[100vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-purple-300 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium text-gray-700">Loading media...</p>
        </div>
      </div>
    );
  }
  

  return (
    <div className="relative">
      <Navbar />
      <HeroSection className="80svh">
        <HeroContent title={media.title} subtitle={media.preacher} />
      </HeroSection>

      <div className="padding-container max-container">
        <div className="py-10 lg:px-4 my-10">
          <h1 className="md:text-4xl text-center mb-8 md:w-1/2 mx-auto lg:text-5xl text-3xl text-balance font-bold uppercase">
            {media.title}
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-[360px]">
              <p>Loading video...</p>
            </div>
          ) : (
            <YoutubeVideoDisplay link="https://youtu.be/By706Mws8xc" />
          )}
        </div>

        <div className="pb-20">
          <Heading
            className="py-6"
            subHeading="Related Media"
            heading="View More Content"
          />

          {relatedMedia.length > 0 ? (
            <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedMedia.map((mediaItem) => (
                <MediaCard key={mediaItem.id} {...mediaItem} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              No related media found at the moment.
            </p>
          )}
        </div>
      </div>

      <JoinUsSection />
      <FooterSection {...footerProps} />
      <BackToTopButton />
    </div>
  );
};

export default SingleMediaPage;
