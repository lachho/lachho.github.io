import React, { useState, useEffect } from 'react';
import Footer from '../resume-analyser/Footer';
import HeroSection from './home/HeroSection';
import MainContent from './home/MainContent';

const InfoHomePage = () => {
  const scrollToContentHub = () => {
    const contentHub = document.getElementById('content-discovery-hub');
    if (contentHub) {
      contentHub.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <HeroSection onExploreClick={scrollToContentHub} />

      {/* Main Content Section */}
      <div id="content-discovery-hub">
        <MainContent/>
      </div>

      <Footer />
    </div>
  );
};

export default InfoHomePage; 