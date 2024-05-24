import React from 'react'
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { getAuth, signOut } from 'firebase/auth'; // Import signOut from Firebase auth
import logo from '../../assest/Logo_btk.png';


function MenuSimpleUseur() {
    const navigate = useNavigate(); // Hook for navigation

    // Logout function
    const handleLogout = async (event) => {
      event.preventDefault(); // Prevent the default link behavior
      const auth = getAuth();
  
      try {
        await signOut(auth);
        console.log('You have been logged out.');
        navigate('/Login'); // Redirect to login page after sign out
      } catch (error) {
        console.error('Error signing out:', error);
      }}
  return (
    <nav>
    <div className="logo-container">
      <img src={logo} alt="BTK Logo" />
    </div>
    <ul>
      <li><Link to="/Homepage_dashbord">Tableaux de bord</Link></li>

      <li>
        {/* Use the Link component but attach the handleLogout function */}
        <Link to="/Login" onClick={handleLogout}>Déconnexion</Link>
      </li>
    </ul>
  </nav>
  )
}

export default MenuSimpleUseur