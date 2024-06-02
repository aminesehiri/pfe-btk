import React from 'react'
import banner from '../../assest/banner.jpg'
import './BannerCss.css'

function BannerAcc () {
  return (
    <div className="banner-container">
    <img src={banner} alt="Bank Banner" className="banner-image" />
    <div className="banner-overlay">
      <h1>Bienvenue sur le site web des tableaux de bord BTK</h1>
      
     
    </div>
  </div>
  );
};

export default BannerAcc ;