import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { marked } from 'marked';
import { contentStructure, getBreadcrumbs, getArticleMetaData } from '../../data/contentStructure';

// Import new components
import LoadingSpinner from './common/LoadingSpinner';
import ErrorBoundary from './common/ErrorBoundary';
import ErrorDisplay from './common/ErrorDisplay';
import Breadcrumb from './navigation/Breadcrumb';
import ArticleLibraryView from './content/ArticleLibraryView';
import CategoryView from './content/CategoryView';
import ArticleView from './content/ArticleView';

const ContentPage = () => {
  const { '*': fullPath } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [articleMetadata, setArticleMetadata] = useState({});

  // Safely handle path parsing
  const pathParts = fullPath && typeof fullPath === 'string' 
    ? fullPath.split('/').filter(part => part !== '') 
    : [];
  const [categoryKey, articleId] = pathParts;

  // Safely get pathname
  const currentPath = location?.pathname || '/articles';

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  // Load article metadata for display
  useEffect(() => {
    const loadAllArticleMetadata = async () => {
      try {
        const metadata = {};
        for (const [catKey, category] of Object.entries(contentStructure)) {
          for (const article of category.articles) {
            try {
              const meta = await getArticleMetaData(catKey, article.id);
              metadata[`${catKey}-${article.id}`] = {
                ...meta,
                tags: Array.isArray(meta.tags) ? meta.tags : [],
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
      } catch (error) {
        console.error('Error loading article metadata:', error);
        setError('Failed to load article metadata');
      }
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

            // Fetch both metadata and content in one call
            const articleData = await getArticleMetaData(categoryKey, articleId, true);
            console.log('Article data received:', articleData);
            
            const article = { 
              ...articleData, 
              id: articleId, 
              content: marked(articleData.content),
              tags: Array.isArray(articleData.tags) ? articleData.tags : []
            };
            setPageData({ type: 'article', article, category, categoryKey });
          }
        }
      } catch (err) {
        console.error('Content loading error:', err);
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [fullPath, categoryKey, articleId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const breadcrumbs = pageData?.type === 'article' 
    ? getBreadcrumbs(categoryKey, articleId, pageData.article.title)
    : getBreadcrumbs(categoryKey);
  
  return (
    <div key={currentPath} className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb breadcrumbs={breadcrumbs} />

        {/* Content based on page type */}
        {pageData?.type === 'categories' && (
          <ArticleLibraryView
            showAllArticles={showAllArticles}
            setShowAllArticles={setShowAllArticles}
            articleMetadata={articleMetadata}
          />
        )}

        {pageData?.type === 'category' && (
          <CategoryView
            category={pageData.category}
            categoryKey={pageData.categoryKey}
            articleMetadata={articleMetadata}
          />
        )}

        {pageData?.type === 'article' && (
          <ArticleView article={pageData.article} />
        )}

        {error && <ErrorDisplay error={error} />}
      </div>
    </div>
  );
};

// Wrapped Component with Error Boundary
const ContentPageWithErrorBoundary = () => (
  <ErrorBoundary>
    <ContentPage />
  </ErrorBoundary>
);

export default ContentPageWithErrorBoundary; 