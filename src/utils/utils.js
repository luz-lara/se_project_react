import { useEffect, useState } from 'react'

import clearNight from "../images/clear-nightt.png"
import sunny from "../images/sunny.png"
import cloudyDay from "../images/cloudy.png";
import cloudyNight from "../images/cloudy-night.png";
import rainDay from "../images/rain.png";
import rainNight from "../images/rain-night.png";
import snowNight from "../images/snow-night.png";
import snowDay from "../images/snow.png";
import stormNight from "../images/storm-night.png";
import stormDay from "../images/storm.png";
import fogNight from "../images/fog-night.png";
import fogDay from "../images/fog.png";
export const APIkey = "3a99b729275e704daca18d1a6457b1f1";
export const latitude = 40.7128;
export const longitude = -74.0060;



export const getWeatherCategory = (temp) => {
  if (temp >= 75) {
    return 'hot';
  } else if (temp >= 60) {
    return 'warm';
  } else {
    return 'cold';
  }
}
export const getWeatherBanner = (condition, isNight) => {
  if (condition === "Clear") return isNight ? clearNight : sunny;
  else if (condition === "Clouds") return isNight ? cloudyNight : cloudyDay;
  else if (condition === "Rain") return isNight ? rainNight : rainDay;
  else if (condition === "Snow") return isNight ? snowNight : snowDay;
  else if (condition === "Thunderstorm") return isNight ? stormNight : stormDay;
  else if (condition === "Fog") return isNight ? fogNight : fogDay;
  else {
    return isNight ? clearNight : sunny;
  }
}
export const currentHour = new Date().getHours();
export const greeting = currentHour < 12 ? `Good Morning Terrence today is` : currentHour < 18 ? "Good afternoon Terrence today is" : "Good evening Terrence tonight is";

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Dress + hat",
    weather: "hot",
    weatherAlt: "none",
    link: "https://media.istockphoto.com/id/1082823902/photo/feminine-fashion-concept-with-blue-clothing-and-straw-hat-on-white-background-flat-lay-top.jpg?s=1024x1024&w=is&k=20&c=gO8-m3tf8jpieFJnbjFOaD6CW6EOTxbGYn_RUCJjUO8=",
  },
  {
    _id: 1,
    name: "Skirt + blouse",
    weather: "hot",
    weatherAlt: "none",
    link: "https://media.istockphoto.com/id/695474474/photo/flat-lay-shot-of-female-holiday-clothing-and-accessories.jpg?s=1024x1024&w=is&k=20&c=EujBHQfUNF6h3EoHXZiIIF4MayJY43-dZhxw94IFSWo=",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    weatherAlt: "none",
    link: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 3,
    name: "Boots",
    weather: "cold",
    weatherAlt: "none",
    link: "https://plus.unsplash.com/premium_photo-1674719144437-d1c253a8b775?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 4,
    name: "Jeans + shirt",
    weather: "warm",
    weatherAlt: "none",
    link: "https://media.istockphoto.com/id/1160533209/photo/female-fashion-clothes-flat-lay-square.jpg?s=2048x2048&w=is&k=20&c=G6QjuLcOkSwn_6Nw95a_jOsY-CGJrBVg-HDuFeJuPt8=",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    weatherAlt: "none",
    link: "https://plus.unsplash.com/premium_photo-1674719144570-0728faf14f96?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 6,
    name: "Satin blouse + Shorts",
    weather: "warm",
    weatherAlt: "none",
    link: "https://media.istockphoto.com/id/1400185144/photo/womens-clothing-viscose-blouse-cotton-bermuda-shorts-leather-sandals-and-cross-body-bag-on-a.jpg?s=2048x2048&w=is&k=20&c=7-xpZQ3jRSj9W4_JHcz-FrY7SIUePIQoWPBVxcgJgdI=",
  },
  {
    _id: 7,
    name: "Short + lace shirt ",
    weather: "hot",
    weatherAlt: "none",
    link: "https://media.istockphoto.com/id/973036448/photo/summer-casual-style-modern-woman-clothes-and-accessories-collage.jpg?s=1024x1024&w=is&k=20&c=8DgXOEcCa9UH_If2Emm8K7Qo-WeFprxxMtFsnfsjQFs=",
  },
  {
    _id: 8,
    name: "Sweater + Capris",
    weather: "warm",
    weatherAlt: "none",
    link: "https://media.istockphoto.com/id/1400185177/photo/comfortable-womens-clothing-for-walking-a-knitted-t-shirt-with-long-sleeves-jeans-sneakers.jpg?s=2048x2048&w=is&k=20&c=X9QuXIe0HqSE0Z35XqV8eyvHfCLcZhiKLeoguy0c7ns=",
  },
  {
    _id: 9,
    name: "Boots",
    weather: "cold",
    weatherAlt: "none",
    link: "https://images.unsplash.com/photo-1610398752800-146f269dfcc8?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 10,
    name: "Sandals",
    weather: "warm",
    weatherAlt: "hot",
    link: "https://images.unsplash.com/photo-1618615098938-84fc29796e76?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 11,
    name: "Sneakers",
    weather: "warm",
    weatherAlt: "hot",
    link: "https://media.istockphoto.com/id/147648862/photo/pink-sneaker.jpg?s=2048x2048&w=is&k=20&c=NjtqahHGoelqjnPk5WSvCcwb-Yg3wsTAGnZZjZsEaTM="
  },
  {
    _id: 12,
    name: "Heels",
    weather: "hot",
    weatherAlt: "warm",
    link: "https://media.istockphoto.com/id/619412092/photo/new-pair-of-stylish-brown-high-heels-with-cork-soles.jpg?s=2048x2048&w=is&k=20&c=W5kA3q0sFnNaVPpNnHtL1OkWL-e5ShMAgj6BjIWjSf4=",
  },
  {
    _id: 13,
    name: "Scarve",
    weather: "cold",
    weatherAlt: "warm",
    link: "https://images.unsplash.com/photo-1638256049275-9d72f01c2fa7?q=80&w=1945&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 14,
    name: "Hat",
    weather: "cold",
    weatherAlt: "warm",
    link: "https://media.istockphoto.com/id/1060566234/photo/warm-winter-hat.jpg?s=2048x2048&w=is&k=20&c=m09JFi1NzQ_pbgfrmxZJY-cEZzDBkY-OvT8lj5LoPz8=",
  },
]

export const handleRadioChange = (e) => {
  setSelectedValue(e.target.value);

};