import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, Timestamp, query, where, getDocs } from 'firebase/firestore';
import Menu from '../menu/Menu';
import './Demanderuncompte.css';

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

function Demanderuncompte() {
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if the ID or email already exists in the database
        const idQuery = query(collection(db, 'users'), where('id', '==', id));
        const emailQuery = query(collection(db, 'users'), where('email', '==', email));
    
        const idDocs = await getDocs(idQuery);
        const emailDocs = await getDocs(emailQuery);
    
        if (!idDocs.empty && !emailDocs.empty) {
            alert('Cet identifiant et cette adresse email sont déjà enregistrés.');
            return;
        } else if (!idDocs.empty) {
            alert('Cet identifiant est déjà enregistré.');
            return;
        } else if (!emailDocs.empty) {
            alert('Cette adresse email est déjà enregistrée.');
            return;
        }
    
        try {
            const currentDate = Timestamp.now();
    
            // Use the ID as the document ID
            await setDoc(doc(db, 'users', id), {
                id, // Save the ID
                email,
                password,
                date_demande: currentDate,
                firstName,
                lastName,
            });
    
            alert('La demande de compte a été soumise avec succès !');
        } catch (error) {
            console.error('Erreur lors de la soumission de la demande de compte :', error.message);
            alert('Erreur lors de la soumission de la demande de compte :' + error.message);
        }
    };

    return (
        <div>
            <Menu/>
            <div className='div-2'>
                <div className='div1'>
                   <h1>Demande de compte</h1>
                    <center>
                        <p>
                            Si vous souhaitez créer un compte pour accéder aux tableaux de bord, veuillez remplir le formulaire, et l'un de nos agents approuvera votre demande.
                        </p>
                    </center>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Adresse email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="id">Votre identifiant bancaire:</label>
                            <input
                                type="text"
                                id="id"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                                placeholder='Assure-toi de mettre le bon identifiant bancaire.'
                            />
                        </div>

                        <div>
                            <label htmlFor="firstName">Prénom:</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Nom:</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Envoyer la demande</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Demanderuncompte;
