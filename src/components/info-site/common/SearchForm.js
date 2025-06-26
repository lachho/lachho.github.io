import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ 
  placeholder = "Search content...",
  size = 'medium',
  onSubmit,
  className = '',
  showButton = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-4 py-3 text-lg'
  };

  const widthClasses = {
    small: 'w-48',
    medium: 'w-64',
    large: 'flex-1'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      if (onSubmit) {
        onSubmit(searchTerm.trim());
      } else {
        navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      }
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={`relative ${showButton ? 'flex' : ''}`}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className={`${widthClasses[size]} ${sizeClasses[size]} border border-gray-300 ${showButton ? 'rounded-l-lg' : 'rounded-lg'} focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500`}
        />
        
        {!showButton ? (
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colours"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 transition-colours"
          >
            Search
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchForm; 