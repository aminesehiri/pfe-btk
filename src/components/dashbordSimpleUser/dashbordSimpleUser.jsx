import MenuSimpleUser from '../MenuSimpleUseur/MenuSimpleUseur';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './DashbordSimpleUser.css';

function Homepage_dashbord() {
  const [showIframe, setShowIframe] = useState(true); // Set to true by default
  const [iframeSrc, setIframeSrc] = useState("http://localhost:4848/single/?appid=C%3A%5CUsers%5Cshiri%5COneDrive%5CDocuments%5CQlik%5CSense%5CApps%5Ccredit.qvf&sheet=5d677902-712e-4bfd-9ce4-a7d31e48544f&theme=horizon&opt=ctxmenu,currsel"); // Set default iframe URL to credit dashboard

  const handleCompteClick = () => {
    setShowIframe(true);
    setIframeSrc("http://localhost:4848/single/?appid=C%3A%5CUsers%5Cshiri%5COneDrive%5CDocuments%5CQlik%5CSense%5CApps%5Ccommercial.qvf&sheet=92389320-b43b-4b01-85f9-47874976f67e&theme=horizon&opt=ctxmenu,currsel");
  };

  const handleVenteCarteClick = () => {
    setShowIframe(true);
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

  return (
    <div>
      <div className='menu-after-login'>
        <MenuSimpleUser />
      </div>
      <div className="vertical-navbar">
        <ul>
          <li><br />
            <p>Tableau de bord commercial:</p>
            <ul className="sub-menu">
              <li><Link to="#" onClick={handleCreditClick}>Credit</Link></li>
              <li><Link to="#" onClick={handleCompteClick}>Creation Compte</Link></li>
              <li><Link to="#" onClick={handleVenteCarteClick}>Vente Carte</Link></li>
              <li><Link to="#" onClick={handleVentePackClick}>Vente Pack</Link></li>
              <li><Link to="#" onClick={handleClotureCompteClick}>Clôture Compte</Link></li>
              <li><Link to="#" onClick={handleResiliation_carte_Click}>Résiliation Carte</Link></li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="content"><br />
        {showIframe && (
          <iframe
            src={iframeSrc}
            title="DashboardIframe" // Add a unique title
            style={{ border: 'none', width: '100%', height: '100%' }}
          ></iframe>
        )}
      </div>
    </div>
  );
}

export default Homepage_dashbord;
