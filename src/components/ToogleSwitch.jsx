import React from "react";

const ToogleSwitch = () => {
  return (
    <>
      <label className="toogle-switch">
        <input type="checkbox" className="toogle-switch-checkbox" />
        <span className="toogle-switch-circle"></span>
        <span className="toogle-unit-f toogle-switch-text">F</span>
        <span className="toogle-unit-c toogle-switch-text">C</span>
      </label>
    </>
  );
};

export default ToogleSwitch;
