import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Projects from './components/pages/Projects';
import Photos from './components/pages/Photos';
import Graphic from './components/pages/Graphic';
import About from './components/pages/About';
import ArtGallery from "./pages/ArtGallery";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photography" element={<Photos />} />
          <Route path="/graphicdesign" element={<Graphic />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/artgallery" element={<ArtGallery />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;