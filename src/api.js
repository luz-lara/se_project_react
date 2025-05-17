// 🔧 NOTE FOR INSTRUCTORS:
// This project was developed entirely in GitHub Codespaces(I don't have a laptop-damaged and using a public computer)
// The baseUrl below is set to the exposed Codespaces server.
// 👉 If you're testing this locally, please comment out the Codespaces URL and uncomment the local development URL.

// export const baseUrl = "http://localhost:3001/items"; // ← Uncomment this for local testing

export const APIkey = "3a99b729275e704daca18d1a6457b1f1";
export const latitude = 40.7128;
export const longitude = -74.006;
export const baseUrl =
  "https://animated-eureka-4x55jvrpp9rcpxw-3001.app.github.dev/items";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const fetchWeatherData = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json(); 
    return data; 
  } catch (error) {
    throw new Error(error.message); 
  }
};

export const getItems = () => {
  return request(baseUrl);
};

export const addItem = (item) => {
  return request(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
};


export const deleteItem = (id) => {
  return request(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
};