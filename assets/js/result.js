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
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

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
    cardBody.classList.add("card-body", "d-flex");

    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");

    const parkName = document.createElement("h5");
    parkName.classList.add("card-title");
    parkName.textContent = park.fullName;

    const parkDescription = document.createElement("p");
    parkDescription.classList.add("card-text");
    parkDescription.textContent = park.description;

    textContainer.appendChild(parkName);
    textContainer.appendChild(parkDescription);

    const weatherContainer = document.createElement("div");
    weatherContainer.classList.add("weather-info");
    textContainer.appendChild(weatherContainer);

    const linkContainer = document.createElement("div");
    linkContainer.classList.add("link-container");

    const parkLink = document.createElement("a");
    parkLink.href = park.url;
    parkLink.classList.add("btn", "btn-primary");
    parkLink.textContent = "Official NPS Page";

    linkContainer.appendChild(parkLink);
    textContainer.appendChild(linkContainer);

    if (park.images && park.images.length > 0) {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      const parkImage = document.createElement("img");
      parkImage.src = park.images[0].url;
      parkImage.classList.add("card-img");
      parkImage.alt = park.fullName;

      imageContainer.appendChild(parkImage);
      cardBody.appendChild(imageContainer);
    }

    cardBody.appendChild(textContainer);

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
              <strong>Temp:</strong> ${weatherData.main.temp} °F<br>
              <strong>Humidity:</strong> ${weatherData.main.humidity}%
            `;
        weatherContainer.appendChild(weatherInfo);

        const wazeLink = document.createElement("a");
        wazeLink.href = `https://www.waze.com/ul?ll=${park.latitude},${park.longitude}&navigate=yes`;
        wazeLink.classList.add("btn", "btn-secondary", "mt-2");
        wazeLink.textContent = "Directions via Waze";

        weatherContainer.appendChild(wazeLink);
      });
    }
  });

  console.log("Finished displaying parks");
}

//Lightmode/Darmkmode

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.getElementById("#theme-btn");
  // themeToggleButton.textContent = "Toggle Light/Dark Mode";
  // themeToggleButton.classList.add("btn", "btn-secondary");
  // themeToggleButton.style.position = "absolute";
  // themeToggleButton.style.top = "10px";
  // themeToggleButton.style.right = "10px";

  // document.querySelector(".header").appendChild(themeToggleButton);

  const setTheme = (theme) => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  };

  const currentTheme = localStorage.getItem("theme") || "light";
  setTheme(currentTheme);

  themeToggleButton.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-mode")
      ? "light"
      : "dark";
    setTheme(newTheme);
  });
});

// Back button
document.getElementById("backButton").addEventListener("click", function () {
  window.location.replace("index.html");
});
