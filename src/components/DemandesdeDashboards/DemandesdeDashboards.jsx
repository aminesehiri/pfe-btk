import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import MenuAfterLogin from '../MenuAfterLogin/MenuAfterLogin';
import './DemandesdeDashboards.css'; // Import the CSS file

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

function DemandesdeDashboards() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, 'dashbords'));
      const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const handleStatusChange = async (id) => {
    const requestDoc = doc(db, 'dashbords', id);
    await updateDoc(requestDoc, { status: 'Traiter' });
    setRequests(prevRequests => prevRequests.map(request => request.id === id ? { ...request, status: 'Traiter' } : request));
  };

  const handleDelete = async (id) => {
    const requestDoc = doc(db, 'dashbords', id);
    await deleteDoc(requestDoc);
    setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
  };

  return (
    <div>
      <div className='menuafterlogin'>
        <MenuAfterLogin />
      </div><br /><br />
      <h1>Demandes de tableaux de bord</h1>
      <center><p>Les fichiers Excel de chaque demande sont ici pour le moment : <br />
        C:\Users\shiri\OneDrive\Bureau\amine\site\uploads_excels</p> <br /></center>
      <table className="notificationtable">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Nom du tableau de bord</th>
            <th>Description</th>
            <th>PIN bancaire</th>
            <th>Status</th>
            <th>Date de demande</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.lastName}</td>
              <td>{request.firstName}</td>
              <td>{request.dashboardName}</td>
              <td>{request.description}</td>
              <td>{request.pin}</td>
              <td>{request.status}</td>
              <td>{request.timestamp ? new Date(request.timestamp.seconds * 1000).toLocaleString() : 'N/A'}</td>
              <td>
               <center><button onClick={() => handleStatusChange(request.id)} className='traiter'>Traiter</button>
                <button onClick={() => handleDelete(request.id)} className='supp'>Supprimer</button></center> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DemandesdeDashboards;
