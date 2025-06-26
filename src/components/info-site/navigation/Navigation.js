// src/components/info-site/Navigation.js (Enhanced)

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { contentStructure } from '../../../data/contentStructure';
import { SearchForm } from '../common';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Safely get pathname
  const currentPath = location?.pathname || '/';

  // Close menus on navigation
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [currentPath]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Articles', path: '/articles', hasDropdown: true },
    { name: 'Resume Analyser', path: '/resume-analyser' },
    { name: 'Search', path: '/search' }
  ];

  return (
    // The navigation bar now has a single, consistent style
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colours"
          >
            <img 
              src="/logo-black.png" 
              alt="Career Compass Logo" 
              className="h-16 w-auto" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <div key={item.name} className="relative" ref={item.hasDropdown ? dropdownRef : null}>
                {item.hasDropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colours ${
                        isActivePath(item.path) || location.pathname.startsWith('/articles')
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-white'
                      }`}
                    >
                      {item.name}
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    
                    {isDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                        <div className="p-2">
                          {Object.entries(contentStructure).map(([categoryKey, category]) => (
                            <Link
                              key={categoryKey}
                              to={`/articles/${categoryKey}`}
                              className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colours"
                            >
                              <span className="mr-2">{category.icon}</span>
                              {category.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colours ${
                      isActivePath(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Desktop Search */}
            <SearchForm
              placeholder="Search content..."
              size="medium"
              className="ml-4"
            />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
          <div className="px-4 py-4 space-y-4">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <>
                    <Link
                      to={item.path}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colours ${
                        isActivePath(item.path) || location.pathname.startsWith('/articles')
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                    
                    {/* Mobile dropdown items */}
                    <div className="pl-4 space-y-1">
                      {Object.entries(contentStructure).map(([key, category]) => (
                        <Link
                          key={key}
                          to={`/articles/${key}`}
                          className={`flex items-center px-6 py-2 rounded-md text-base font-medium transition-colours ${
                            location.pathname.startsWith(`/articles/${key}`)
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                          }`}
                        >
                          <span className="mr-2">{category.icon}</span>
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colours ${
                      isActivePath(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <SearchForm
                placeholder="Search content..."
                size="medium"
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
