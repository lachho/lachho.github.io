import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/resume-analyser/MainPage';
import JobDescription from './components/resume-analyser/JobDescription';

// Import info site components
import Navigation from './components/info-site/Navigation';
import InfoHomePage from './components/info-site/InfoHomePage';
import ContentPage from './components/info-site/ContentPage';
import SearchResults from './components/info-site/SearchResults';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<InfoHomePage />} />
        <Route path="/resume-analyser" element={<MainPage />} />
        <Route path="/job-description" element={<JobDescription />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/content/*" element={<ContentPage />} />
      </Routes>
    </Router>
  );
}

export default App; 