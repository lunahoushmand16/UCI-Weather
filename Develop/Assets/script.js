// Weather App JavaScript Boilerplate

// Constants for the API
const API_KEY = "Y97G8TU6ZWSEVPHN9DCVCPN66"; // Replace with your actual API key
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

// Select DOM elements
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const weatherContainer = document.querySelector("#weather-container");

// Event listener for button click
searchButton.addEventListener("click", (event) => {
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
        const response = await fetch(`${BASE_URL}/${query}?unitGroup=us&key=${API_KEY}&contentType=json`);

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
    // Extract relevant data from the API response
    const todayWeather = data.days[0]; // Today's weather
    const currentConditions = data.currentConditions;

    // Update today's weather information
    document.getElementById("today-temp").textContent = `Temperature: ${todayWeather.temp}°F (Max: ${todayWeather.tempmax}°F, Min: ${todayWeather.tempmin}°F)`;
    document.getElementById("today-desc").textContent = `Condition: ${todayWeather.conditions}`;
    
    // Update tomorrow's weather information (assuming the second day in "days" array is for tomorrow)
    if (data.days.length > 1) {
        const tomorrowWeather = data.days[1];
        document.getElementById("tomorrow-temp").textContent = `Temperature: ${tomorrowWeather.temp}°F (Max: ${tomorrowWeather.tempmax}°F, Min: ${tomorrowWeather.tempmin}°F)`;
        document.getElementById("tomorrow-desc").textContent = `Condition: ${tomorrowWeather.conditions}`;
    }

    // Update summary information
    document.getElementById("summary-text").textContent = data.description;

    // Update weather icons for today
    document.getElementById("today-icon").src = 
        `https://www.visualcrossing.com/weather/icons/${currentConditions.icon}.png`;
    document.getElementById("today-icon").alt = currentConditions.conditions;

    // Update weather icons for tomorrow
    document.getElementById("tomorrow-icon").src = 
        `https://www.visualcrossing.com/weather/icons/${todayWeather.icon}.png`;
    document.getElementById("tomorrow-icon").alt = todayWeather.conditions;

    // Add map to the page
    updateMap(data.latitude, data.longitude);
}

// Function to load the map using Leaflet.js
function updateMap(latitude, longitude) {
    const mapContainer = document.getElementById('map');

    if (!mapContainer) {
        console.error('Map container not found!');
        return;
    }

    // Clear previous map instance if any
    mapContainer.innerHTML = ""; 

    // Initialize map
    const map = L.map('map').setView([latitude, longitude], 10);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker to the map
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Weather location')
        .openPopup();
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

// Notes on Javascript:
// 1. Event Listener            [ Done ]
// 2. API Integration           [ Done ]
// 3. Content Updating          [ Done ]
// 4. Error Handling            [ Done ]
// 5. Replace the API Key       [ Incomplete ]
// 6. Check HTML Elements       [ Incomplete ]
// 7. Handle "No Data Found"    [ Incomplete ] 
// 8. Add Loading Indicator     [ Incomplete ]
// 9. Test & Debug              [ Incomplete ]


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
// The [body] selector uses box-sizing: border-box which is fantastic and makes sure the layout stays controlled. 
// A suggestion might be to add " line-height: 1.6 " to improve text readability across the website
// Or to add a " min-height: 100vh; " for the body incase the footer overlaps on shorter pages.
// The header is clean and properly flexbox aligned, the navigation links also react to hovering as a nice touch.
// A suggestion would be to define the [hover] state for the header links (nav a:hover) with a clear [transition] such as (all 0.3s ease) for user experience.
// Having a [gap] between (.nav-website) items is already defined but would ensure it works smoothly with the padding.
// The banner is set to adapt to different screen sizes which is excellent, but is missing both alt text and a background color incase the image fails to load.
// Adding something like (background-color: #eef5fc;) and an Alt text would help for user accessibility. 

// -------------------------------
