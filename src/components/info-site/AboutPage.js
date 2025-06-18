import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../resume-analyser/Footer';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Career Compass</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted guide for navigating the modern career landscape, providing expert insights, 
            practical tools, and comprehensive resources for professional success.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Career Compass exists to bridge the gap between academic achievement and professional success. 
            We understand that the transition from university to career can be challenging, and we're here 
            to provide the guidance, tools, and insights you need to navigate this journey with confidence.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our platform combines cutting-edge resume analysis technology with comprehensive career guidance 
            content, ensuring you have both the practical tools and knowledge needed to succeed in today's 
            competitive job market.
          </p>
        </div>

        {/* What We Offer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Resume Analysis</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our advanced AI-powered resume analyser provides detailed feedback on your CV, helping you 
              identify areas for improvement and optimise your application materials for success.
            </p>
            <Link 
              to="/resume-analyser" 
              className="inline-block mt-4 text-blue-600 font-semibold hover:text-blue-800 transition-colours"
            >
              Try Resume Analyser →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Career Guidance</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Access a comprehensive library of career development resources, from resume writing tips 
              to interview strategies and industry-specific insights that help you stand out.
            </p>
            <Link 
              to="/" 
              className="inline-block mt-4 text-green-600 font-semibold hover:text-green-800 transition-colours"
            >
              Explore Content →
            </Link>
          </div>
        </div>

        {/* Our Approach */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Evidence-Based</h4>
              <p className="text-gray-600 text-sm">
                Our advice is grounded in current industry research and real-world hiring practices.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Practical Focus</h4>
              <p className="text-gray-600 text-sm">
                Every piece of content is designed to provide actionable insights you can implement immediately.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Continuously Updated</h4>
              <p className="text-gray-600 text-sm">
                We regularly update our content to reflect the latest trends and changes in the job market.
              </p>
            </div>
          </div>
        </div>

        {/* Content Categories Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What You'll Find Here</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <span className="text-3xl mr-4">🎯</span>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Career Guidance</h4>
                <p className="text-gray-600">
                  Comprehensive guides on resume writing, interview preparation, networking strategies, 
                  and professional development to help you succeed at every stage of your career.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="text-3xl mr-4">🏢</span>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Industry Insights</h4>
                <p className="text-gray-600">
                  Deep dives into various industries including technology, finance, healthcare, and more. 
                  Understand market trends, skill requirements, and career opportunities.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="text-3xl mr-4">📈</span>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Professional Development</h4>
                <p className="text-gray-600">
                  Strategies for continuous learning, skill enhancement, leadership development, 
                  and building a successful long-term career trajectory.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Powered by Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our resume analyser uses advanced natural language processing and machine learning 
                algorithms to provide detailed, personalised feedback on your CV.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The platform is built with modern web technologies including React, Tailwind CSS, 
                and follows accessibility best practices to ensure an optimal experience for all users.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-4">🤖</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Analysis</h4>
                <p className="text-gray-600 text-sm">
                  Advanced algorithms provide insights similar to professional resume reviewers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Advance Your Career?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're just starting your career journey or looking to make a strategic move, 
            Career Compass has the tools and insights you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/resume-analyser"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colours shadow-lg"
            >
              Analyse Your Resume
            </Link>
            <Link
              to="/"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colours"
            >
              Explore Content
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage; 