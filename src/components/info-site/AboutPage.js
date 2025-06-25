import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Career Compass</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unsure about the job process? Here to help. I've put together this website to provide some clarity on jobs, 
            applications and the future. 
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Hi, I'm Lachlan</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            I'm a final year computer science/civil engineering undergraduate at UNSW. Next year, I'm starting a 
            graduate role as a full stack developer (not civil ik) at Macquarie Bank. In my free time I like to go to 
            the gym and boulder, and recently took up an interest in drawing. 
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            I understand the struggle of finding a job and really wished I had something like this when I was younger, 
            so here it is!
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            How reliable is the information on this site?
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Everything here is basically my heavily researched opinion, accumulated wisdom from myself and those before me gathered from years of research, practice and failures. 
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Take everything with a grain of salt, and question everything I say. If you think my advice isn't going to work for you, 100% do not listen to me. This may have worked for me, but you're not me! You know best for you so trust your gut. Additionally, times have changed (about only 6 months) but still. 
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            However, some stats about me over the past year:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Job Applications submitted: 70</li>
            <li>Online Assessments/Interviews completed: 47</li>
            <li>Interviews: 11</li>
            <li>Networking Events attended: 10</li>
            <li>Rejections: 40</li>
            <li>Times Ghosted: 20+</li>
            <li>Offers: 2</li>
          </ul>
          <p className="text-lg text-gray-700 leading-relaxed">
            I've experienced the ups and downs and got through it in the end. 
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Hang in there and I believe in you. 
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 sm:mr-4">🔗 Connect with me:</h3>
          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/lachlanho"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            
            <a
              href="mailto:lachlan.ho@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colours shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89c.39.39 1.02.39 1.41 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
            
            <a
              href="https://github.com/lachho"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colours shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Our Approach */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What you'll Find Here</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Career Guidance</h4>
              <p className="text-gray-600 text-sm">
                Grounded, realistic guides written from a student's perspectives to help you succeed.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Practical Professional Development</h4>
              <p className="text-gray-600 text-sm">
                Every piece of content is designed to provide actionable insights you can implement immediately.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Industry Insights</h4>
              <p className="text-gray-600 text-sm">
                Strategies for continuous learning, skill enhancement, leadership development, 
                and building a successful long-term career trajectory.
              </p>
            </div>
          </div>
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
              <h3 className="text-2xl font-bold text-gray-900">Resume Analyser</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              The AI-powered resume analyser provides detailed feedback on your CV, helping you 
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
              to interview strategies and industry-specific insights to help you stand out.
            </p>
            <Link 
              to="/articles" 
              className="inline-block mt-4 text-green-600 font-semibold hover:text-green-800 transition-colours"
            >
              Explore Content →
            </Link>
          </div>
        </div>


        {/* Technology Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Powered by Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                The platform is built with modern web technologies including React, Tailwind CSS, 
                and follows accessibility best practices to ensure an optimal experience for all users.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-4">🤖</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Analysis</h4>
                <p className="text-gray-600 text-md">
                  Advanced algorithms provide insights similar to industry resume reviewers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're just starting your career journey or looking to get ahead, 
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
              to="/articles"
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