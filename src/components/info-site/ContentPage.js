import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { contentStructure, getBreadcrumbs } from '../../data/contentStructure';
import Breadcrumb from './Breadcrumb';
import Footer from '../resume-analyser/Footer';

const ContentPage = () => {
  const { '*': pathParams } = useParams();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Parse the path parameters
  const pathParts = pathParams ? pathParams.split('/') : [];
  const [categoryKey, subcategoryKey, articleId] = pathParts;

  const category = categoryKey ? contentStructure[categoryKey] : null;
  const subcategory = category && subcategoryKey ? category.subcategories[subcategoryKey] : null;
  const article = subcategory && articleId ? 
    subcategory.articles.find(a => a.id === articleId) : null;

  const breadcrumbs = getBreadcrumbs(categoryKey, subcategoryKey, articleId);

  // Load markdown content for articles
  useEffect(() => {
    if (article && article.file) {
      setIsLoading(true);
      setError('');
      
      // In a real implementation, you would fetch from a server or import dynamically
      // For now, we'll show placeholder content
      const loadContent = async () => {
        try {
          // Simulate loading markdown content
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const placeholderMarkdown = `# ${article.title}

${article.summary}

## Introduction

This is a comprehensive guide that will help you understand the key concepts and practical applications in this area. Our expert team has compiled the most up-to-date information to ensure you have everything you need to succeed.

## Key Points

### 1. Understanding the Fundamentals

Before diving into advanced topics, it's essential to have a solid grasp of the fundamentals. This foundation will serve you well as you progress through more complex concepts.

### 2. Practical Applications

Theory is important, but practical application is where real learning happens. Here are some actionable steps you can take:

- Start with small, manageable goals
- Practice regularly and consistently
- Seek feedback from mentors or peers
- Document your progress and learnings

### 3. Common Challenges and Solutions

Every professional faces challenges. Here are some common ones and how to overcome them:

**Challenge**: Feeling overwhelmed by the amount of information
**Solution**: Break down complex topics into smaller, digestible chunks

**Challenge**: Lack of practical experience
**Solution**: Seek out internships, volunteer opportunities, or personal projects

## Best Practices

1. **Stay Current**: Industries evolve rapidly, so continuous learning is essential
2. **Network Actively**: Build relationships with professionals in your field
3. **Document Everything**: Keep track of your accomplishments and lessons learned
4. **Seek Mentorship**: Find experienced professionals who can guide your development

## Conclusion

Success in this area requires dedication, continuous learning, and practical application. By following the guidelines outlined in this article, you'll be well-positioned to achieve your professional goals.

Remember that everyone's journey is unique, so adapt these suggestions to fit your specific circumstances and objectives.

## Related Articles

${subcategory.articles
  .filter(a => a.id !== article.id)
  .slice(0, 3)
  .map(a => `- [${a.title}](/content/${categoryKey}/${subcategoryKey}/${a.id})`)
  .join('\n')}

---

*Need personalised career advice? Try our [Resume Analyser](/resume-analyser) to get detailed feedback on your CV.*`;

          setContent(placeholderMarkdown);
        } catch (err) {
          setError('Failed to load content. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };

      loadContent();
    }
  }, [article, categoryKey, subcategoryKey]);

  // Configure marked for better HTML output
  marked.setOptions({
    headerIds: false,
    mangle: false
  });

  // Render category view
  if (!categoryKey || !category) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
            <p className="text-gray-600 mb-8">The content you're looking for doesn't exist.</p>
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (categoryKey && !subcategoryKey) {
    // Category overview page
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb breadcrumbs={breadcrumbs} />
          
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{category.icon}</span>
              <h1 className="text-4xl font-bold text-gray-800">{category.title}</h1>
            </div>
            <p className="text-xl text-gray-600">{category.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
              <Link
                key={subKey}
                to={`/content/${categoryKey}/${subKey}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {subcategory.title}
                </h3>
                <p className="text-gray-600 mb-4">{subcategory.description}</p>
                <div className="text-sm text-blue-600 font-medium">
                  {subcategory.articles.length} articles
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (categoryKey && subcategoryKey && !articleId) {
    // Subcategory overview page
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb breadcrumbs={breadcrumbs} />
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{subcategory.title}</h1>
            <p className="text-xl text-gray-600">{subcategory.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {subcategory.articles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/content/${categoryKey}/${subcategoryKey}/${article.id}`}
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colours"
                >
                  Read Article →
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (categoryKey && subcategoryKey && articleId && !article) {
    // Article not found
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb breadcrumbs={breadcrumbs} />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
            <Link 
              to={`/content/${categoryKey}/${subcategoryKey}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Back to {subcategory?.title}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Article view
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        {isLoading && (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading content...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {content && !isLoading && (
          <article className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(content) }}
            />
          </article>
        )}

        {article && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">More in {subcategory.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subcategory.articles
                .filter(a => a.id !== article.id)
                .slice(0, 4)
                .map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/content/${categoryKey}/${subcategoryKey}/${relatedArticle.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <h4 className="font-medium text-gray-800 mb-2">{relatedArticle.title}</h4>
                    <p className="text-sm text-gray-600">{relatedArticle.summary}</p>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ContentPage; 