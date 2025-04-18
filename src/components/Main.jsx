import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { useContext } from "react";
import {
  defaultClothingItems,
  getWeatherCategory,
  currentHour,
  greeting,
} from "../utils/utils.js";
import currentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, onItemClick }) {
  const {currentTemperatureUnit}=useContext(currentTemperatureUnitContext);
  const celcius = `${Math.round(((weatherData?.main.temp - 32) * 5) / 9)}`;
  const farenheight=`${Math.round(weatherData?.main.temp)}`;
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <p className="main__temperature-summary">
        {greeting} {currentTemperatureUnit === "F" ? farenheight  : celcius } / You may want to wear:
      </p>
      {
        <ul className="cards">
          {/*{ console.log(weatherData?.main.temp ? getWeatherCategory(weatherData.main.temp) : "loading weather" )}*/}
          {defaultClothingItems
            .filter((item) => {
              if (weatherData?.main.temp) {
                return (
                  item.weather === getWeatherCategory(weatherData.main.temp) ||
                  item.weatherAlt === getWeatherCategory(weatherData.main.temp)
                );
              }
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onItemClick={onItemClick}
                />
              );
            })}
        </ul>
      }
    </main>
  );
}

export default Main;
