import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { contentStructure } from '../../../data/contentStructure';

const SidebarNavigation = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubcategories, setExpandedSubcategories] = useState({});
  const location = useLocation();

  // Auto-expand categories and subcategories based on current path
  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(part => part !== '');
    
    if (pathParts[0] === 'content' && pathParts[1]) {
      const categoryKey = pathParts[1];
      const subcategoryKey = pathParts[2];
      
      // Expand the current category
      setExpandedCategories(prev => ({
        ...prev,
        [categoryKey]: true
      }));
      
      // If there's a subcategory, expand it too
      if (subcategoryKey) {
        const key = `${categoryKey}-${subcategoryKey}`;
        setExpandedSubcategories(prev => ({
          ...prev,
          [key]: true
        }));
      }
    }
  }, [location.pathname]);

  const toggleCategory = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const toggleSubcategory = (categoryKey, subcategoryKey) => {
    const key = `${categoryKey}-${subcategoryKey}`;
    setExpandedSubcategories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  const isCurrentCategoryPage = (categoryKey) => {
    return location.pathname === `/articles/${categoryKey}`;
  };

  const isCurrentSubcategoryPage = (categoryKey, subcategoryKey) => {
    return location.pathname === `/articles/${categoryKey}/${subcategoryKey}`;
  };

  const isInCurrentPath = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-80 bg-white shadow-lg border-r border-gray-200 h-screen overflow-y-auto fixed left-0 top-16 z-40 hidden lg:block">
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Site Navigation</h2>
        
        {/* Home Link */}
        <div className="mb-2">
          <Link
            to="/"
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colours ${
              isCurrentPage('/') 
                ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
        </div>

        {/* About Link */}
        <div className="mb-2">
          <Link
            to="/about"
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colours ${
              isCurrentPage('/about') 
                ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About
          </Link>
        </div>

        {/* Resume Analyser Link */}
        <div className="mb-4">
          <Link
            to="/resume-analyser"
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colours ${
              isCurrentPage('/resume-analyser') 
                ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume Analyser
          </Link>
        </div>

        <hr className="mb-4" />
        
        <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Content Library</h3>

        {/* Logo and Title */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/articles" className="block">
            <h2 className="text-xl font-bold text-gray-800">Article Library</h2>
            <p className="text-sm text-gray-600 mt-1">Browse by category</p>
          </Link>
        </div>

        {/* Content Categories */}
        {Object.entries(contentStructure).map(([categoryKey, category]) => {
          const isCategoryExpanded = expandedCategories[categoryKey];
          const isCategoryInPath = isInCurrentPath(`/articles/${categoryKey}`);
          
          return (
            <div key={categoryKey} className="mb-2">
              {/* Category Header */}
              <div className="flex items-center">
                <button
                  onClick={() => toggleCategory(categoryKey)}
                  className="flex items-center p-1 rounded hover:bg-gray-100 transition-colours mr-1"
                  aria-label={`${isCategoryExpanded ? 'Collapse' : 'Expand'} ${category.title}`}
                >
                  <svg 
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      isCategoryExpanded ? 'rotate-90' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <Link
                  to={`/articles/${categoryKey}`}
                  className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colours ${
                    location.pathname.startsWith(`/articles/${categoryKey}`)
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.title}
                </Link>
              </div>

              {/* Subcategories */}
              {isCategoryExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {Object.entries(category.subcategories).map(([subcategoryKey, subcategory]) => {
                    const subcategoryFullKey = `${categoryKey}-${subcategoryKey}`;
                    const isSubcategoryExpanded = expandedSubcategories[subcategoryFullKey];
                    const isSubcategoryInPath = isInCurrentPath(`/articles/${categoryKey}/${subcategoryKey}`);
                    
                    return (
                      <div key={subcategoryKey}>
                        {/* Subcategory Header */}
                        <div className="flex items-center">
                          <button
                            onClick={() => toggleSubcategory(categoryKey, subcategoryKey)}
                            className="flex items-center p-1 rounded hover:bg-gray-100 transition-colours mr-1"
                            aria-label={`${isSubcategoryExpanded ? 'Collapse' : 'Expand'} ${subcategory.title}`}
                          >
                            <svg 
                              className={`h-3 w-3 text-gray-400 transition-transform ${
                                isSubcategoryExpanded ? 'rotate-90' : ''
                              }`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          
                          <Link
                            to={`/articles/${categoryKey}/${subcategoryKey}`}
                            className={`flex items-center justify-between px-4 py-2 text-sm transition-colours ${
                              location.pathname.startsWith(`/articles/${categoryKey}/${subcategoryKey}`)
                                ? 'bg-blue-100 text-blue-800'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                            }`}
                          >
                            📁 {subcategory.title}
                          </Link>
                        </div>

                        {/* Articles */}
                        {isSubcategoryExpanded && (
                          <div className="ml-6 mt-1 space-y-1">
                            {subcategory.articles.map((article) => {
                              const articlePath = `/articles/${categoryKey}/${subcategoryKey}/${article.id}`;
                              
                              return (
                                <Link
                                  key={article.id}
                                  to={articlePath}
                                  className={`flex items-center px-2 py-1 rounded text-sm transition-colours ${
                                    isCurrentPage(articlePath)
                                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600 font-medium' 
                                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                  }`}
                                >
                                  <svg className="mr-2 h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  <span className="truncate">{article.title}</span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarNavigation; 