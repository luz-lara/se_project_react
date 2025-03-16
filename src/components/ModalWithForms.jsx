import { useState } from "react";

export function FormInput({formData, onChange,errors}) {
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
  const handleUrlChange = (event) => {
      const inputUrl = event.target.value;
      setUrl(inputUrl);
      validateUrl(inputUrl)
      setIsUrlTouched(true)
      setIsError(false);
  };
  const handleRadioChange = (e) => {
      setSelectedValue(e.target.value);

  };

  const handleFormSubmit = (e) => {
      e.preventDefault()
      if (!isFormValid) {
          return;
      }

      onClose();
      console.log("form succesfully completed")
  }

    return (
        <>
        <div className="modal__label_nd_error">
            <label className="modal__input-title">Name</label>
            <p style={{ color: "red", margin: 0 }}> {nameErrorMessage}</p>
          </div>
          <input type="text"
            value={name}
            onChange={handleChange}
            name="title"
            className="modal__input modal__input-name"
            placeholder="Name"
            id="owner-name"
            style={{ borderBottom: isError ? "1px solid red" : "1px solid black" }}
            required />
          <div className="modal__label_nd_error">
            <label htmlFor="url" className="modal__input-title">Image URL </label>
            {!urlValid && urlTouched && <p style={{ color: "red", margin: 0 }}> *Invalid URL</p>}</div>
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
          </>
    )
}