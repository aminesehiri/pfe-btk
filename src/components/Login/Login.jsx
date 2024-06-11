import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import './LoginCss.css';
import Menu from '../menu/Menu';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');

      const db = getFirestore();
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const role = doc.data().role;
        setUserRole(role);
        if (role === 'admin') {
          navigate('/Homepage_dashbord');
        } else {
          navigate('/DashbordSimpleUser');
        }
      });
    } catch (error) {
      console.error('Login failed:', error); 
      alert("Email ou mot de passe incorrect. Veuillez réessayer.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Veuillez d'abord entrer votre adresse e-mail.");
      return;
    }
    
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("E-mail de réinitialisation du mot de passe envoyé ! Veuillez vérifier votre boîte de réception.");
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail de réinitialisation du mot de passe :', error);
      alert("Erreur lors de l'envoi de l'e-mail de réinitialisation du mot de passe. Veuillez réessayer.");
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
          <button onClick={handleForgotPassword} className="btn-secondary">Mot de passe oublié ?</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
