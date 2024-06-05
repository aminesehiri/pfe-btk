import React from 'react';
import './bankinfosectionCss.css';


function BankInfoSection() {

  return (
    <section className="bank-info-section">
      <h2>À propos de la BTK</h2>
      <p>
        La BTK (Banque Tuniso-Koweïtienne) est une institution financière de premier plan en Tunisie. Fondée en 1980, elle offre une gamme complète de services bancaires aux particuliers, entreprises et institutions. La BTK s'engage à fournir des solutions financières innovantes et adaptées aux besoins de ses clients.
      </p>
      <iframe 
        src="http://localhost:4848/single/?appid=C%3A%5CUsers%5Cshiri%5COneDrive%5CDocuments%5CQlik%5CSense%5CApps%5Ctttt.qvf&obj=jhgZpvJ&theme=horizon&opt=nointeraction,noselections"  
        style={{ border: 'none', width: '100%', height: '100%' }}
      ></iframe>
      <p>
        La BTK dispose de 32 agences réparties à travers le pays, assurant une couverture nationale pour mieux servir ses clients. Grâce à une équipe de professionnels dévoués, la BTK continue de renforcer sa position sur le marché bancaire tunisien.
      </p>
    </section>
  );
}

export default BankInfoSection;
