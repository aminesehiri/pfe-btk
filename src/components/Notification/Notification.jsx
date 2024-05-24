import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import MenuAfterLogin from '../MenuAfterLogin/MenuAfterLogin';
import infoImg from '../../assest/info.png';
import './Notification.css';
import addbtn_icon from  '../../assest/plus.png';
import deletebtn_icon from  '../../assest/supprimer.png';

const firebaseConfig = {
  apiKey: "AIzaSyBaljt3wRPRHgIJHly8Um_bPLReWXAH4Do",
  authDomain: "site-btk-pfe.firebaseapp.com",
  projectId: "site-btk-pfe",
  storageBucket: "site-btk-pfe.appspot.com",
  messagingSenderId: "1078594678116",
  appId: "1:1078594678116:web:67ee5a5df44f744c81de71"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

function Notification() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, status: 'En attente', role: 'utilisateur', ...doc.data() }));
        // Sorting users so that users with status 'En attente' appear first
        const sortedUsers = [...usersData].sort((a, b) => {
          if (a.status === 'En attente' && b.status !== 'En attente') {
            return -1;
          } else if (a.status !== 'En attente' && b.status === 'En attente') {
            return 1;
          } else {
            return 0;
          }
        });
        setUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Count of existing users
  const existingUsersCount = users.filter(user => user.status === 'Membre').length;

  // Count of pending requests
  const pendingRequestsCount = users.filter(user => user.status === 'En attente').length;

  const handleDelete = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleApprove = async (user) => {
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      const currentDate = new Date().toLocaleString();
      const role = roles[user.id] || 'utilisateur'; // Default role is 'utilisateur'
      await setDoc(doc(db, 'users', user.id), { ...user, status: 'Membre', role, date_acceptation: currentDate }, { merge: true });
      setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? { ...u, status: 'Membre', role, date_acceptation: currentDate } : u));
      // Remove the role from dropdown after approval
      setRoles(prevRoles => {
        const updatedRoles = { ...prevRoles };
        delete updatedRoles[user.id];
        return updatedRoles;
      });
    } catch (error) {
      console.error('Error adding user to authentication database:', error);
    }
  };

  const handleRoleChange = (event, userId) => {
    const { value } = event.target;
    setRoles(prevRoles => ({ ...prevRoles, [userId]: value }));
  };

  return (
    <div className='div_user_demande'>
      <MenuAfterLogin />
      <center>
        <h1>Gestion des comptes</h1>
        <div className="count-info">
          <div className={`membre`}>Nombre des utilisateurs déjà membres :   {existingUsersCount}</div>
          <div className={`en-attente`}>Nombre des demandes en attente :   {pendingRequestsCount}</div>
        </div>
        <table className="notification-table">
          <thead>
            <tr>
              <th>Plus d'information</th>
              <th>Identifiant bancaire</th>
              <th>Email</th>
              <th>Mot de passe</th>
              <th>Statut</th>
              <th>Rôle</th>
              <th>Date de demande</th>
              <th>Date d'acceptation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="notification-cell">
                  <center>
                    <img title="Plus d'information"
                      src={infoImg}
                      alt="Information" 
                      onClick={() => alert(`Information :\nIdentifiant bancaire: ${user.id}\nPrénom: ${user.firstName}\nNom : ${user.lastName}\nEmail: ${user.email}\nPassword: ${user.password}\nDate de demande: ${user.date_demande ? user.date_demande.toDate().toLocaleString() : 'N/A'}\nDate d'acceptation: ${user.date_acceptation || 'N/A'}`)} 
                      style={{ cursor: 'pointer', width: '50px', height: '50px' }} // Adjust width and height as needed
                    />
                  </center>
                </td>
                <td className="notification-cell"><center>{user.id}</center></td>
                <td className="notification-cell">{user.email}</td>
                <td className="notification-cell">{user.password}</td>
                <td className="notification-cell">{user.status}</td>
                <td className="notification-cell">{user.status === 'Membre' ? user.role : (
                  <select value={roles[user.id] || 'utilisateur'} onChange={(e) => handleRoleChange(e, user.id)}>
                    <option value="admin">Admin</option>
                    <option value="utilisateur">Utilisateur normal</option>
                  </select>
                )}</td>
                <td className="notification-cell">{user.date_demande ? user.date_demande.toDate().toLocaleString() : 'N/A'}</td>
                <td className="notification-cell">{user.date_acceptation}</td>
                <td className="notification-cell" style={{ textAlign: 'center' }}>
                  <button onClick={() => handleDelete(user.id)} style={{ border: 'none', background: 'transparent', display: 'inline-block', margin: 'auto' }} title="Supprimer">
                    <img src={deletebtn_icon} alt="Delete" style={{ cursor: 'pointer', width: '25px', height: '25px' }} />
                  </button>
                  {user.status === 'En attente' && (
                    <>
                      <span style={{ margin: '0 5px' }}></span>
                      <button onClick={() => handleApprove(user)} style={{ border: 'none', background: 'transparent', display: 'inline-block', margin: 'auto' }} title="Approuver">
                        <img src={addbtn_icon} alt="Approve" style={{ cursor: 'pointer', width: '25px', height: '25px' }} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default Notification;
