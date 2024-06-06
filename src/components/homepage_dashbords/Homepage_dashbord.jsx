import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuAfterLogin from '../MenuAfterLogin/MenuAfterLogin';
import './Homepage_dashbord.css';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaljt3wRPRHgIJHly8Um_bPLReWXAH4Do",
  authDomain: "site-btk-pfe.firebaseapp.com",
  projectId: "site-btk-pfe",
  storageBucket: "site-btk-pfe.appspot.com",
  messagingSenderId: "1078594678116",
  appId: "1:1078594678116:web:67ee5a5df44f744c81de71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Homepage_dashbord() {
  const [showIframe, setShowIframe] = useState(true); // Set to true by default
  const [showDashboardRequest, setShowDashboardRequest] = useState(false);
  const [file, setFile] = useState(null);
  const [dashboardName, setDashboardName] = useState('');
  const [description, setDescription] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pin, setPin] = useState('');
  const [iframeSrc, setIframeSrc] = useState("http://localhost:4848/single/?appid=C%3A%5CUsers%5Cshiri%5COneDrive%5CDocuments%5CQlik%5CSense%5CApps%5Ccommercial.qvf&sheet=92389320-b43b-4b01-85f9-47874976f67e&theme=horizon&opt=ctxmenu,currsel"); // Set default iframe URL

  const handleCompteClick = () => {
    setShowIframe(true);
    setShowDashboardRequest(false);
    setIframeSrc("http://localhost:4848/single/?appid=C%3A%5CUsers%5Cshiri%5COneDrive%5CDocuments%5CQlik%5CSense%5CApps%5Ccommercial.qvf&sheet=92389320-b43b-4b01-85f9-47874976f67e&theme=horizon&opt=ctxmenu,currsel");
  };

  const handleVenteCarteClick = () => {
    setShowIframe(true);
    setShowDashboardRequest(false);
    setIframeSrc("http://localhost:4848/single/?appid=C%3A%5CUsers%5Cshiri%5COneDrive%5CDocuments%5CQlik%5CSense%5CApps%5Cvente%20carte.qvf&sheet=5142f3cd-a519-4cb8-87a9-6662b10ab91b&theme=horizon&opt=ctxmenu,currsel");
  };
  
  const handleCreditClick = () => {
    setShowIframe(true);
    setIframeSrc("http://localhost:4848/single/?appid=C%3A%5CUsers%5Cshiri%5COneDrive%5CDocuments%5CQlik%5CSense%5CApps%5Ccredit.qvf&sheet=5d677902-712e-4bfd-9ce4-a7d31e48544f&theme=horizon&opt=ctxmenu,currsel");
  };
  
 

  const handleResiliation_carte_Click = () => {
    setShowIframe(true);
    setIframeSrc("http://localhost:4848/single/?appid=C%3A%5CUsers%5Cshiri%5COneDrive%5CDocuments%5CQlik%5CSense%5CApps%5CResiliation_carte.qvf&sheet=97630e0b-fccc-4c64-beb5-adb6337ef8aa&theme=horizon&opt=ctxmenu,currsel");
  };

  const handleVentePackClick = () => {
    setShowIframe(true);
    setIframeSrc("http://localhost:4848/single/?appid=C%3A%5CUsers%5Cshiri%5COneDrive%5CDocuments%5CQlik%5CSense%5CApps%5Cvente_pack.qvf&sheet=2622005e-e8af-400d-a470-875e9179b743&theme=horizon&opt=ctxmenu,currsel");
  }; 

  const handleClotureCompteClick = () => {
    setShowIframe(true);
    setIframeSrc("http://localhost:4848/single/?appid=C%3A%5CUsers%5Cshiri%5COneDrive%5CDocuments%5CQlik%5CSense%5CApps%5Ccloture_compte.qvf&sheet=6b18be7b-b939-405e-ab15-8e9d7b2e8c9b&theme=horizon&opt=ctxmenu,currsel");
  }

  const handleDashboardRequestClick = () => {
    setShowDashboardRequest(true);
    setShowIframe(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    console.log('Form submitted');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('dashboardName', dashboardName);
    formData.append('description', description);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('pin', pin);

    try {
      const response = await axios.post('http://localhost:5002/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from server:', response.data);
      alert('File uploaded and info saved successfully');

      // Save request info to Firebase
      await addDoc(collection(db, 'dashbords'), {
        dashboardName,
        description,
        firstName,
        lastName,
        pin,
        status: 'non traiter',
        timestamp: new Date()
      });
      console.log('Request info saved to Firebase');
    } catch (error) {
      console.error('Error uploading file or saving info:', error);
      alert('Error uploading file or saving info');
    }
  };

  return (
    <div>
      <div className='menu-after-login'>
        <MenuAfterLogin />
      </div>
      <div className="vertical-navbar">
        <ul>
          <li><br />
            <p>Commercial dashboards:</p>
            <ul className="sub-menu">
              <li><Link to="#" onClick={handleCreditClick}>Credit</Link></li>
              <li><Link to="#" onClick={handleCompteClick}>Creation Compte</Link></li>
              <li><Link to="#" onClick={handleVenteCarteClick}>Vente Carte</Link></li>
              <li><Link to="#" onClick={handleVentePackClick}>Vente Pack</Link></li>
              <li><Link to="#"onClick={handleClotureCompteClick}>Cloture Compte</Link></li>
              <li><Link to="#" onClick={handleResiliation_carte_Click}>Resiliation Carte</Link></li>
              
            </ul>
          </li>
          <li>
            <Link to="#" onClick={handleDashboardRequestClick}>Demander un Dashboard</Link>
          </li>
        </ul>
      </div>
      <div className="content"><br />
        {showIframe && (
          <iframe
            src={iframeSrc}
            title="CommercialDashboardIframe" // Add a unique title
            style={{ border: 'none', width: '100%', height: '100%' }}
          ></iframe>
        )}
        {showDashboardRequest && (
          <div className="dashboard-request">
            <center><h2>Demande de Dashboard</h2></center>
            <form onSubmit={handleFileUpload} className="form-center">
              <div className="form-group">
                <label>
                  Nom: <br />
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Prénom:
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  PIN bancaire:
                  <input
                    type="text"
                    name="pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Nom du Dashboard:
                  <input
                    type="text"
                    name="dashboardName"
                    value={dashboardName}
                    onChange={(e) => setDashboardName(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Description:
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </label>
              </div>
              <div className="form-group">
                <label>
                  Import Excel File:
                  <input type="file" onChange={handleFileChange} />
                </label>
              </div>
              <center><button type="submit">Envoyer la demande</button></center>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage_dashbord;
