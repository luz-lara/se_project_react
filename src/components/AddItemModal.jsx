import React, { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import { defaultClothingItems } from "../utils/utils";

 const AddItemModal = ({ isOpen, onClose ,isValid,onAddItem}) => {
  const [name, setName] = useState("");
  const [isNameValid, setisNameValid] = useState();
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [isError, setIsError] = useState();
  const [radioError, setRadioError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");
  const [urlValid, setUrlValid] = useState("");
  const [urlTouched, setIsUrlTouched] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [weather, setWeather] = useState("");
  const isFormValid =
    name.trim() !== "" && Boolean(selectedValue) && urlValid === true;
  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);
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
    setUrl(inputUrl);
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
  
  const handleProfileFormSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    const newItem = {
      name: name,
      link:url,
      weather: selectedValue,
      _id: Date.now(), // fake ID for now
    };

    onAddItem(newItem);
    onClose();
    console.log("form succesfully completed");
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      isValid={isFormValid}
      submitButton={handleProfileFormSubmit}
      title={"Add New Garment"}
      buttonText={"Add Garment"}
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
        required
      />
      <div className="modal__label_nd_error">
        <label htmlFor="url" className="modal__input-title">
          Image URL
        </label>
        {!urlValid && urlTouched && (
                <p style={{ color: "red", margin: 0 }}> *Invalid URL</p>
              )}
      </div>
      <input
      
        id="url"
        value={url}
        type="url"
        onChange={handleUrlChange}
        placeholder="Enter Image URL"
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
  );
};
export default AddItemModal;