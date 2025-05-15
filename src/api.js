// 🔧 NOTE FOR INSTRUCTORS:
// This project was developed entirely in GitHub Codespaces(I don't have a laptop-damaged and using a public computer) for convenience, as I do not have a personal computer.
// The baseUrl below is set to the exposed Codespaces server.
// 👉 If you're testing this locally, please comment out the Codespaces URL and uncomment the local development URL.

// export const baseUrl = "http://localhost:3001/items"; // ← Uncomment this for local testing

export const APIkey = "3a99b729275e704daca18d1a6457b1f1";
export const latitude = 40.7128;
export const longitude = -74.006;
export const baseUrl =
  "https://animated-eureka-4x55jvrpp9rcpxw-3001.app.github.dev/items";

export const fetchWeatherData = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json(); // Parse the response JSON
    return data; // Return the data to the caller
  } catch (error) {
    throw new Error(error.message); // Handle errors and pass them back
  }
};

export const getItems = async () => {
  const res = await fetch(`${baseUrl}`);
  return res.json();
};

export const addItem = async (item) => {
  const res = await fetch(`${baseUrl}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return res.json();
};

export const deleteItem = async (id) => {
  await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
};
