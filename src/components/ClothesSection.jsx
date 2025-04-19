import React, { useState } from 'react';
import ModalWithForm from './ModalWithForm'; // Reuse your existing modal

function ClothesSection({ clothes }) {
  const [showModal, setShowModal] = useState(false);

  const handleAddItem = () => {
    setShowModal(true);
  };

  return (
    <div className="clothes-section">
      <h2>Your items</h2> <button className="clothes_section-button" onClick={handleAddItem}>
          + Add clothes
        </button>
      <ul>
        {clothes.map((item) => (
          <li key={item.id}>
            {item.name} - {item.type}
          </li>
        ))}
      </ul>
      <button onClick={handleAddItem}>Add Item</button>

      {showModal && <ModalWithForm setShowModal={setShowModal} />}
    </div>
  );
}

export default ClothesSection;