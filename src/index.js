import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app"
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
