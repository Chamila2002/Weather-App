const apiKey = CONFIG.API_KEY;
const apiUrl = CONFIG.API_URL;

const searchForm = document.querySelector(".search");
const searchBox = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon");
const loader = document.querySelector(".loader");
const weatherDiv = document.querySelector(".weather");
const errorDiv = document.querySelector(".error");

const iconMap = {
  "Clouds": "clouds.png",
  "Clear": "clear.png",
  "Rain": "rain.png",
  "Drizzle": "drizzle.png",
  "Mist": "mist.png",
  "Snow": "snow.png",
  "Thunderstorm": "thunderstorm.png",
  // Add more as needed
};

async function checkWeather(city) {
  if (!city.trim()) {
    showError("Please enter a city name.");
    return;
  }
  showLoader(true);
  try {
    const response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`);
    if (!response.ok) {
      showError("City not found. Please check the name.");
      return;
    }
    const data = await response.json();
    updateWeather(data);
  } catch (error) {
    showError("Network error. Please try again later.");
  } finally {
    showLoader(false);
  }
}

function updateWeather(data) {
  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").textContent = data.main.humidity + "%";
  document.querySelector(".wind").textContent = data.wind.speed + " km/h";
  
  const main = data.weather[0].main;
  weatherIcon.src = "images/" + (iconMap[main] || "default.png");
  weatherIcon.alt = main;

  // Animate weather section
  weatherDiv.style.display = "block";
  weatherDiv.style.opacity = 1;
  errorDiv.style.display = "none";
  animateElement(weatherDiv, "animate"); // Fade in weather info
  animateElement(weatherIcon, "animate"); // Bounce weather icon
}

function showError(message) {
  errorDiv.querySelector("p").textContent = message;
  errorDiv.style.display = "block";
  weatherDiv.style.display = "none";
  animateElement(errorDiv, "animate"); // Shake error
}

function showLoader(show) {
  loader.style.display = show ? "block" : "none";
}

// Utility: Add animation class and remove it after animation ends
function animateElement(element, animationClass) {
  element.classList.remove(animationClass); // Remove if present
  void element.offsetWidth; // Force reflow
  element.classList.add(animationClass);
  element.addEventListener("animationend", function handler() {
    element.classList.remove(animationClass);
    element.removeEventListener("animationend", handler);
  });
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkWeather(searchBox.value);
});
