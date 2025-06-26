import React from 'react';
import { Link } from 'react-router-dom';

const ErrorDisplay = ({ error }) => {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-red-600">An Error Occurred</h1>
      <p className="text-gray-700 mt-4">{error}</p>
      <Link 
        to="/articles" 
        className="mt-6 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colours"
      >
        Back to Article Library
      </Link>
    </div>
  );
};

export default ErrorDisplay; 