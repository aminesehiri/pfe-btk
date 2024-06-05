import React, { useState, useEffect } from 'react';
import banner from '../../assest/banner.jpg';
import './BannerCss.css';
import img1 from '../../assest/img1.jpg';
import img2 from '../../assest/img2.jpeg';
import img3 from '../../assest/img3.jpg';

function BannerAcc() {
  const images = [img1, img2, img3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="banner-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Banner ${index + 1}`}
          className={`banner-image ${index === currentImageIndex ? 'active' : ''}`}
        />
      ))}
      <div className="banner-overlay">
        <h1>Bienvenue sur le site web <br />des tableaux de bord BTK</h1>
      </div>
    </div>
  );
}

export default BannerAcc;
