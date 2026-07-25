import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './CropSelection.css';

const cropData = [
  { id: 'paddy', ta: 'நெல்', en: 'Paddy', img: '🌾' },
  { id: 'maize', ta: 'மக்காச்சோளம்', en: 'Maize', img: '🌽' },
  { id: 'tomato', ta: 'தக்காளி', en: 'Tomato', img: '🍅' },
  { id: 'groundnut', ta: 'நிலக்கடலை', en: 'Groundnut', img: '🥜' },
  { id: 'sugarcane', ta: 'கரும்பு', en: 'Sugarcane', img: '🎋' },
  { id: 'tapioca', ta: 'மரவள்ளிக்கிழங்கு', en: 'Tapioca', img: '🍠' }
];

const CropSelection = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const handleNext = () => {
    if (!selectedCrop) {
      alert(lang === 'ta' ? 'தயவுசெய்து ஒரு பயிரைத் தேர்ந்தெடுக்கவும்' : 'Please select a crop');
      return;
    }
    // Dashboard-ku select panna crop ID-ah anuppuroam
    navigate('/dashboard', { state: { cropId: selectedCrop } });
  };

  return (
    <div className="crop-page-container">
      <div className="crop-main-card">
        <div className="crop-header">
          <h2>பயிர் தேர்வு</h2>
          <p className="sub-title">Crop Selection</p>
        </div>

        <div className="crop-grid">
          {cropData.map((crop) => (
            <div 
              key={crop.id} 
              className={`crop-item-card ${selectedCrop === crop.id ? 'selected' : ''}`}
              onClick={() => setSelectedCrop(crop.id)}
            >
              <div className="crop-icon">{crop.img}</div>
              <div className="crop-info">
                <p className="crop-ta">{crop.ta}</p>
                <p className="crop-en">{crop.en}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="crop-next-btn" onClick={handleNext}>
          {lang === 'ta' ? 'தொடரவும் / Next' : 'Continue / Next'}
        </button>
      </div>
    </div>
  );
};

export default CropSelection;