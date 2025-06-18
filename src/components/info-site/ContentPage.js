import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { marked } from 'marked';
import { contentStructure, getBreadcrumbs, getAllArticles } from '../../data/contentStructure';

const ContentPage = () => {
  const { '*': fullPath } = useParams();
  const location = useLocation();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [showAllArticles, setShowAllArticles] = useState(false);

  // Parse the path to get category, subcategory, and article
  const pathParts = fullPath ? fullPath.split('/').filter(part => part !== '') : [];
  const [categoryKey, subcategoryKey, articleId] = pathParts;

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!categoryKey) {
          // Show all categories
          setPageData({ type: 'categories' });
          setContent('');
          setLoading(false);
          return;
        }

        const category = contentStructure[categoryKey];
        if (!category) {
          throw new Error('Category not found');
        }

        if (!subcategoryKey) {
          // Show category page with subcategories
          setPageData({ type: 'category', category, categoryKey });
          setContent('');
          setLoading(false);
          return;
        }

        const subcategory = category.subcategories[subcategoryKey];
        if (!subcategory) {
          throw new Error('Subcategory not found');
        }

        if (!articleId) {
          // Show subcategory page with articles
          setPageData({ type: 'subcategory', category, subcategory, categoryKey, subcategoryKey });
          setContent('');
          setLoading(false);
          return;
        }

        // Show specific article
        const article = subcategory.articles.find(a => a.id === articleId);
        if (!article) {
          throw new Error('Article not found');
        }

        setPageData({ type: 'article', category, subcategory, article, categoryKey, subcategoryKey });

        // Try to load the markdown file
        try {
          const response = await fetch(`/content/${article.file}`);
          if (!response.ok) {
            throw new Error('Content file not found');
          }
          const markdownContent = await response.text();
          const htmlContent = marked(markdownContent);
          setContent(htmlContent);
        } catch (fileError) {
          // Fallback to a basic content structure if file doesn't exist
          const fallbackContent = `
# ${article.title}

${article.summary}

## Overview

This article covers important topics related to ${article.title.toLowerCase()}. 

### Key Points

- Professional development insights
- Industry best practices  
- Practical tips and strategies
- Real-world applications

### Tags

${article.tags.map(tag => `**${tag}**`).join(' • ')}

---

*This content is part of our ${category.title} section under ${subcategory.title}.*

### Related Articles

Explore more articles in the [${subcategory.title}](/articles/${categoryKey}/${subcategoryKey}) section or browse other [${category.title}](/articles/${categoryKey}) topics.
          `;
          const htmlContent = marked(fallbackContent);
          setContent(htmlContent);
        }
        
      } catch (err) {
        setError(err.message);
        // Show 404 page
        const notFoundContent = `
# Page Not Found

Sorry, the page you're looking for doesn't exist.

## What happened?

The content you're trying to access may have been moved, deleted, or the URL might be incorrect.

## What you can do:

- [Go back to the homepage](/)
- [Browse our article categories](/articles)
- Use the search functionality to find what you're looking for
- Check the navigation menu for other available content

## Need help?

If you believe this is an error, please check the URL or try navigating through our article structure using the sidebar navigation.
        `;
        const htmlContent = marked(notFoundContent);
        setContent(htmlContent);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [categoryKey, subcategoryKey, articleId, fullPath, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading content...</p>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbs = getBreadcrumbs(categoryKey, subcategoryKey, articleId);
  const allArticles = getAllArticles();

  return (
    <div key={location.pathname} className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg className="h-4 w-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-medium text-gray-900">{crumb.title}</span>
                ) : (
                  <Link to={crumb.path} className="hover:text-blue-600 transition-colours">
                    {crumb.title}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Content based on page type */}
        {pageData?.type === 'categories' && (
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
                  All Articles ({allArticles.length})
                </button>
              </div>
            </div>

            {!showAllArticles ? (
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
                      {Object.keys(category.subcategories).length} subcategories
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(contentStructure).map(([categoryKey, category]) => (
                  <div key={categoryKey} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{category.icon}</span>
                        <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                      </div>
                    </div>
                    <div className="p-6">
                      {Object.entries(category.subcategories).map(([subcategoryKey, subcategory]) => (
                        <div key={subcategoryKey} className="mb-6 last:mb-0">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="mr-2">📁</span>
                            {subcategory.title}
                          </h3>
                          <div className="grid grid-cols-1 gap-4">
                            {subcategory.articles.map((article) => (
                              <Link
                                key={article.id}
                                to={`/articles/${categoryKey}/${subcategoryKey}/${article.id}`}
                                className="block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colours"
                              >
                                <h4 className="font-medium text-gray-900 mb-2">{article.title}</h4>
                                <p className="text-sm text-gray-600 mb-2">{article.summary}</p>
                                <div className="flex flex-wrap gap-1">
                                  {article.tags.slice(0, 3).map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {article.tags.length > 3 && (
                                    <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
                                      +{article.tags.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {pageData?.type === 'category' && (
          <div>
            <div className="flex items-center mb-8">
              <span className="text-5xl mr-6">{pageData.category.icon}</span>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{pageData.category.title}</h1>
                <p className="text-xl text-gray-600 mt-2">{pageData.category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(pageData.category.subcategories).map(([subcategoryKey, subcategory]) => (
                <Link
                  key={subcategoryKey}
                  to={`/articles/${pageData.categoryKey}/${subcategoryKey}`}
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-3">📁 {subcategory.title}</h2>
                  <p className="text-gray-600 mb-4">{subcategory.description}</p>
                  <div className="text-sm text-gray-500">
                    {subcategory.articles.length} articles
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {pageData?.type === 'subcategory' && (
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">📁 {pageData.subcategory.title}</h1>
              <p className="text-xl text-gray-600">{pageData.subcategory.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {pageData.subcategory.articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/articles/${pageData.categoryKey}/${pageData.subcategoryKey}/${article.id}`}
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h2>
                  <p className="text-gray-600 mb-4">{article.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {pageData?.type === 'article' && (
          <div>
            {/* Article Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{pageData.article.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {pageData.article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xl text-gray-600">{pageData.article.summary}</p>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-lg shadow-md">
              <div 
                className="prose prose-lg max-w-none p-8"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            {/* Navigation */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <Link
                  to={`/articles/${pageData.categoryKey}/${pageData.subcategoryKey}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colours"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to {pageData.subcategory.title}
                </Link>
                
                <Link
                  to={`/articles/${pageData.categoryKey}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colours"
                >
                  View all {pageData.category.title}
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {error && pageData?.type !== 'article' && (
          <div className="bg-white rounded-lg shadow-md">
            <div 
              className="prose prose-lg max-w-none p-8"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentPage; 