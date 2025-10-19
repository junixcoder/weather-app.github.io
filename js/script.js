// Free OpenWeatherMap API key
const apiKey = "595ac603e40bbe13afbb2518d7bf3c09";

async function fetchWeather(city) {
  const weatherResult = document.getElementById("weatherResult");

  if (!city) {
    weatherResult.innerHTML = "<p>Please enter or select a city.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    const temp = data.main.temp;
    const condition = data.weather[0].main;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherResult.innerHTML = `
      <h2>${data.name}</h2>
      <img src="${icon}" alt="${condition}">
      <p>${condition}</p>
      <h3>${temp}°C</h3>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p>${error.message}</p>`;
  }
}

function getWeather() {
  const city = document.getElementById("cityInput").value;
  fetchWeather(city);
}

function getWeatherFromDropdown() {
  const city = document.getElementById("citySelect").value;
  fetchWeather(city);
}
