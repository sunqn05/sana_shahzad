import React, { useCallback, useState } from 'react';
import './App.css';
import HomeNavbar from './components/home/HomeNavbar';
import LoadingScreen from './components/home/LoadingScreen';
import Home from './components/pages/Home';
import Gallery from './components/pages/ArtGallery';
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';

function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(() => {
    if (typeof window === 'undefined') return false;
    const initialHash = window.location.hash;
    const opensOnHero = !initialHash || initialHash === '#home-main';
    return window.location.pathname === '/' && opensOnHero;
  });
  const handleLoadingComplete = useCallback(() => setShowLoadingScreen(false), []);

  return (
    <Router>
      <ScrollToTop />
      <HomeNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showLoadingScreen && <LoadingScreen onComplete={handleLoadingComplete} />}
    </Router>
  );
}

export default App;
