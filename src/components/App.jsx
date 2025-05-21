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
  // === Modal States ===
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  // === Item States ===
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const activeModal = isAddModalOpen || selectedItem;
  // === Weather and Temperature ===
  const [weatherData, setWeatherData] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // === Form States ===
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [isNameValid, setisNameValid] = useState();
  const [urlValid, setUrlValid] = useState("");
  const [urlTouched, setIsUrlTouched] = useState(false);
  const [radioError, setRadioError] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [isError, setIsError] = useState();
  const isFormValid =
    name.trim() !== "" && Boolean(selectedValue) && urlValid === true;

  //=== useEffects ===
  useEffect(() => {
    async function getWeather() {
      try {
        const data = await fetchWeatherData(latitude, longitude);
        if (data) setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    }
    getWeather();
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch((err) => console.error("Failed to fetch items:", err));
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
        closeItemModal() || closeAddModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);

  // === modal handlers ===
  const openFormModal = () => setModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);
  const handleCloseFormModal = () => setModalOpen(false);
  const closeItemModal = () => setSelectedItem(null);

  // === item & form logic ===
  const handleItemClick = (item) => setSelectedItem(item);

  const handleAddItem = async (newItem) => {
    try {
      const savedItem = await addItem(newItem);
      setClothingItems((items) => [savedItem, ...items]);
      closeAddModal()
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  const handleCardDelete = async (item) => {
    const id = item._id;
    if (!id) {
      console.error("Item or item.id is null:", item);
      return;
    }
    try {
      await deleteItem(id);
      setClothingItems((prev) => prev.filter((i) => i._id !== item._id));
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const openConfirmationModal = (item) => {
    setItemToDelete(item);
    closeItemModal();
    setIsConfirmModalOpen(true);
  };
  // === Form field handlers ===

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

  const handleUrlBlur = () => {
    validateUrl(imageUrl);
    setIsUrlTouched(true);
  };

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleGarmentFormSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const newItem = {
      name,
      imageUrl,
      weather: selectedValue,
      _id: Date.now(),
    };

    handleAddItem(newItem);
 
  };
  const validateUrl = (input) => {
    try {
      new URL(input);
      return setUrlValid(true);
    } catch (error) {
      return setUrlValid(false);
    }
  };

  // === misc===
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeItemModal() || handleCloseFormModal();
    }
  };
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
    console.log("listening to switch");
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            date={currentDate}
            setAddModalOpen={setAddModalOpen}
            weatherData={weatherData}
          />
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
       
        {isAddModalOpen && (
          <AddItemModal
            onClose={closeAddModal }
            onNameChange={handleChange}
            onAddItem={handleAddItem}
          />
        )}

        <DeleteConfirmationModal
          isOpen={isConfirmModalOpen}
          itemToDelete={selectedItem}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={() => handleCardDelete(itemToDelete)}
        />
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
