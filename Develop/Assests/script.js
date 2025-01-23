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