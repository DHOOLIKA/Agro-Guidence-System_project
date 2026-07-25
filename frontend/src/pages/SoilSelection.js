import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SoilSelection.css';

const soilData = [
  { id: 'black', ta: 'கரிசல் மண்', en: 'Black Soil', img: 'https://cdn-icons-png.flaticon.com/512/3043/3043516.png' },
  { id: 'red', ta: 'செம்மண்', en: 'Red Soil', img: 'https://cdn-icons-png.flaticon.com/512/3043/3043474.png' },
  { id: 'sandy', ta: 'மணல் மண்', en: 'Sandy Soil', img: 'https://cdn-icons-png.flaticon.com/512/3043/3043472.png' },
  { id: 'late', ta: 'சரளை மண்', en: 'Laterite Soil', img: 'https://cdn-icons-png.flaticon.com/512/3043/3043480.png' }
];

const SoilSelection = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    // Indha wrapper div card-a center-la veikum
    <div className="selection-container">
      <div className="selection-card">
        <div className="header-bg">
          <h2>மண் வகை தேர்வு</h2>
          <p>Soil Type Selection</p>
        </div>

        <div className="soil-grid">
          {soilData.map((soil) => (
            <div 
              key={soil.id} 
              className={`soil-box ${selected === soil.id ? 'active' : ''}`}
              onClick={() => setSelected(soil.id)}
            >
              <div className="image-circle">
                <img src={soil.img} alt={soil.en} />
              </div>
              <div className="name-area">
                <p className="ta-text">{soil.ta}</p>
                <p className="en-text">{soil.en}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="next-btn" onClick={() => navigate('/crop')}>
          தொடரவும் / Next
        </button>
      </div>
    </div>
  );
};

export default SoilSelection;