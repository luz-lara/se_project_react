
export const APIkey ="3a99b729275e704daca18d1a6457b1f1";
export const latitude=40.7128;
export const longitude=-74.0060;


export const fetchWeatherData = async () =>{
  const url=(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();  // Parse the response JSON
    return data;  // Return the data to the caller
  } catch (error) {
    throw new Error(error.message);  // Handle errors and pass them back
  }
   
}