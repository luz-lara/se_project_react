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
import { latitude, longitude, APIkey } from '../utils/utils.js';
import "../blocks/Footer.css"
import { fetchWeatherData } from '../api.js';
const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const activeModal = isModalOpen || selectedItem;

  /*useEffect(() => {
    console.log("fetching weather app")
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setWeatherData(data);
      })
      .catch(error => console.error("Error:", error))
  }, []); */
  useEffect(() => {
    async function getWeather() {
      const data = await fetchWeatherData(latitude, longitude);
      if (data) {
        setWeatherData(data);
      }
    }
    getWeather();
  }, []);





  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeModal() || handleCloseFormModal();
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])
  useEffect(() => {
    if (!activeModal) return;
  }, [activeModal])

  const handleCloseFormModal = () => {
    setModalOpen(false);
  }
  const handleItemClick = (item) => {
    setSelectedItem(item);
  }
  const closeItemModal = () => {
    setSelectedItem(null);
  }
  const openFormModal = () => {
    setModalOpen(true);

  }


  return (
    <div className="page">
      <div className="page__content">
        <Header date={currentDate} openmodal={openFormModal} />
        <main>
          <Main weatherData={weatherData} onItemClick={handleItemClick} />
        </main>
      </div>
      {isModalOpen && (<ModalWithForm title="New garment" onClose={handleCloseFormModal} />)

      }
      {selectedItem && <ItemModal item={selectedItem} onClose={closeItemModal} weatherType={weatherData.type} />}
      <Footer />
    </div>
  )
}

export default App
