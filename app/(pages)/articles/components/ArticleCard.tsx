import React from 'react';
import Link from 'next/link';
import { Article } from './FeaturedArticle';
import formatDate from '@/components/DateFormat';

// Slugify function to make title URL-safe
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/(^-|-$)+/g, '');   // Remove leading/trailing hyphens
};

// Function to strip HTML tags and decode entities
const stripHtml = (html: string) => {
  if (!html) return '';
  
  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Get text content (this automatically handles HTML entities)
  return tempDiv.textContent || tempDiv.innerText || '';
};

// Alternative server-side safe version (if you need SSR compatibility)
const stripHtmlServerSafe = (html: string) => {
  if (!html) return '';
  
  return html
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Decode common HTML entities
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    // Clean up extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
};

const ArticleCard: React.FC<Article> = ({
  id,
  updatedAt,
  title,
  content,
  author,
  imageUrl,
}) => {
  // Function to create excerpt from HTML content
  const getExcerpt = (htmlContent: string, maxLength: number) => {
    if (!htmlContent) return '';
    
    // Strip HTML and get clean text
    // Use stripHtml for client-side or stripHtmlServerSafe for SSR
    const cleanText = typeof window !== 'undefined' 
      ? stripHtml(htmlContent) 
      : stripHtmlServerSafe(htmlContent);
    
    if (cleanText.length <= maxLength) {
      return cleanText;
    }
    
    // Truncate and ensure we don't cut off mid-word
    const truncated = cleanText.slice(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    
    // If there's a space within the last 20 characters, cut at the space
    if (lastSpaceIndex > maxLength - 20) {
      return truncated.slice(0, lastSpaceIndex) + '...';
    }
    
    return truncated + '...';
  };

  const slug = slugify(title);

  return (
    <Link href={`/articles/${id}/${slug}`}>
      <div className="block overflow-hidden rounded-lg shadow-md hover:shadow-xl hover:border-purple-50 hover:border transition-shadow transform hover:scale-[1.04] duration-200 h-full">
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full border-b border-gray-100"
          />
        </div>
        <div className="p-4 flex flex-col h-[200px] bg-white">
          <p className="text-xs text-gray-500">{formatDate(updatedAt)}</p>
          <h2 className="text-lg font-bold text-gray-800 mt-2">{title}</h2>
          {/* Clean excerpt without HTML tags */}
          <p className="text-sm text-gray-600 mt-1 flex-grow">
            {getExcerpt(content, 150)}
          </p>
          <div className="flex items-end justify-between mt-4">
            <p className="text-xs text-gray-500">By {author}</p>
          </div>
          <div className="bg-yellow-50 w-full h-1 mt-2"></div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;