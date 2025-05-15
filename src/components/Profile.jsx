import React from 'react';
import Sidebar from './Sidebar.jsx';  
import ClothesSection from './ClothesSection'; 
import "../blocks/sidebar.css";

function Profile({setAddModalOpen, onClose,submitButton,clothingItems,onItemClick,weatherData}) {
    return (
      <div className="profile-container">
        <div className="sidebar-container">
         <Sidebar />
         </div>
         <div className="clothes-container">
        <ClothesSection setAddModalOpen={setAddModalOpen} onClose={onClose} submitButton={submitButton} clothingItems={clothingItems} onItemClick={onItemClick}weatherData={weatherData}/>
        </div>
      </div>
    );
  }
  
  export default Profile;