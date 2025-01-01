'use client'
import React, { useState } from 'react';
import FeaturedArticle from './FeaturedArticle';
import SearchBar from './SearchBar';
import ArticlesList from './ArticleList';


export const articlesData = [
    {
      id: "1",
      date: "Tuesday 13 Sept, 2024",
      title: "10 Ways to Become a Better Christian in this Season",
      excerpt: "It’s only natural for you to desire to become a better Christian and grow in your faith in Jesus Christ...",
      author: "John Ademola",
      imageUrl: "/woman-worshipping.svg", // Replace with actual image URLs
    },
    {
      id: "2",
      date: "Wednesday 14 Sept, 2024",
      title: "Understanding the Power of Prayer in Challenging Times",
      excerpt: "Prayer is a powerful tool that helps Christians find peace, direction, and comfort even in the most difficult times...",
      author: "Sarah Ogundipe",
      imageUrl: "/woman-worshipping.svg",
    },
    {
      id: "3",
      date: "Friday 15 Sept, 2024",
      title: "How to Spread the Gospel in Everyday Life",
      excerpt: "Evangelism is not just for missionaries; each of us can share the message of Jesus Christ in our daily lives...",
      author: "James Ayodele",
      imageUrl: "/woman-worshipping.svg",
    },
    {
      id: "4",
      date: "Sunday 17 Sept, 2024",
      title: "The Importance of Faith in Times of Adversity",
      excerpt: "Faith can be a source of strength and resilience when facing challenges, providing hope in dark moments...",
      author: "Esther Bamidele",
      imageUrl: "/woman-worshipping.svg",
    },
    {
      id: "5",
      date: "Monday 18 Sept, 2024",
      title: "Developing a Heart for Service in the Church Community",
      excerpt: "Serving others is an essential aspect of Christian life. It allows us to demonstrate God’s love in action...",
      author: "Tunde Johnson",
      imageUrl: "/woman-worshipping.svg",
    },
    {
      id: "6",
      date: "Tuesday 19 Sept, 2024",
      title: "Biblical Wisdom for Modern Financial Stewardship",
      excerpt: "The Bible offers timeless wisdom on managing finances, from saving to giving and living within one’s means...",
      author: "Grace Okafor",
      imageUrl: "/woman-worshipping.svg",
    },
    {
      id: "7",
      date: "Wednesday 20 Sept, 2024",
      title: "5 Habits for Consistent Bible Study",
      excerpt: "Consistent Bible study is key to spiritual growth. Here are five habits to help you dive deeper into God’s Word...",
      author: "Emmanuel Olatunji",
      imageUrl: "/woman-worshipping.svg",
    },
    {
      id: "8",
      date: "Thursday 21 Sept, 2024",
      title: "Why Worship is Essential to a Christian’s Life",
      excerpt: "Worship is not only an act of devotion; it's a means of experiencing God’s presence and renewing our spirit...",
      author: "Miriam Adeyemi",
      imageUrl: "/woman-worshipping.svg",
    },
    {
      id: "9",
      date: "Friday 22 Sept, 2024",
      title: "How to Build Stronger Relationships within Your Church Family",
      excerpt: "Building connections within the church fosters a supportive community and enhances personal spiritual growth...",
      author: "Michael Eze",
      imageUrl: "/woman-worshipping.svg",
    },
    {
      id: "10",
      date: "Saturday 23 Sept, 2024",
      title: "Overcoming Temptation: Strategies from the Bible",
      excerpt: "Temptation is a common struggle, but the Bible offers guidance and strength to overcome it...",
      author: "Deborah Akinola",
      imageUrl: "/woman-worshipping.svg",
    }
  ];
  

export const ArticlePage: React.FC = () => {
  const [articles, setArticles] = useState(articlesData);

  const handleSearch = (query: string) => {
    const filteredArticles = articlesData.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setArticles(filteredArticles);
  };

  return (
    <div className=" mb-20">
      <FeaturedArticle
        id="11"
        date="Tuesday 13 Sept, 2024"
        title="10 Ways to Become a Better Christian in this Season"
        excerpt="It’s only natural for you to desire to become a better Christian and grow in your faith in Jesus Christ..."
        author="By John Ademola"
        imageUrl="/woman-worshipping.svg"
      />
      <h2 className="text-center text-3xl font-bold my-6">View All Articles</h2>
      <SearchBar onSearch={handleSearch} />
      <ArticlesList articles={articles} />
    </div>
  );
};


