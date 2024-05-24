import React from 'react';
import './Menu.css'; // Corrected import path
import logo from '../../assest/Logo_btk.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Menu() {
  return (
    <nav>
      <div className="logo-container">
        <img src={logo} alt="BTK Logo" />
      </div>
      <ul>
        <li><Link to="/Home">Accueil</Link></li>
        <li><Link to="/Demanderuncompte">Demander un compte</Link></li>
        <li><Link to="/Login">connexion</Link></li> {/* Corrected comment: Use Link instead of anchor tag */}
      </ul>
    </nav>
  );
}

export default Menu;
