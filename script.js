const apiKey = "5d066958a60d315387d9492393935c19";
const btn = document.querySelector('.glowing-btn');
const cardContainer = document.querySelector('.cardContainer');
const cityInput = document.querySelector('#searchInput'); 

async function getSearch() {
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&APPID=${apiKey}`;

    if (!cityInput.value) {
        alert('Please enter a city');
        return;
    }     
    try {
        const weatherData = await getWeather(API, cityInput.value);
        renderCard(weatherData, cityInput.value);
    } catch (error) {
        console.error('We have some error in code', error);
    }
}

btn.addEventListener('click', getSearch);

cityInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        getSearch();
    }
});

function renderCard(weatherData, cityName) {

    const weatherInfo = 
        `<h3>Weather in ${cityName} now</h3>` + 
        `<p>Temperature: ${weatherData.main.temp}°C</p>` +
        `<p>Pressure: ${weatherData.main.pressure} hPa</p>` +
        `<p>Description: ${weatherData.weather[0].description}</p>` +
        `<p>Humidity: ${weatherData.main.humidity}%</p>` +
        `<p>Wind Speed: ${weatherData.wind.speed} m/s</p>` +
        `<p>Wind Direction: ${weatherData.wind.deg}°</p>` +
        `<img src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png">`;

    let weatherCard = document.createElement('div');
    weatherCard.className = 'card';
    weatherCard.innerHTML = weatherInfo;
    cardContainer.appendChild(weatherCard);
}

async function getWeather(apiUrl, cityName) {
    try {
        const response = await fetch(apiUrl);        
        if (!response.ok) {
            console.error (`Some problem with fetch weather data conection for ${cityName}`);
        }

        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error('We have some error in code', error);
        
    }
}