import React, { useState } from 'react';

import MenuAfterLogin from '../MenuAfterLogin/MenuAfterLogin';
import './Adddata.css';

function Adddata() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('File uploaded successfully!');
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        });
    };

    return (
        <div>
            <MenuAfterLogin />
            <div className="container">
                <div className="center-content">
                    <center>
                        <h1>Ajouter des données pour mettre à jour les tableaux de bord</h1><br />
                        <select>
                            <option value="option1">creation compte</option>
                            <option value="option2">credit</option>
                            <option value="option3">EER</option>
                            <option value="option4">vente carte</option>
                            <option value="option5">vente pack</option>
                        </select><br />
                        <input type="file" accept=".xlsx, .xls" onChange={handleFileSelect} /><br />
                        <button onClick={handleSubmit}>Submit</button>
                    </center>
                </div>
            </div>
        </div>
    );
}

export default Adddata;
