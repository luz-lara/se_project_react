import React from 'react';
import Sidebar from './Sidebar.jsx';  // We'll create this next
import ClothesSection from './ClothesSection';  // We'll create this too
import "../blocks/sidebar.css";

function Profile() {
    return (
      <div className="profile-container">
        <div className="sidebar-container">
         <Sidebar />
         </div>
         <div className="clothes-container">
        <ClothesSection/>
        </div>
      </div>
    );
  }
  
  export default Profile;