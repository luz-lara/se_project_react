import React, { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const {handleToggleSwitchChange,currentTemperatureUnit}=useContext(CurrentTemperatureUnitContext)
  return (
    <>
      <label className="toogle-switch">
        <input type="checkbox" className="toogle-switch-checkbox" onChange={handleToggleSwitchChange}/>
        <span className="toogle-switch-circle"></span>
        <span className={`toogle-unit-f toogle-switch-text ${currentTemperatureUnit === "F" ? "toogle-switch-text-white" :"toogle-switch-text"} `}>F</span>
        <span className={`toogle-unit-c toogle-switch-text ${currentTemperatureUnit === "C" ? "toogle-switch-text-white" :"toogle-switch-text"} `}>C</span>
      </label>
    </>
  );
};

export default ToggleSwitch;
