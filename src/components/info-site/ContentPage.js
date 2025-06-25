import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { marked } from 'marked';
import { contentStructure, getBreadcrumbs, getArticleMetaData } from '../../data/contentStructure';

const ContentPage = () => {
  const { '*': fullPath } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [articleMetadata, setArticleMetadata] = useState({});

  const pathParts = fullPath ? fullPath.split('/').filter(part => part !== '') : [];
  const [categoryKey, articleId] = pathParts;

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Load article metadata for display
  useEffect(() => {
    const loadAllArticleMetadata = async () => {
      const metadata = {};
      for (const [catKey, category] of Object.entries(contentStructure)) {
        for (const article of category.articles) {
          try {
            const meta = await getArticleMetaData(catKey, article.id);
            metadata[`${catKey}-${article.id}`] = {
              ...meta,
              categoryKey: catKey,
              categoryTitle: category.title
            };
          } catch (error) {
            // Fallback data if metadata loading fails
            metadata[`${catKey}-${article.id}`] = {
              title: article.id,
              summary: 'No summary available',
              tags: [],
              categoryKey: catKey,
              categoryTitle: category.title
            };
          }
        }
      }
      setArticleMetadata(metadata);
    };
    loadAllArticleMetadata();
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);
      setPageData(null);

      try {
        if (!categoryKey) {
          // Type: All Categories
          setPageData({ type: 'categories' });
        } else {
          const category = contentStructure[categoryKey];
          if (!category) throw new Error('Category not found');

          if (!articleId) {
            // Type: Category Page
            setPageData({ type: 'category', category, categoryKey });
          } else {
            // Type: Article Page
            const articleStub = category.articles.find(a => a.id === articleId);
            if (!articleStub) throw new Error('Article not found');

            const meta = await getArticleMetaData(categoryKey, articleId);
            const response = await fetch(`/content/${categoryKey}/${articleId}.md`);
            if (!response.ok) throw new Error('Failed to fetch article content');
            
            const markdown = await response.text();
            // Strip YAML frontmatter using regex
            const content = markdown.replace(/^---[\s\S]*?---/, '').trim();
            const article = { ...meta, id: articleId, content: marked(content) };
            setPageData({ type: 'article', article, category, categoryKey });
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [fullPath, categoryKey, articleId]);

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

  const breadcrumbs = pageData?.type === 'article' 
    ? getBreadcrumbs(categoryKey, articleId, pageData.article.title)
    : getBreadcrumbs(categoryKey);
  
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
                  All Articles
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
                      {category.articles.length} articles
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
                    <div className="p-6 space-y-4">
                      {category.articles.map((article) => {
                        const metadata = articleMetadata[`${categoryKey}-${article.id}`];
                        return (
                          <Link
                            key={article.id}
                            to={`/articles/${categoryKey}/${article.id}`}
                            className="block p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md transition-all border border-gray-100"
                          >
                            <div className="flex items-center mb-3">
                              <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full mr-3">
                                {metadata?.categoryTitle || category.title}
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {metadata?.tags && metadata.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                              <svg className="mr-2 h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.2 3-3.3 3-5.7 0-3.9-3.1-7-7-7z"/>
                              </svg>
                              {metadata?.title || article.id}
                            </h2>
                            <p className="text-gray-600 text-sm mb-3">{metadata?.summary || 'No summary available'}</p>
                            <span className="text-xs text-blue-600 font-medium">
                              Read more →
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {pageData?.type === 'category' && (
          <div>
            <div className="text-center border-b border-gray-200 pb-8 mb-8">
              <span className="text-5xl">{pageData.category.icon}</span>
              <h1 className="text-4xl font-bold text-gray-900 mt-4">{pageData.category.title}</h1>
              <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">{pageData.category.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(Array.isArray(pageData.category.articles) && pageData.category.articles.length > 0) ? (
                pageData.category.articles.map((article) => {
                  const metadata = articleMetadata[`${pageData.categoryKey}-${article.id}`];
                  return (
                    <Link
                      key={article.id}
                      to={`/articles/${pageData.categoryKey}/${article.id}`}
                      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center mb-3">
                        <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full mr-3">
                          {metadata?.categoryTitle || pageData.category.title}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {metadata?.tags && metadata.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                        <svg className="mr-2 h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.2 3-3.3 3-5.7 0-3.9-3.1-7-7-7z"/>
                        </svg>
                        {metadata?.title || article.id}
                      </h2>
                      <p className="text-gray-600 mb-4">{metadata?.summary || 'No summary available'}</p>
                      <span className="text-blue-600 font-medium">
                        Read Article →
                      </span>
                    </Link>
                  );
                })
              ) : (
                <div className="col-span-full text-center text-gray-500">No articles found in this category.</div>
              )}
            </div>
          </div>
        )}

        {pageData?.type === 'article' && (
          <article className="prose lg:prose-xl max-w-none bg-white p-8 md:p-12 rounded-lg shadow-lg">
            <h1>{pageData.article.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: pageData.article.content }} />
          </article>
        )}

        {error && (
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-red-600">An Error Occurred</h1>
            <p className="text-gray-700 mt-4">{error}</p>
            <Link to="/articles" className="mt-6 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colours">
              Back to Article Library
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentPage; 