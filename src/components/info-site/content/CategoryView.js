import React from 'react';
import ArticleCard from '../home/ArticleCard';

const CategoryView = ({ category, categoryKey, articleMetadata }) => {
  return (
    <div>
      <div className="text-center border-b border-gray-200 pb-8 mb-8">
        <span className="text-5xl">{category.icon}</span>
        <h1 className="text-4xl font-bold text-gray-900 mt-4">{category.title}</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">{category.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(Array.isArray(category.articles) && category.articles.length > 0) ? (
          category.articles.map((article) => {
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
          })
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No articles found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView; 