import React, { useState } from 'react';
import "../blocks/ClothesSection.css"
import {
  defaultClothingItems,
  getWeatherCategory,
} from "../utils/utils.js";
import ItemCard from "./ItemCard";

function ClothesSection({ setAddModalOpen ,clothingItems,onItemClick}) {
  const [showModal, setShowModal] = useState(false);

  const handleAddItem = () => {
    setAddModalOpen(true);
  };

  return (
    <div className="clothes-section">
      <div className="title-button-container">
      <div className="section-title">
     <p className="clothing_section-title">Your Items</p>
     {console.log("clothingItems:", clothingItems)}
     </div>
     <div className="button-container">
     <button className="add-items-button"onClick={handleAddItem}> + Add item</button>
     </div>
    </div>   
    {
        <ul className="cards">
          {/*{ console.log(weatherData?.main.temp ? getWeatherCategory(weatherData.main.temp) : "loading weather" )}*/}
          {clothingItems
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                 onItemClick={onItemClick}
                />
              );
            })}
        </ul>
      }
    </div>

  );
}

export default ClothesSection;