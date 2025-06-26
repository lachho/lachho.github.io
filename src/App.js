import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import MainPage from './components/resume-analyser/MainPage';
import JobDescription from './components/resume-analyser/JobDescription';

// Import info site components
import Navigation from './components/info-site/navigation/Navigation';
import SidebarNavigation from './components/info-site/navigation/SidebarNavigation';
import InfoHomePage from './components/info-site/InfoHomePage';
import ContentPage from './components/info-site/ContentPage';
import SearchResults from './components/info-site/SearchResults';
import AboutPage from './components/info-site/AboutPage';

function Layout() {
  const location = useLocation();
  
  // Safely get pathname
  const currentPath = location?.pathname || '/';
  
  // Determine if we should show the sidebar (for content pages)
  const shouldShowSidebar = currentPath.startsWith('/articles') || 
                           currentPath === '/search';
  
  return (
    <div className="min-h-screen">
      <Navigation />
      {shouldShowSidebar && <SidebarNavigation />}
      
      {/* Updated layout to centre content properly */}
      <div className={`pt-16 ${shouldShowSidebar ? 'lg:ml-80' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <InfoHomePage />
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "resume-analyser",
        element: <MainPage />
      },
      {
        path: "job-description",
        element: <JobDescription />
      },
      {
        path: "search",
        element: <SearchResults />
      },
      {
        path: "articles/*",
        element: <ContentPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App; 