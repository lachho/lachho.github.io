import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticleMetaData } from '../../../data/contentStructure';

const CategoryCard = ({ categoryKey, category }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [articleTitles, setArticleTitles] = useState({});

  useEffect(() => {
    const loadArticleTitles = async () => {
      const titles = {};
      for (const article of category.articles) {
        try {
          const meta = await getArticleMetaData(categoryKey, article.id);
          titles[article.id] = meta.title || article.id;
        } catch (error) {
          titles[article.id] = article.id; // fallback to ID if meta fails
        }
      }
      setArticleTitles(titles);
    };
    loadArticleTitles();
  }, [categoryKey, category.articles]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
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
              {category.articles.length} {category.articles.length === 1 ? 'article' : 'articles'}
            </div>
          </Link>
          {/* Expand/Collapse Button */}
          <button
            onClick={toggleExpanded}
            className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colours"
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${category.title}`}
          >
            <svg 
              className={`h-5 w-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Articles - Expandable with smooth transition */}
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="p-4 space-y-2">
            {category.articles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${categoryKey}/${article.id}`}
                className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colours"
              >
                <svg className="mr-2 h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.2 3-3.3 3-5.7 0-3.9-3.1-7-7-7z"/>
                </svg>
                <span className="flex-1">{articleTitles[article.id] || article.id}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard; 