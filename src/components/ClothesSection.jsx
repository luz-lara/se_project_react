import React, { useState } from 'react';
import "../blocks/ClothesSection.css"
import {
  defaultClothingItems,
  getWeatherCategory,
} from "../utils/utils.js";
import ItemCard from "./ItemCard";

function ClothesSection({ clothes }) {
  const [showModal, setShowModal] = useState(false);

  const handleAddItem = () => {
    setShowModal(true);
  };

  return (
    <div className="clothes-section">
      <div className="title-button-container">
      <div className="section-title">
     <p className="clothing_section-title">Your Items</p>
     </div>
     <div className="button-container">
     <button className="add-items-button"> + Add item</button>
     </div>
    </div>   
    {
        <ul className="cards">
          {/*{ console.log(weatherData?.main.temp ? getWeatherCategory(weatherData.main.temp) : "loading weather" )}*/}
          {defaultClothingItems
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                // onItemClick={onItemClick}
                />
              );
            })}
        </ul>
      }
    </div>

  );
}

export default ClothesSection;