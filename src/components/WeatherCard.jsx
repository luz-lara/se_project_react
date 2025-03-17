import sunny from "../images/clear-nightt.png";
import { getWeatherBanner } from "../utils/utils";

function WeatherCard({ weatherData }) {
  const condition = weatherData?.weather?.[0].main;
  const isNight = weatherData?.weather?.[0].icon?.endsWith("n");
  const banner = weatherData ? getWeatherBanner(condition, isNight) : sunny;
  return (
    <section className="main__weatherCard">
      <p className="main__temperature">
        {weatherData?.main?.temp
          ? `${Math.round(weatherData.main.temp)}`
          : "Loading weather..."}
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
