import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getAllArticles } from '../../data/contentStructure';
import Breadcrumb from './Breadcrumb';
import Footer from '../resume-analyser/Footer';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const allArticles = getAllArticles();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    } else {
      setResults(allArticles);
    }
  }, [query]);

  const performSearch = (searchQuery) => {
    setIsLoading(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
      
      const searchResults = allArticles.filter(article => {
        const searchableText = [
          article.title,
          article.summary,
          article.categoryTitle,
          article.subcategoryTitle,
          ...article.tags
        ].join(' ').toLowerCase();

        return searchTerms.every(term => searchableText.includes(term));
      });

      // Sort by relevance (title matches first, then summary, then tags)
      searchResults.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const aSummary = a.summary.toLowerCase();
        const bSummary = b.summary.toLowerCase();
        
        const queryLower = searchQuery.toLowerCase();
        
        // Title exact match gets highest priority
        if (aTitle.includes(queryLower) && !bTitle.includes(queryLower)) return -1;
        if (!aTitle.includes(queryLower) && bTitle.includes(queryLower)) return 1;
        
        // Summary match gets second priority
        if (aSummary.includes(queryLower) && !bSummary.includes(queryLower)) return -1;
        if (!aSummary.includes(queryLower) && bSummary.includes(queryLower)) return 1;
        
        return 0;
      });

      setResults(searchResults);
      setIsLoading(false);
    }, 300);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchTerm.trim())}`);
      performSearch(searchTerm.trim());
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    let highlightedText = text;
    
    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark className="bg-yellow-200">$1</mark>');
    });
    
    return highlightedText;
  };

  const breadcrumbs = [
    { title: 'Home', path: '/' },
    { title: query ? `Search: "${query}"` : 'All Content', path: '/search' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {query ? `Search Results` : 'All Content'}
          </h1>
          {query && (
            <p className="text-lg text-gray-600 mb-6">
              {isLoading ? 'Searching...' : `${results.length} results for "${query}"`}
            </p>
          )}
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles, topics, and advice..."
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colours"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching content...</p>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && (
          <div>
            {results.length === 0 && query ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any content matching "{query}". Try different keywords or browse our categories.
                </p>
                <Link
                  to="/"
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colours inline-block"
                >
                  Explore Categories
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((article) => (
                  <div key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="text-sm text-blue-600 font-medium mr-2">
                          {article.categoryTitle}
                        </span>
                        <span className="text-sm text-gray-500">
                          › {article.subcategoryTitle}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightText(article.title, query)
                          }}
                        />
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightText(article.summary, query)
                          }}
                        />
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: highlightText(tag, query)
                              }}
                            />
                          </span>
                        ))}
                      </div>
                      <Link
                        to={article.path}
                        className="text-blue-600 font-medium hover:text-blue-800 transition-colours"
                      >
                        Read Article →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Show all content when no search query */}
            {!query && results.length > 0 && (
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-6">
                  Showing all {results.length} articles. Use the search bar above to find specific content.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Suggested Searches */}
        {query && results.length === 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Try these popular searches:</h3>
            <div className="flex flex-wrap gap-2">
              {['resume writing', 'interview tips', 'career change', 'skills development', 'networking'].map((suggestion) => (
                <Link
                  key={suggestion}
                  to={`/search?q=${encodeURIComponent(suggestion)}`}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colours text-sm"
                >
                  {suggestion}
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

export default SearchResults; 