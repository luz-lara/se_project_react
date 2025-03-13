import { useState } from "react";

export default function ModalWithForm({ title, onClose }) {
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
        <div className="modal" onClick={(e) => e.target.classList.contains('modal') && onClose()}>
            <div className="modal__container">
                <button className="modal__close-button" onClick={onClose}></button>
                <p className="modal__heading">{title}</p>
                <form className="modal__form" name="garment-form">
                    <div className="modal__input-container">
                        <div className="modal__label_nd_error"><label htmlFor="name" className="modal__input-title">Name </label> <p style={{ color: "red", margin: 0 }}> {nameErrorMessage}</p></div>
                        <input type="text"
                            value={name}
                            onChange={handleChange}
                            name="title"
                            className="modal__input modal__input-name"
                            placeholder="Name"
                            id="owner-name"
                            style={{ borderBottom: isError ? "1px solid red" : "1px solid black" }}


                            required />

                        <div className="modal__label_nd_error"><label htmlFor="url" className="modal__input-title">Image URL </label>{!urlValid && urlTouched && <p style={{ color: "red", margin: 0 }}> *Invalid URL</p>}</div>
                        <input
                            type="url"
                            value={url}
                            onChange={handleUrlChange}
                            placeholder="Image Url"
                            className="modal__input modal__input-url"
                            id="url-input"
                            style={{ borderBottom: !urlValid && urlTouched ? "1px solid red" : "1px solid black" }}
                            onBlur={handleUrlBlur}
                            required />

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
                    </div>

                    <button className="modal__form-bbtn" onClick={handleFormSubmit} disabled={!isFormValid}
                        type="submit">

                        Add garment</button>
                </form>
            </div>
        </div>
    )
}