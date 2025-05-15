import { fetchWeatherData } from "../api";
import logo from "../images/Logo.svg";
import avatar from "../images/avatar.svg";
import ToogleSwitch from "./ToogleSwitch";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo-and-location-container">
        <Link to="./">
          <img src={logo} alt="wtwr logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {props.date}, {props.weatherData?.name}
        </p>
      </div>
      <div className="header__user-container">
        <ToogleSwitch />
        <button className="header__add-clothes-bttn" onClick={props.openmodal}>
          + Add clothes
        </button>
        <Link to="./profile" className="no-underline">
          <p className="header__username">Terrence Tegene</p>
        </Link>
        <img src={avatar} alt="user avatar" className="header__avatar" />
      </div>
    </header>
  );
}
export default Header;
