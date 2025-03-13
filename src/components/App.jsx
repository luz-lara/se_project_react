import { useEffect, useState } from 'react'
import Header from "./Header"
import '../blocks/Header.css'
import '../blocks/App.css'
import ModalWithForm from './ModalWithForm';
import "../blocks/ModalWithForm.css"
import Main from "./Main.jsx"
import "../blocks/WeatherCard.css"
import "../blocks/Main.css"
import ItemModal from './ItemModal.jsx';
import "../blocks/ItemCard.css"
import "../blocks/ItemModal.css"

import Footer from "./Footer.jsx";
import { latitude, longitude, APIkey } from '../utils.js';
import"../blocks/Footer.css"
const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    console.log("fetching weather app")
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setWeatherData(data);
      })
      .catch(error => console.error("Error:", error))
  }, []);


  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setSelectedItem(null) || setModalOpen(false);
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])
  const handleCloseFormModal = () => {
    setModalOpen(false);
  }
  const handleItemClick = (item) => {
    setSelectedItem(item);
  }
  const closeModal = () => {
    setSelectedItem(null);
    console.log("listening");
  }
  const handleOpenModal = () => {
    setModalOpen(true);
    console.log("being called ")
  }


  return (
    <div className="page">
      <div className="page__content">
        <Header date={currentDate} openmodal={handleOpenModal} />
        <main>
          <Main weatherData={weatherData} onItemClick={handleItemClick} />
        </main>
      </div>
      {isModalOpen && (<ModalWithForm title="New garment" onClose={handleCloseFormModal} />)

      }
      {selectedItem && <ItemModal item={selectedItem} onClose={closeModal} weatherType={weatherData.type} />}
      <Footer />
    </div>
  )
}

export default App
