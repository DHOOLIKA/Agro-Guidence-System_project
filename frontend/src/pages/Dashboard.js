import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);

  // Selection page-la irundhu vara ID (Default 'paddy')
  const cropId = location.state?.cropId || 'paddy';

  // 1. Detailed Original Crop Database
  const cropInfo = {
    'paddy': {
      name: "நெல் (Paddy)",
      acres: "12 Acres",
      soil: "Karichal (Black Soil)",
      timeline: "120 நாட்கள் (4 மாதங்கள்)",
      progress: "40%",
      stage: "தூர் கட்டும் நிலை (Tillering Stage)",
      watering: "இன்று 2 முறை (காலை 6:00, மாலை 5:30)",
      fertilizer: "யூரியா - 50kg, பொட்டாஷ் - 25kg (அடுத்த 5 நாட்களில்)",
      aiResult: "இலை கருகல் நோய் (Leaf Blast) அறிகுறி தெரிகிறது.",
      suggestion: "ட்ரைசைக்ளோசோல் (Tricyclozole) 100ml தெளிக்கவும்.",
      tips: [
        "வயலில் 2.5 செ.மீ அளவு நீர் எப்போதும் இருக்குமாறு பார்க்கவும்.",
        "அறுவடைக்கு 10 நாட்களுக்கு முன்பு நீரை வடிக்கவும்.",
        "களைகளை அகற்ற கோனோ வீடர் (Cono Weeder) பயன்படுத்தவும்."
      ]
    },
    'tomato': {
      name: "தக்காளி (Tomato)",
      acres: "5 Acres",
      soil: "Semmann (Red Soil)",
      timeline: "90-100 நாட்கள்",
      progress: "60%",
      stage: "பூக்கும் நிலை (Flowering Stage)",
      watering: "தினமும் ஒருமுறை (சொட்டு நீர் பாசனம் சிறந்தது)",
      fertilizer: "NPK 19:19:19 - வாரம் ஒருமுறை",
      aiResult: "செடி ஆரோக்கியமாக உள்ளது. வெள்ளை ஈக்கள் வர வாய்ப்புள்ளது.",
      suggestion: "மஞ்சள் ஒட்டும் பொறி (Yellow Sticky Trap) வைக்கவும்.",
      tips: [
        "தக்காளி பழங்கள் மண்ணில் படாமல் இருக்க முட்டுக்கொடுக்கவும்.",
        "அதிகப்படியான இலைகளைக் கத்தரித்து (Pruning) காற்றோட்டம் தரவும்.",
        "கால்சியம் குறைபாட்டைத் தவிர்க்க ஜிப்சம் பயன்படுத்தவும்."
      ]
    },
    'sugarcane': {
      name: "கரும்பு (Sugarcane)",
      acres: "8 Acres",
      soil: "Vandhal (Alluvial Soil)",
      timeline: "10-12 மாதங்கள்",
      progress: "25%",
      stage: "தூர் கட்டும் பருவம்",
      watering: "10 நாட்களுக்கு ஒருமுறை (காய்ச்சலும் பாய்ச்சலும் முறை)",
      fertilizer: "அமோனியம் சல்பேட் மற்றும் வேப்பம் புண்ணாக்கு.",
      aiResult: "நுனி குருத்து புழு (Shoot Borer) தாக்குதல் அறிகுறி.",
      suggestion: "கார்போபியூரான் 3ஜி குருணை மருந்தைப் பயன்படுத்தவும்.",
      tips: [
        "5-வது மற்றும் 7-வது மாதத்தில் காய்ந்த தோகைகளை உரிக்கவும்.",
        "மண்ணை அணைத்து (Earthing up) வேர் வளர்ச்சியைத் தூண்டவும்.",
        "அதிகப்படியான தூர் பிடிக்க யூரியா பயன்படுத்தவும்."
      ]
    },
    'maize': {
      name: "மக்காச்சோளம் (Maize)",
      acres: "10 Acres",
      soil: "Loamy Soil",
      timeline: "100-110 நாட்கள்",
      progress: "50%",
      stage: "கதிர் வரும் பருவம்",
      watering: "பூக்கும் போது மற்றும் கதிர் வரும் போது நீர் கட்டாயம்.",
      fertilizer: "துத்தநாக சல்பேட் (Zinc Sulphate) - 10kg/Acre.",
      aiResult: "படைப்புழு (Fall Armyworm) தாக்குதல் வாய்ப்பு அதிகம்.",
      suggestion: "வேப்பங்கொட்டை கரைசல் 5% தெளிக்கவும்.",
      tips: [
        "பயிர்களுக்கு இடையே சரியான இடைவெளியைப் பராமரிக்கவும்.",
        "களைகள் வராமல் தடுக்க அட்ரசின் (Atrazine) தெளிக்கவும்.",
        "கதிர் முற்றும் வரை போதிய ஈரப்பதம் அவசியம்."
      ]
    }
  };

  const current = cropInfo[cropId] || cropInfo['paddy'];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) alert(`${current.name} Photo Analysis Started...`);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        {/* Header with detailed stats */}
        <div className="dash-header">
          <div className="header-main">
            <h2>{current.name} Dashboard</h2>
            <div className="status-badge">Live Update</div>
          </div>
          <div className="header-stats">
            <div className="stat-item">🚜 <b>Land:</b> {current.acres}</div>
            <div className="stat-item">🌑 <b>Soil:</b> {current.soil}</div>
            <div className="stat-item">📅 <b>Age:</b> {current.stage}</div>
          </div>
        </div>

        <div className="dash-content-grid">
          {/* 1. Timeline & Progress */}
          <div className="status-box highlight">
            <h4>பயிர் வளர்ச்சி நிலை (Timeline)</h4>
            <div className="timeline-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: current.progress}}></div>
              </div>
              <p className="progress-txt">{current.progress} Completed</p>
            </div>
            <p>மொத்த காலம்: <b>{current.timeline}</b></p>
          </div>

          {/* 2. Advanced Watering & Fertilizer */}
          <div className="status-box info-card">
            <h4>நீர் & உரம் (Water & Fertilizer)</h4>
            <div className="detail-row">
              <p>💧 <b>நீர்:</b> {current.watering}</p>
              <p>🧪 <b>உரம்:</b> {current.fertilizer}</p>
            </div>
          </div>

          {/* 3. AI Disease Detection */}
          <div className="status-box upload-section">
            <h4>AI நோய் கண்டறிதல் & தீர்வு</h4>
            <div className="upload-container">
              <input type="file" id="crop-up" onChange={handleFileUpload} hidden />
              <label htmlFor="crop-up" className="upload-label">📸 Upload Crop Photo</label>
              {selectedFile && <p className="file-name">Selected: {selectedFile.name}</p>}
            </div>
            <div className="ai-report">
              <p className="report-txt">🔍 <b>ஆய்வு:</b> {current.aiResult}</p>
              <p className="suggest-txt">✅ <b>தீர்வு:</b> {current.suggestion}</p>
            </div>
          </div>

          {/* 4. Expert Agriculture Tips */}
          <div className="status-box tips-list">
            <h4>விவசாய நுணுக்கங்கள் (Expert Tips)</h4>
            <ul>
              {current.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;