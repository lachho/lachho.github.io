import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import { contentStructure, getFeaturedArticles, getRecentArticles } from '../../../data/contentStructure';

const MainContent = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  
  const featuredArticles = getFeaturedArticles();
  const recentArticles = getRecentArticles();

  const toggleCategory = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

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
              Our most popular and impactful career development resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                showFeatured={true}
                showTagButtons={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Recent Articles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our latest career development content and professional insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recentArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                showFeatured={false}
                showTagButtons={true}
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
            {Object.entries(contentStructure).map(([categoryKey, category]) => {
              const isExpanded = expandedCategories[categoryKey];
              
              return (
                <div key={categoryKey} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
                  {/* Category Header */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/articles/${categoryKey}`}
                        className="flex-1 text-center group"
                      >
                        <div className="text-5xl mb-4">{category.icon}</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colours">
                          {category.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {category.description}
                        </p>
                        <div className="text-sm text-gray-500">
                          {Object.keys(category.subcategories).length} subcategories
                        </div>
                      </Link>
                      
                      {/* Expand/Collapse Button */}
                      <button
                        onClick={() => toggleCategory(categoryKey)}
                        className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colours"
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${category.title}`}
                      >
                        <svg 
                          className={`h-5 w-5 text-gray-500 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Subcategories - Collapsible */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50">
                      <div className="p-4 space-y-2">
                        {Object.entries(category.subcategories).map(([subcategoryKey, subcategory]) => (
                          <Link
                            key={subcategoryKey}
                            to={`/articles/${categoryKey}/${subcategoryKey}`}
                            className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colours"
                          >
                            <span className="mr-2">📁</span>
                            <span className="flex-1">{subcategory.title}</span>
                            <span className="text-xs text-gray-500">
                              {subcategory.articles.length} articles
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default MainContent; 