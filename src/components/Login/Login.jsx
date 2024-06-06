import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Import Firestore
import './LoginCss.css';
import Menu from '../menu/Menu'; // Import MenuAfterLogin

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 // src/components/Login/Login.jsx
const [userRole, setUserRole] = useState(null); // eslint-disable-line no-unused-vars

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      // Fetch user role after successful login
      const db = getFirestore();
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const role = doc.data().role; // Assuming 'role' is the field storing user's role
        setUserRole(role); // Save user role to state
        // Redirect user to appropriate page based on role
        if (role === 'admin') {
          navigate('/Homepage_dashbord');
        } else {
          navigate('/DashbordSimpleUser');
        }
      });
    } catch (error) {
      console.error('Login failed:', error); 
      alert("Invalid email or password. Please try again."); // Handle error response
    }
  };

  return (
    <div className='allpage'>
      <Menu/> {/* Pass user role as prop */}
      <div className="login-container">
        <div className="login-form">
          <h2>Se connecter</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">Connexion</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
