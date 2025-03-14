import WeatherCard from "./WeatherCard"
import ItemCard from "./ItemCard"
import { defaultClothingItems, getWeatherCategory, currentHour, greeting } from '../utils/utils.js';

function Main({ weatherData, onItemClick }) {

  return (

    <main>

      <WeatherCard weatherData={weatherData} />
      <p className="main__temperature-summary">{greeting} {Math.round(weatherData?.main?.feels_like)} &#8457; and feels like {Math.round(weatherData?.main.temp)}&#8457; / You may want to wear:</p>
      {<ul className="cards">
        {/*{ console.log(weatherData?.main.temp ? getWeatherCategory(weatherData.main.temp) : "loading weather" )}*/}
        {defaultClothingItems.filter((item) => {
          if (weatherData?.main.temp) {
            return item.weather === getWeatherCategory(weatherData.main.temp) || item.weatherAlt === getWeatherCategory(weatherData.main.temp)
          }
        }).map((item) => {
          return <ItemCard key={item._id} item={item} onItemClick={onItemClick} />
        })}
      </ul>}
    </main>)
}


export default Main