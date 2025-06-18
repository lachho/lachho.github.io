import React from 'react';

const SearchAndFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedTags, 
  setSelectedTags, 
  onSearch,
  popularTags 
}) => {
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <section id="content-discovery-hub" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Content Discovery Hub
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find exactly what you need with our intelligent search and filtering system
          </p>
        </div>

        {/* Large Central Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <form onSubmit={onSearch} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for career advice, industry insights, skills, and more..."
              className="w-full px-8 py-6 text-xl border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 shadow-lg"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colours font-medium"
            >
              Search
            </button>
          </form>
        </div>

        {/* Filter Tags */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Filter by Topic
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="px-6 py-3 rounded-full text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colours"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchAndFilter; 