import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getAllArticles } from '../../data/contentStructure';
import Breadcrumb from './navigation/Breadcrumb';
import Footer from './Footer';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const query = searchParams.get('q') || '';

  useEffect(() => {
    setSearchTerm(query);
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (term) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    const allArticles = await getAllArticles();
    const searchResults = allArticles.filter(article => 
      (article.title && article.title.toLowerCase().includes(term.toLowerCase())) ||
      (article.summary && article.summary.toLowerCase().includes(term.toLowerCase())) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))) ||
      (article.categoryTitle && article.categoryTitle.toLowerCase().includes(term.toLowerCase()))
    );
    // Sort results by relevance (title matches first, then content matches)
    const sortedResults = searchResults.sort((a, b) => {
      const aInTitle = a.title && a.title.toLowerCase().includes(term.toLowerCase()) ? 1 : 0;
      const bInTitle = b.title && b.title.toLowerCase().includes(term.toLowerCase()) ? 1 : 0;
      return bInTitle - aInTitle;
    });
    setResults(sortedResults);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };

  const highlightText = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index} className="search-highlight">{part}</mark> : 
        part
    );
  };

  const suggestedSearches = ['Interview Tips', 'Resume Writing', 'Career Development', 'Technology Jobs', 'Networking'];

  const breadcrumbs = [
    { title: 'Home', path: '/' },
    { title: query ? `Search: "${query}"` : 'All Content', path: '/search' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Search Results</h1>
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for articles, tips, and career advice..."
                className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 transition-colours"
              >
                Search
              </button>
            </div>
          </form>
          {query && (
            <p className="text-gray-600">
              {loading ? 'Searching...' : `Found ${results.length} results for "${query}"`}
            </p>
          )}
        </div>
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Searching articles...</p>
          </div>
        )}
        {/* Search Results */}
        {!loading && query && (
          <div className="space-y-6">
            {results.length > 0 ? (
              results.map((article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-3">
                    <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full mr-3">
                      {article.categoryTitle}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {article.tags && article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    <Link 
                      to={article.path}
                      className="hover:text-blue-600 transition-colours"
                    >
                      {highlightText(article.title, query)}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {highlightText(article.summary, query)}
                  </p>
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
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any articles matching "{query}". Try different keywords or browse our categories.
                </p>
                {/* Suggested Searches */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Try searching for:</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {suggestedSearches.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setSearchTerm(suggestion);
                          setSearchParams({ q: suggestion });
                        }}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colours"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
                <Link
                  to="/"
                  className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colours"
                >
                  Browse All Articles
                </Link>
              </div>
            )}
          </div>
        )}
        {/* Default State - No Search Query */}
        {!query && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Our Content Library</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Find articles, tips, and career advice by searching for keywords, topics, or skills.
            </p>
            {/* Popular Searches */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Searches:</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {suggestedSearches.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setSearchTerm(suggestion);
                      setSearchParams({ q: suggestion });
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colours"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colours"
            >
              Browse All Content
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults; 