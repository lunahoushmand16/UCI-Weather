// Weather App JavaScript Boilerplate

// Constants for the API
const API_KEY = "your_api_key_here"; // Replace with your actual API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Select DOM elements
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const weatherContainer = document.querySelector("#weather-container");

// Event listener for form submission
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        fetchWeatherData(query);
    } else {
        displayError("Please enter a city or ZIP code.");
    }
});

// Function to fetch weather data
async function fetchWeatherData(query) {
    try {
        const response = await fetch(`${BASE_URL}?q=${query}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error("Weather data not found. Please check your input.");
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        displayError(error.message);
    }
}

// Function to update the UI with weather data
function updateWeatherUI(data) {
    const { name, main, weather } = data;
    weatherContainer.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Condition: ${weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
    `;
}

// Function to display errors
function displayError(message) {
    weatherContainer.innerHTML = `<p class="error">${message}</p>`;
}

// -------------------------------

// Notes:
// 1. Replace "your_api_key_here" with a valid API key from OpenWeather.
// 2. Ensure you have a basic HTML structure with IDs: search-form, search-input, and weather-container.

// -------------------------------

// Notes:
// 1. Event Listener
// 2. API Integration
// 3. Content Updating
// 4. Error Handling 

// -------------------------------

// Notes on HTML:
// HTML File needs to include inpujt fields with IDs or classes that the Javascript then references. 
// Think #search-bar, #search-button, #weather-info, etc

// The HTML currently has a placeholder <input> element in the .search-container. However it does NOT have an ID or [name] attribute to make it easily targetable in JavaScript.
// To fix this, we will need to add an [id] attribute, such as (id="search-bar")
// The <button> is present in .search-button, but that also lacks an ID or Class for Javascript to hook onto.
// To fix this, we will need to add an [id] attribute, such as (id="search-button")
// The .WeatherInfo-section includes placeholders for images (image-1, image-2, image-3) and has basic headings which are all good. 
// However, it does not have placeholders for text-based weather data like temperature, description, etc
// It may be worth considering having dedicated <div> or <span> elements with IDs or Classes to populate the API response dynamically.
// For example, 
// <h3 id="today-temp">Temperature: --°C </h3>
// <h4 id="today-desc">Description: -- </h4>

// -------------------------------

// Notes: CSS Side
// CSS style needs elements to ensure a good user experience, thinks like visibility and layout.


