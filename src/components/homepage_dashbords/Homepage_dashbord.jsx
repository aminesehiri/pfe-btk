import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuAfterLogin from '../MenuAfterLogin/MenuAfterLogin';
import './Homepage_dashbord.css';
import axios from 'axios';

function Homepage_dashbord() {
  const [showIframe, setShowIframe] = useState(false);
  const [showDashboardRequest, setShowDashboardRequest] = useState(false);
  const [file, setFile] = useState(null);
  const [dashboardName, setDashboardName] = useState('');
  const [description, setDescription] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pin, setPin] = useState('');
  const [iframeSrc, setIframeSrc] = useState('');

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
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
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
              <li><Link to="#" onClick={handleCompteClick}>Creation Compte</Link></li>
              <li><Link to="#" onClick={handleVenteCarteClick}>Vente Carte</Link></li>
              <li><Link to="#">Vente Pack</Link></li>
              <li><Link to="#">EER</Link></li>
              <li><Link to="#">Credit</Link></li>
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
            style={{ border: 'none', width: '100%', height: '100%' }}
          ></iframe>
        )}
        {showDashboardRequest && (
          <div className="dashboard-request">
            <center><h2>Demande de Dashboard</h2></center>
            <form onSubmit={handleFileUpload}>
              <label>
                Nom:
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <br />
              <label>
                Prénom:
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <br />
              <label>
                PIN bancaire:
                <input
                  type="password"
                  name="pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
              </label>
              <br />
              <label>
                Nom du Dashboard:
                <input
                  type="text"
                  name="dashboardName"
                  value={dashboardName}
                  onChange={(e) => setDashboardName(e.target.value)}
                />
              </label>
              <br />
              <label>
                Description:
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </label>
              <br />
              <label>
                Import Excel File:
                <input type="file" onChange={handleFileChange} />
              </label>
              <br />
              <center><button type="submit">Envoyer la demande</button></center>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage_dashbord;
