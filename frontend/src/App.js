import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

// Pages Import
import Home from './pages/Home';
import Login from './pages/Login';
import SoilSelection from './pages/SoilSelection';
import CropSelection from './pages/CropSelection';
import LandArea from './pages/LandArea';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    // Indha LanguageProvider thaan mukkiyam!
    <LanguageProvider>
      <Router>
        <div className="main-app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/soil" element={<SoilSelection />} />
            <Route path="/crop" element={<CropSelection />} />
            <Route path="/land" element={<LandArea />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;