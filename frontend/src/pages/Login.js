import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Webcam from 'react-webcam'; 
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage(); 
  const webcamRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [name, setName] = useState(""); 

  // English to Tamil Transliteration Logic
  const handleNameChange = async (e) => {
    const val = e.target.value;
    setName(val); 

    // Space (' ') amukkuna udanae conversion nadakkum
    if (lang === 'ta' && val.length > 0 && val.endsWith(' ')) {
      const trimmedVal = val.trim().toLowerCase();

      // --- MUKKIYAM: Inga unga name spelling-ai correct-ah update pannikonga ---
      const specialNames = {
        "dhoolika": "தூலிகா",
        "saravanan": "சரவணன்",
        "saravana": "சரவணா",
        "agro": "அக்ரோ"
      };

      if (specialNames[trimmedVal]) {
        // Dictionary-la match aana udanae sariyaana Tamil name set aagidum
        setName(specialNames[trimmedVal] + ' '); 
        return;
      }

      // Dictionary-la illadha peyargalukku Google API Call
      try {
        const res = await axios.get(
          `https://inputtools.google.com/request?text=${trimmedVal}&itc=ta-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=test`
        );
        
        if (res.data[0] === 'SUCCESS') {
          const tamilName = res.data[1][0][1][0];
          setName(tamilName + ' '); 
        }
      } catch (err) {
        console.error("Transliteration error", err);
      }
    }
  };

  const handleFaceLogin = useCallback(async () => {
    if (lang === 'ta' && !name.trim()) {
      alert("தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்!");
      return;
    }
    setIsScanning(true);
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      alert("கேமரா தயாராகவில்லை.");
      setIsScanning(false);
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/register_face", {
        name: name.trim(),
        image: imageSrc
      });
      if (response.data.status === "success") {
        setTimeout(() => {
          setIsScanning(false);
          alert(`வெற்றி! ${name.trim()} பதிவு செய்யப்பட்டது.`);
          navigate('/soil');
        }, 1500);
      }
    } catch (err) {
      setIsScanning(false);
      alert("Backend server connection failed!");
    }
  }, [name, lang, navigate]);

  return (
    <div className="login-full-page" style={{ 
      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/agriculture_bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className="login-sharp-card" style={{ background: 'rgba(255, 255, 255, 0.95)', padding: '40px', borderRadius: '25px', width: '400px', textAlign: 'center' }}>
        <h2 style={{ color: '#1b4332' }}>உள்நுழைவு</h2>
        <p>பெயரை ஆங்கிலத்தில் தட்டச்சு செய்து 'Space' அழுத்தவும்</p>
        
        <input 
          type="text" 
          placeholder="Ex: dhoolika" 
          className="sharp-input-fixed"
          value={name} 
          onChange={handleNameChange}
          style={{ 
            width: '90%', 
            padding: '12px', 
            fontSize: '18px', 
            fontWeight: 'bold', 
            textAlign: 'center',
            border: '2px solid #1b4332',
            borderRadius: '10px'
          }}
        />

        <div style={{ position: 'relative', width: '280px', height: '280px', margin: '20px auto', border: '5px solid #1b4332', borderRadius: '20px', overflow: 'hidden' }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="scan-line" style={{ 
            position: 'absolute', 
            top: 0, 
            width: '100%', 
            height: '4px', 
            background: '#27ae60', 
            boxShadow: '0 0 10px #27ae60',
            animation: 'scan 2.5s infinite ease-in-out'
          }}></div>
        </div>
        
        <p style={{ fontWeight: 'bold' }}>{isScanning ? "சரிபார்க்கப்படுகிறது..." : "கேமராவை நேராக பார்க்கவும்"}</p>

        <button 
          onClick={handleFaceLogin}
          style={{ 
            backgroundColor: '#1b4332', 
            color: 'white', 
            padding: '15px 30px', 
            border: 'none', 
            borderRadius: '10px', 
            fontSize: '18px', 
            cursor: 'pointer',
            width: '100%'
          }}
        >
          பதிவு செய்து உள்நுழை
        </button>
      </div>
    </div>
  );
};

export default Login;