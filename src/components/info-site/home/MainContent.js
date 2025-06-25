import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import CategoryCard from './CategoryCard';
import { contentStructure, getFeaturedArticles } from '../../../data/contentStructure';

const MainContent = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      setFeaturedArticles(await getFeaturedArticles());
    };
    fetchArticles();
  }, []);

  return (
    <>
      {/* Featured Articles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Featured Articles</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Check out our latest and most popular articles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                showFeatured={true}
                showTagButtons={false}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link
              to="/articles"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colours shadow-lg"
            >
              View All Articles
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Explore Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Navigate through our organised article categories to find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(contentStructure).map(([categoryKey, category]) => (
              <CategoryCard
                key={categoryKey}
                categoryKey={categoryKey}
                category={category}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MainContent; 