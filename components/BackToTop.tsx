'use client'

import React, { useState, useEffect } from 'react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="z-20 fixed bottom-8 right-8 p-3 bg-white-50 text-white rounded-lg shadow-lg hover:bg-purple-50 hover:text-[white] transition duration-300 animate-scale-pulse"
        aria-label="Scroll to top"
      >
      Scroll to top  ↑
      </button>
    )
  );
};

export default BackToTopButton;
