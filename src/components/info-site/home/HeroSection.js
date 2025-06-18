import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ onExploreClick }) => {
  return (
    <section className="h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 text-white flex items-center justify-center w-full pb-20 sm:pb-32">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
          Career Compass
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white">
          Your Blueprint for Graduate Success
        </h2>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
          Discover expert advice, industry insights, and professional development resources to accelerate your career journey from graduate to industry leader.
        </p>
        
        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={onExploreClick}
            className="px-10 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Explore Career Guidance
          </button>
          <Link
            to="/resume-analyser"
            className="px-10 py-4 border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg inline-block"
          >
            Analyse Your Resume
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 