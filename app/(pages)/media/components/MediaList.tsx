"use client";

import React, { useEffect, useState } from "react";
import { MediaCard } from "./MediaCard";
import Pagination from "@/components/Pagination";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const MediaList = () => {
  const mediaPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [mediaData, setMediaData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/sermons`);
        const data = await response.json();

        if (data.success && Array.isArray(data.data.sermons)) {
          setMediaData(data.data.sermons);
        } else {
          setMediaData([]);
        }
      } catch (error) {
        console.error("Failed to fetch sermons:", error);
        setMediaData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const indexOfLastArticle = currentPage * mediaPerPage;
  const indexOfFirstArticle = indexOfLastArticle - mediaPerPage;

  const currentMedia = Array.isArray(mediaData)
    ? mediaData.slice(indexOfFirstArticle, indexOfLastArticle)
    : [];

  if (loading) {
    return <p className="text-center text-gray-500">Loading sermons...</p>;
  }

  if (!mediaData.length) {
    return (
      <div className="text-center py-16 flex flex-col items-center justify-center">
         <h2 className="text-center text-3xl font-bold my-6">View All Sermons</h2>
        <img
          src="/sermon-empty.svg" // or use an external image like: "https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No sermons available"
          className="w-48 h-48 mb-4 opacity-80"
        />
        <p className="text-xl font-semibold text-gray-600">No sermons available</p>
        <p className="text-gray-400 mt-2">Please check back later.</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-center text-3xl font-bold my-6">View All Sermons</h2>
      <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {currentMedia.map((data: any) => (
          <MediaCard key={data.id} {...data} />
        ))}
      </div>
      <Pagination
        data={mediaData}
        currentPage={currentPage}
        noOfContent={mediaPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default MediaList;
