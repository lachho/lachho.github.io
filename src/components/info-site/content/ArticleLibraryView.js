import React from 'react';
import { Link } from 'react-router-dom';
import { contentStructure } from '../../../data/contentStructure';
import ArticleCard from '../home/ArticleCard';

const ArticleLibraryView = ({ 
  showAllArticles, 
  setShowAllArticles, 
  articleMetadata 
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Article Library</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowAllArticles(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-colours ${
              !showAllArticles
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-blue-50'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setShowAllArticles(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-colours ${
              showAllArticles
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-blue-50'
            }`}
          >
            All Articles
          </button>
        </div>
      </div>

      {!showAllArticles ? (
        <CategoryGridView />
      ) : (
        <AllArticlesView articleMetadata={articleMetadata} />
      )}
    </div>
  );
};

const CategoryGridView = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {Object.entries(contentStructure).map(([categoryKey, category]) => (
      <Link
        key={categoryKey}
        to={`/articles/${categoryKey}`}
        className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center mb-4">
          <span className="text-3xl mr-4">{category.icon}</span>
          <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
        </div>
        <p className="text-gray-600 mb-4">{category.description}</p>
        <div className="text-sm text-gray-500">
          {category.articles.length} articles
        </div>
      </Link>
    ))}
  </div>
);

const AllArticlesView = ({ articleMetadata }) => (
  <div className="space-y-6">
    {Object.entries(contentStructure).map(([categoryKey, category]) => (
      <div key={categoryKey} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <span className="text-2xl mr-3">{category.icon}</span>
            <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {category.articles.map((article) => {
            const metadata = articleMetadata[`${categoryKey}-${article.id}`];
            
            // Convert metadata to ArticleCard format
            const articleData = {
              id: article.id,
              title: metadata?.title || article.id,
              summary: metadata?.summary || 'No summary available',
              tags: metadata?.tags || [],
              category: categoryKey,
              categoryTitle: metadata?.categoryTitle || category.title,
              path: `/articles/${categoryKey}/${article.id}`
            };

            return (
              <ArticleCard
                key={article.id}
                article={articleData}
                showTagButtons={false}
              />
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

export default ArticleLibraryView; 