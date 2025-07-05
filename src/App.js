import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Redirect to the new site
    window.location.replace('https://blog.cevsoc.com');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-600 mb-4">
          This site has moved to{' '}
          <a 
            href="https://blog.cevsoc.com" 
            className="text-blue-600 hover:underline"
          >
            blog.cevsoc.com
          </a>
        </p>
        <p className="text-sm text-gray-500">
          If you are not automatically redirected, please click the link above.
        </p>
      </div>
    </div>
  );
}

export default App; 