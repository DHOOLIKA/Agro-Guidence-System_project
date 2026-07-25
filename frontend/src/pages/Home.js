import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage(); // setLang function-ah context-la irunthu edukkurom

  // Language switch panna intha function-ah use pannunga
  const handleLangChange = (selectedLang) => {
    setLang(selectedLang); 
  };

  return (
    <div className="home-full-page">
      <div className="hero-overlay">
        <div className="hero-content">
          {/* Language conditional text */}
          <h1 className="hero-title">
            {lang === 'ta' ? (
              <>வளமான விவசாயம்,<br/>உங்கள் மென்பொருள்!</>
            ) : (
              <>Rich Farming,<br/>Your Software!</>
            )}
          </h1>
          
          <p className="hero-subtitle">Smart Farming, Smart Solutions!</p>
          
          <div className="hero-lang-group">
            <button 
              className={`hero-lang-btn ${lang === 'ta' ? 'active' : ''}`} 
              onClick={() => handleLangChange('ta')}
            >
              தமிழ் / Tamil
            </button>
            <button 
              className={`hero-lang-btn ${lang === 'en' ? 'active' : ''}`} 
              onClick={() => handleLangChange('en')}
            >
              English
            </button>
          </div>

          <button className="hero-get-started" onClick={() => navigate('/login')}>
            {lang === 'ta' ? 'தொடங்கவும்' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;