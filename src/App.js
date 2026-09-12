import React from 'react';
import './App.css';
import HomeNavbar from './components/home/HomeNavbar';
import Home from './components/pages/Home';
import Gallery from './components/pages/ArtGallery';
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <HomeNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
