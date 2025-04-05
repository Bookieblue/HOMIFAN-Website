'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface GalleryItem {
  id: number;
  imageUrl: string;
  altText: string;
}

// Custom hook to detect screen width
const useMobileView = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Adjust 640px for mobile breakpoint
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const MomentsGallery = () => {
  const isMobile = useMobileView();

  // Sample gallery items - images can be replaced with real ones
  const galleryItems: GalleryItem[] = [
    { id: 1, imageUrl: "/gallery (1).jpg", altText: "Moment 1" },
    { id: 2, imageUrl: "/moment (6).jpg", altText: "Moment 2" },
    { id: 3, imageUrl: "/gallery (3).jpg", altText: "Moment 3" },
    { id: 4, imageUrl: "/moment (2).jpg", altText: "Moment 4" },
    { id: 5, imageUrl: "/gallery (5).jpg", altText: "Moment 5" },
    { id: 6, imageUrl: "/gallery (4).jpg", altText: "Moment 6" },
    { id: 7, imageUrl: "/gallery (6).jpg", altText: "Moment 7" },
    { id: 8, imageUrl: "/moment (7).jpg", altText: "Moment 8" },
    { id: 9, imageUrl: "/moment (4).jpg", altText: "Moment 9" },
    { id: 10, imageUrl: "/moment (1).jpg", altText: "Moment 10" },
    { id: 11, imageUrl: "/moment (5).jpg",altText: "Moment 11" },
    { id: 12, imageUrl: "/moment (3).jpg", altText: "Moment 12" },
  ];

  // Slice gallery items to show only first 6 on mobile
  const displayedItems = isMobile ? galleryItems.slice(0, 6) : galleryItems;

  return (
    <section className="py-16 bg-gray-100  padding-container max-container">
      <div className=" mx-auto text-center">
        {/* Title */}
        <p className='uppercase'>Our Gallery</p>
        <h2 className="text-3xl lg:text-5xl font-bold uppercase mb-5">Moments at the Church</h2>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {displayedItems.map((item) => (
            <div key={item.id} className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src={item.imageUrl}
                alt={item.altText}
                className="object-cover w-full h-full"
                width={150}
                height={150}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MomentsGallery;
