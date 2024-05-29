import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuSimpleUser from '../MenuSimpleUseur/MenuSimpleUseur';
import './DashbordSimpleUser.css';

function DashbordSimpleUser() {
    const [showIframe, setShowIframe] = useState(false);
    const [file, setFile] = useState(null);
    const [iframeSrc, setIframeSrc] = useState('');

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

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <div>
            <div className='menu-after-login'>
                <MenuSimpleUser />
            </div>
            <div className="vertical-navbar">
                <ul>
                    <li><br />
                        <p>Commercial dashboards:</p>
                        <ul className="sub-menu">
                            <li><Link to="#" onClick={handleCompteClick}>Creation Compte</Link></li>
                            <li><Link to="#">Cloture Compte</Link></li>
                            <li><Link to="#" onClick={handleVenteCarteClick}>Vente Carte</Link></li>
                            <li><Link to="#" onClick={handleVenteCarteClick}>Resiliation Carte</Link></li>
                            <li><Link to="#">Vente Pack</Link></li>
                            <li><Link to="#" onClick={handleCreditClick}>Credit</Link></li>
                            <li><Link to="#">EER</Link></li>
                            
                        </ul>
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
            </div>
        </div>
    );
}

export default DashbordSimpleUser;
