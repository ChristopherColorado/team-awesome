function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const stateCode = getQueryParam("state");
console.log("State code from URL:", stateCode);

if (stateCode) {
  fetchParks(stateCode);
}

function fetchParks(stateCode) {
  console.log("Fetching parks for state:", stateCode);

  const apiKey = "jLzKx2ki9dlZhspMbatyVvTTOEMr9jpRFO1vGdLM";
  const url = `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&api_key=${apiKey}`;
  console.log("API URL:", url);

  fetch(url)
    .then((response) => {
      console.log("Response received:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Parsed data:", data);
      displayParks(data.data);
    })
    .catch((error) => console.error("Error fetching parks:", error));
}

function fetchWeather(lat, lon, callback) {
  const apiKey = "aea084410e2a1fd8fa28fba82202fd04";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Weather data received:", data);
      callback(data);
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

function displayParks(parks) {
  console.log("Displaying parks:", parks);

  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  parks.forEach((park, index) => {
    console.log("Processing park:", park);

    const parkElement = document.createElement("div");
    parkElement.classList.add("card", "mb-4");
    parkElement.id = `card${index + 1}`;

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    cardHeader.textContent = "Top Result";

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const parkName = document.createElement("h5");
    parkName.classList.add("card-title");
    parkName.textContent = park.fullName;

    const parkDescription = document.createElement("p");
    parkDescription.classList.add("card-text");
    parkDescription.textContent = park.description;

    const parkLink = document.createElement("a");
    parkLink.href = park.url;
    parkLink.classList.add("btn", "btn-primary");
    parkLink.textContent = "Link to their site";

    cardBody.appendChild(parkName);
    cardBody.appendChild(parkDescription);
    cardBody.appendChild(parkLink);

    const weatherContainer = document.createElement("div");
    weatherContainer.classList.add("weather-info");
    cardBody.appendChild(weatherContainer);

    parkElement.appendChild(cardHeader);
    parkElement.appendChild(cardBody);
    cardContainer.appendChild(parkElement);

    console.log("Appended park element to container");

    if (park.latitude && park.longitude) {
      fetchWeather(park.latitude, park.longitude, (weatherData) => {
        const weatherInfo = document.createElement("p");
        weatherInfo.classList.add("card-text");
        weatherInfo.innerHTML = `
              <strong>Weather:</strong> ${weatherData.weather[0].description}<br>
              <strong>Temp:</strong> ${weatherData.main.temp} °C<br>
              <strong>Humidity:</strong> ${weatherData.main.humidity}%
            `;
        weatherContainer.appendChild(weatherInfo);
      });
    }
  });

  console.log("Finished displaying parks");
}
