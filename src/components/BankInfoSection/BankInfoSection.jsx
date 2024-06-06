import React from 'react';
import './bankinfosectionCss.css';
import imgamine from '../../assest/amine.jpg';
import imgouday from '../../assest/ouday.png';
import imgabir from '../../assest/abir.png';
import pythonIcon from '../../assest/python.jpg';
import talendIcon from '../../assest/talend.png';
import postgresIcon from '../../assest/postgre1.png';
import qliksenseIcon from '../../assest/qlik.png';

function BankInfoSection() {
  return (
    <div className="container">
      <section className="bank-info-section">
        <center><h2>À propos de la BTK</h2></center>
        <p>
          La BTK (Banque Tuniso-Koweïtienne) est une institution financière de premier plan en Tunisie. Fondée en 1980, elle offre une gamme complète de services bancaires aux particuliers, entreprises et institutions. La BTK s'engage à fournir des solutions financières innovantes et adaptées aux besoins de ses clients.
        </p>
        
        <p>
          La BTK dispose de 32 agences réparties à travers le pays, assurant une couverture nationale pour mieux servir ses clients. Grâce à une équipe de professionnels dévoués, la BTK continue de renforcer sa position sur le marché bancaire tunisien.
        </p>

        <section className="team-section">
          <center><h2>Notre Équipe</h2></center> <br /><br />
          <div className="cards">
            <a href="https://www.linkedin.com/in/abirjemaii/" target="_blank" rel="noopener noreferrer" className="card">
              <img src={imgabir} alt="Abir Jemai" />
              <h3>Abir Jemai</h3>
              <p>Responsable BI et CRM</p>
            </a>
            <a href="https://www.linkedin.com/in/medaminesehiri/" target="_blank" rel="noopener noreferrer" className="card">
              <img src={imgamine} alt="Mohamed Amine Sehiri" />
              <h3>Mohamed Amine Sehiri</h3>
              <p>Ingénieur Web et BI</p>
            </a>
            <a href="https://www.linkedin.com/in/oudaydjobbi/" target="_blank" rel="noopener noreferrer" className="card" >
              <img src={imgouday} alt="Ouday Djobbi" />
              <h3>Ouday Djobbi</h3>
              <p>Ingénieur Web et BI</p>
            </a>
          </div>
        </section>
        <br />
        <section className="tools-section">
          <center><h2>Nos outils de création des tableaux de bord</h2></center>
          <br /><br />
          <div className="tools">
            <div className="tool">
              <img src={pythonIcon} alt="Python" />
              <p>Python</p>
            </div>
            <div className="tool">
              <img src={talendIcon} alt="Talend" />
              <p>Talend</p>
            </div>
            <div className="tool">
              <img src={postgresIcon} alt="PostgreSQL" />
              <p>PostgreSQL</p>
            </div>
            <div className="tool">
              <img src={qliksenseIcon} alt="Qlik Sense" />
              <p>Qlik Sense</p>
            </div>
          </div>
        </section>
        <br />
        <section className="process-section">
          <center><h2>Notre processus pour la création des tableaux de bord</h2></center>
          <br /><br />
          <ol>
            <li>Prendre les données sous forme des fichiers Excel à partir de notre responsable BI</li>
            <li>Faire le traitement nécessaire avec Python</li>
            <li>Créer et charger les données dans des datamarts PostgreSQL avec Talend</li>
            <li>Créer les visualisations avec Qlik Sense</li>
            <li>Intégrer les tableaux de bord dans notre site web</li>
          </ol>
        </section>
        <br /><br /><br />
      </section>
      <footer className="footer">
        <p>Ce site est développé par Mohamed Amine Sehiri et Ouday Djobbi</p>
      </footer>
    </div>
  );
}

export default BankInfoSection;
