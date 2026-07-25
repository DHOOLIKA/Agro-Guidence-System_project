import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './LandArea.css';

const LandArea = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [area, setArea] = useState('');

  const handleNext = () => {
    if (area) {
      navigate('/dashboard'); // Land area mudichathum Dashboard-ku pogum
    } else {
      alert(lang === 'ta' ? "நிலத்தின் அளவை உள்ளிடவும்" : "Please enter land area");
    }
  };

  return (
    <div className="land-page-container">
      <div className="land-main-card">
        <div className="land-header">
          <h2 className="land-title">{lang === 'ta' ? 'நிலத்தின் அளவு' : 'Land Area'}</h2>
          <p className="land-subtitle">{lang === 'ta' ? 'விவரங்களை உள்ளிடவும்' : 'Enter your land details'}</p>
        </div>

        <div className="land-input-section">
          <label className="land-label">
            {lang === 'ta' ? 'நிலத்தின் அளவு (ஏக்கரில்):' : 'Land Area (in Acres):'}
          </label>
          <input 
            type="number" 
            placeholder="Ex: 5" 
            className="land-input-field"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>

        <button className="land-next-btn" onClick={handleNext}>
          {lang === 'ta' ? 'தொடரவும் / Dashboard' : 'Continue / Dashboard'}
        </button>
      </div>
    </div>
  );
};

export default LandArea;