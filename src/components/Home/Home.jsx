import React from 'react'



import BankInfoSection from "../BankInfoSection/BankInfoSection";
import Banner from "../banner/BannerAcc";
import Menu from '../menu/Menu';



function Home() {
  return (
    <div>
      
      
      <Menu/>
        <Banner />
        <BankInfoSection/>
    
    </div>
  )
}

export default Home