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
import { latitude, longitude } from '../utils/utils.js';
import "../blocks/Footer.css"
import { fetchWeatherData } from '../api.js';
const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const activeModal = isModalOpen || selectedItem;
  const [name, setName] = useState("");
  const [isNameValid, setisNameValid] = useState();
  const [isError, setIsError] = useState()
  const [url, setUrl] = useState("");
  const [urlValid, setUrlValid] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const [radioError, setRadioError] = useState("");
  const isFormValid = name.trim() !== "" && Boolean(selectedValue) && urlValid === true;
  const [nameErrorMessage, setNameErrorMessage] = useState('')
  const [urlTouched, setIsUrlTouched] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeItemModal() || handleCloseFormModal();
    }
  }

  const handleChange = (e) => {
    const newName = e.target.value
    setName(newName);
    if (newName.trim() !== "") {
      setisNameValid(true)
      setNameErrorMessage("")
      setIsError(false)
    } else {
      setisNameValid(false);
      setNameErrorMessage(" *Please enter garment name");
      setIsError(true);
    }
  }
  const handleUrlChange = (event) => {
    const inputUrl = event.target.value;
    setUrl(inputUrl);
    validateUrl(inputUrl)
    setIsUrlTouched(true)
    setIsError(false);
  };
  const validateUrl = (input) => {
    try {
      new URL(input);
      return setUrlValid(true);
    } catch (error) {
      return setUrlValid(false);
    }

  };
  const handleUrlBlur = () => {
    validateUrl(url)
    setIsUrlTouched(true);

  }

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);

  };
  const handleGarmentFormSubmit = (e) => {
    e.preventDefault()
    if (!isFormValid) {
      return;
    }

    onClose();
    console.log("form succesfully completed")
  }
  useEffect(() => {
    async function getWeather() {
      try {
        const data = await fetchWeatherData(latitude, longitude);
        if (data) {
          setWeatherData(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getWeather();
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeItemModal() || handleCloseFormModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]); 


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
      {selectedItem && <ItemModal item={selectedItem} onClose={closeItemModal} weatherType={weatherData.type} />}
      {isModalOpen && (
        <ModalWithForm title="New garment" buttonText="Add garment" onClose={handleCloseFormModal} submitButton={handleGarmentFormSubmit} isValid={isFormValid} isModalOpen={true}>
          <div className="modal__label_nd_error">
            <label className="modal__input-title" htmlFor='name'>Name</label>
            <p style={{ color: "red", margin: 0 }}> {nameErrorMessage}</p>
          </div>
          <input
            id="name"
            value={name}
            type="text"
            onChange={handleChange}
            placeholder="Enter Name"
            className='modal__input'
          />
          <div className="modal__label_nd_error">
            <label htmlFor="url" className="modal__input-title">Image URL </label>
            {!urlValid && urlTouched && <p style={{ color: "red", margin: 0 }}> *Invalid URL</p>}</div>
          <input
            id="url"
            value={url}
            type="url"
            onChange={handleUrlChange}
            placeholder="Enter Image URL"
            onBlur={handleUrlBlur}
            className='modal__input'
          />
          <div className="radio">
            <p className="modal__input-title">Select weather type:</p> {radioError && <p>Please select weather option</p>}
            <div>
              <label style={{ opacity: selectedValue === "hot" ? 1 : 0.5 }}>
                <input
                  type="radio"
                  name="weather"
                  value="hot"
                  checked={selectedValue === "hot"}
                  onChange={handleRadioChange}
                  style={{ accentColor: selectedValue === "hot" ? "black" : '' }}
                />
                Hot</label>
            </div>
            <div>
              <label style={{ opacity: selectedValue === "warm" ? 1 : 0.5 }} >
                <input
                  type="radio"
                  name="weather"
                  value="warm"
                  checked={selectedValue === "warm"}
                  onChange={handleRadioChange}
                  style={{ accentColor: selectedValue === "warm" ? "black" : '' }}
                />
                Warm</label>
            </div>
            <div>
              <label style={{ opacity: selectedValue === "cold" ? 1 : 0.5 }} >
                <input
                  type="radio"
                  name="weather"
                  value="cold"
                  checked={selectedValue === "cold"}
                  onChange={handleRadioChange}
                  style={{ accentColor: selectedValue === "cold" ? "black" : '' }}

                />
                Cold</label>
            </div>
          </div>
        </ModalWithForm>

      )}
      
      <Footer />
    </div>
  )
}

export default App
