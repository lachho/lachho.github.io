import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { contentStructure, getAllArticles } from '../../data/contentStructure';
import Footer from '../resume-analyser/Footer';

const InfoHomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const allArticles = getAllArticles();
  
  // Get featured articles (first 3 articles)
  const featuredArticles = allArticles.slice(0, 3);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-200 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Career Compass
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover expert advice, industry insights, and professional development resources to accelerate your career journey.
            </p>
            
            {/* Hero Search */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for career advice, industry insights, skills..."
                  className="w-full px-6 py-4 text-lg text-gray-900 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colours"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/content/career-guidance"
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colours inline-block"
              >
                Explore Career Guidance
              </Link>
              <Link
                to="/resume-analyser"
                className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-colours inline-block"
              >
                Analyse Your Resume
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Content
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and impactful career development resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-2">
                      {contentStructure[article.category].icon}
                    </span>
                    <span className="text-sm text-blue-600 font-medium">
                      {article.categoryTitle}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={article.path}
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colours"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/search"
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colours inline-block"
            >
              View All Content
            </Link>
          </div>
        </div>
      </section>

      {/* Content Categories Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Explore by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Navigate through our organised content categories to find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(contentStructure).map(([categoryKey, category]) => (
              <Link
                key={categoryKey}
                to={`/content/${categoryKey}`}
                className="group bg-gray-50 rounded-lg p-8 text-center hover:bg-blue-50 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="text-sm text-gray-500">
                  {Object.keys(category.subcategories).length} subcategories
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {allArticles.length}+
              </div>
              <div className="text-gray-600">Expert Articles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Object.keys(contentStructure).length}
              </div>
              <div className="text-gray-600">Content Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Object.values(contentStructure).reduce((total, category) => 
                  total + Object.keys(category.subcategories).length, 0
                )}
              </div>
              <div className="text-gray-600">Specialisations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Free Content</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InfoHomePage; 