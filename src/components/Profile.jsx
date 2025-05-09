import React from 'react';
import Sidebar from './Sidebar.jsx';  // We'll create this next
import ClothesSection from './ClothesSection';  // We'll create this too
import "../blocks/sidebar.css";

function Profile({setAddModalOpen, onClose,submitButton,clothingItems,onItemClick}) {
    return (
      <div className="profile-container">
        <div className="sidebar-container">
         <Sidebar />
         </div>
         <div className="clothes-container">
        <ClothesSection setAddModalOpen={setAddModalOpen} onClose={onClose} submitButton={submitButton} clothingItems={clothingItems} onItemClick={onItemClick}/>
        </div>
      </div>
    );
  }
  
  export default Profile;