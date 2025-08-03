const apiKey = "916672b5e0b057ec9d5c66a99c9451a4";

const weatherIcons = {
  Clear: "sunny.png",
  Clouds: "cloud.png",
  Rain: "rainy.png",
  Snow: "snow.png",
  Thunderstorm: "thunderstorm.png",
  Mist: "mist.png",
  Haze: "foggy.png"
};

document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  fetchWeather(city);
});

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then((data) => {
      // Update city
      document.getElementById("city-heading").textContent = data.name;

      // Update condition text
      const condition = data.weather[0].main;
      document.getElementById("condition").textContent = condition;

      // Set icon based on condition
      const icon = weatherIcons[condition] || "default.png";
      document.getElementById("weather-icon").src = icon;

      // Temperature
      document.getElementById("temperature").innerHTML = `
        <div class="head">Temperature</div>
        <p class="allstyle" id="tempstyle">${data.main.temp} °C</p>
      `;

      // Wind
      document.getElementById("wind").innerHTML = `
        <div class="head">Wind</div>
        <p class="allstyle" id="Windstyle">${data.wind.speed} m/s</p>
      `;

      // Humidity
      document.getElementById("humidity").innerHTML = `
        <div class="head">Humidity</div>
        <p class="allstyle" id="humiditystyle">${data.main.humidity} %</p>
      `;
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}
