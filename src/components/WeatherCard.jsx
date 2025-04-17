import { useContext } from "react";
import sunny from "../images/clear-nightt.png";
import { getWeatherBanner } from "../utils/utils";
import currentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const condition = weatherData?.weather?.[0].main;
  const isNight = weatherData?.weather?.[0].icon?.endsWith("n");
  const banner = weatherData ? getWeatherBanner(condition, isNight) : sunny;
  const celcius = Math.round(((weatherData?.main.temp - 32) * 5) / 9);
  const farenheight=Math.round(weatherData?.main.temp);
  const {currentTemperatureUnit}=useContext(currentTemperatureUnitContext);
  return (
    <section className="main__weatherCard">
      <p className="main__temperature">
        {currentTemperatureUnit === "F" ? farenheight  : celcius }
        &#8457;
      </p>
      <img
        src={`${banner}`}
        alt="weather banner"
        className="main__weatherCard-img"
      />
    </section>
  );
}
export default WeatherCard;
