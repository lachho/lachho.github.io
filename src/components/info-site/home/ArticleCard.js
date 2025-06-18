import React from 'react';
import { Link } from 'react-router-dom';
import { contentStructure } from '../../../data/contentStructure';

const ArticleCard = ({ 
  article, 
  selectedTags = [], 
  onToggleTag = () => {}, 
  showFeatured = false,
  showTagButtons = true 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">
            {contentStructure[article.category].icon}
          </span>
          <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
            {article.categoryTitle}
          </span>
          {showFeatured && (
            <svg className="h-5 w-5 text-yellow-500 ml-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.summary}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            showTagButtons && onToggleTag ? (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                className={`px-3 py-1 text-xs rounded-full transition-colours ${
                  selectedTags && selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                }`}
              >
                {tag}
              </button>
            ) : (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
              >
                {tag}
              </span>
            )
          ))}
        </div>
        <Link
          to={article.path}
          className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colours"
        >
          Read Article
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard; 