import { useEffect, useState } from "react";
import AddItemModal from "./AddItemModal.jsx";
import Header from "./Header";
import "../blocks/Header.css";
import "../blocks/App.css";
import ModalWithForm from "./ModalWithForm";
import "../blocks/ModalWithForm.css";
import Main from "./Main.jsx";
import "../blocks/WeatherCard.css";
import "../blocks/Main.css";
import "../blocks/Profile.css";
import ItemModal from "./ItemModal.jsx";
import "../blocks/ItemCard.css";
import "../blocks/ItemModal.css";
import "../blocks/Switch.css";
import Footer from "./Footer.jsx";
import { latitude, longitude } from "../utils/utils.js";
import "../blocks/Footer.css";
import { fetchWeatherData, getItems, addItem, deleteItem } from "../api.js";
import DeleteConfirmationModal from "./DeleteConfirmationModal.jsx";
import "../blocks/DeleteConfirmation.css";
import { Routes, Route } from "react-router-dom";
const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});
import Profile from "./Profile";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext.jsx";

function App() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const activeModal = isModalOpen || selectedItem;
  const [name, setName] = useState("");
  const [isNameValid, setisNameValid] = useState();
  const [isError, setIsError] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [urlValid, setUrlValid] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const [radioError, setRadioError] = useState("");
  const [clothingItems, setClothingItems] = useState([]);

  const isFormValid =
    name.trim() !== "" && Boolean(selectedValue) && urlValid === true;
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [urlTouched, setIsUrlTouched] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleAddItemsSubmit = (newItem) => {
    setClothingItems(newItem, ...clothingItems);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeItemModal() || handleCloseFormModal();
    }
  };
  const handleAddItem = async (newItem) => {
    try {
      const savedItem = await addItem(newItem);
      setClothingItems((items) => [savedItem, ...items]);
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
    console.log("listening to switch");
  };

  const handleChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (newName.trim() !== "") {
      setisNameValid(true);
      setNameErrorMessage("");
      setIsError(false);
    } else {
      setisNameValid(false);
      setNameErrorMessage(" *Please enter garment name");
      setIsError(true);
    }
  };
  const handleUrlChange = (event) => {
    const inputUrl = event.target.value;
    setImageUrl(inputUrl);
    validateUrl(inputUrl);
    setIsUrlTouched(true);
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
    validateUrl(imageUrl);
    setIsUrlTouched(true);
  };

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const handleGarmentFormSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    const newItem = {
      name: name,
      imageUrl: imageUrl,
      weather: selectedValue,
      _id: Date.now(),
    };
    handleAddItem(newItem);
    handleCloseFormModal();

    console.log("form succesfully completed");
  };
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
    if (!isModalOpen) {
      setName("");
      setImageUrl("");
      setSelectedValue("");
    }
  }, [isModalOpen]);

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

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch((err) => console.error("Failed to fetch items:", err));
  }, []);

  const handleCloseFormModal = () => {
    setModalOpen(false);
  };
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeItemModal = () => {
    setSelectedItem(null);
  };
  const openFormModal = () => {
    setModalOpen(true);
  };
  const closeAddModal = () => setAddModalOpen(false);
  function handleAddItemSubmit(newItem) {
    setClothingItems([newItem, ...clothingItems]);
  }
  function openConfirmationModal(item) {
    setItemToDelete(item);
    closeItemModal();
    setIsConfirmModalOpen(true);
   
  }

const handleCardDelete = async (item) => {
  setItemToDelete(item)
  const id=itemToDelete._id
  console.log(id);
  if (!id) {
    console.error("Item or item.id is null:", item);
    return;
  }

  try {
    await deleteItem(id); // call to API
    setClothingItems((prev) => prev.filter((i) => i._id !== item._id)); // update local state
    setIsConfirmModalOpen(false)
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header date={currentDate} openmodal={openFormModal} weatherData={weatherData} />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onItemClick={handleItemClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    setAddModalOpen={setAddModalOpen}
                    clothingItems={clothingItems}
                    onItemClick={handleItemClick}
                    weatherData={weatherData}
                  />
                }
              />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </main>
        </div>
        {selectedItem && (
          <ItemModal
            item={selectedItem}
            onClose={closeItemModal}
            weatherType={weatherData?.type}
            onOpenConfirm={openConfirmationModal}
          />
        )}
        {isModalOpen && (
          <ModalWithForm
            title="New garment"
            buttonText="Add garment"
            onClose={handleCloseFormModal}
            submitButton={handleGarmentFormSubmit}
            isValid={isFormValid}
            isModalOpen={true}
          >
            <div className="modal__label_nd_error">
              <label className="modal__input-title" htmlFor="name">
                Name
              </label>
              <p style={{ color: "red", margin: 0 }}> {nameErrorMessage}</p>
            </div>
            <input
              id="name"
              value={name}
              type="text"
              onChange={handleChange}
              placeholder="Enter Name"
              className="modal__input"
            />
            <div className="modal__label_nd_error">
              <label htmlFor="url" className="modal__input-title">
                Image URL{" "}
              </label>
              {!urlValid && urlTouched && (
                <p style={{ color: "red", margin: 0 }}> *Invalid URL</p>
              )}
            </div>
            <input
              id="url"
              value={imageUrl}
              type="url"
              onChange={handleUrlChange}
              placeholder="Enter Image URL"
              onBlur={handleUrlBlur}
              className="modal__input"
            />
            <div className="radio">
              <p className="modal__input-title">Select weather type:</p>{" "}
              {radioError && <p>Please select weather option</p>}
              <div>
                <label style={{ opacity: selectedValue === "hot" ? 1 : 0.5 }}>
                  <input
                    type="radio"
                    name="weather"
                    value="hot"
                    checked={selectedValue === "hot"}
                    onChange={handleRadioChange}
                    style={{
                      accentColor: selectedValue === "hot" ? "black" : "",
                    }}
                  />
                  Hot
                </label>
              </div>
              <div>
                <label style={{ opacity: selectedValue === "warm" ? 1 : 0.5 }}>
                  <input
                    type="radio"
                    name="weather"
                    value="warm"
                    checked={selectedValue === "warm"}
                    onChange={handleRadioChange}
                    style={{
                      accentColor: selectedValue === "warm" ? "black" : "",
                    }}
                  />
                  Warm
                </label>
              </div>
              <div>
                <label style={{ opacity: selectedValue === "cold" ? 1 : 0.5 }}>
                  <input
                    type="radio"
                    name="weather"
                    value="cold"
                    checked={selectedValue === "cold"}
                    onChange={handleRadioChange}
                    style={{
                      accentColor: selectedValue === "cold" ? "black" : "",
                    }}
                  />
                  Cold
                </label>
              </div>
            </div>
          </ModalWithForm>
        )}
        {isAddModalOpen && (
          <AddItemModal
            onClose={closeAddModal}
            onNameChange={handleChange}
            onAddItem={handleAddItem}
          />
        )}

        <DeleteConfirmationModal
          isOpen={isConfirmModalOpen}
          itemToDelete={selectedItem}
          onClose={() => setIsConfirmModalOpen(false)}
           onConfirm={()=>handleCardDelete(itemToDelete)}
        />
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
