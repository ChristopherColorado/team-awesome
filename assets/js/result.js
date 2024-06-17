// Fetch and display parks based on state code from URL
document.addEventListener("DOMContentLoaded", () => {
  const stateCode = getQueryParam("state");
  if (stateCode) {
    fetchParks(stateCode);
  }

  // Back button
  document.getElementById("backButton").addEventListener("click", function () {
    window.location.replace("index.html");
  });

  // Light/Dark mode toggle
  const themeToggleButton = document.createElement("button");
  themeToggleButton.textContent = "Toggle Light/Dark Mode";
  themeToggleButton.classList.add("btn", "btn-secondary");
  themeToggleButton.style.position = "absolute";
  themeToggleButton.style.top = "10px";
  themeToggleButton.style.right = "10px";
  document.querySelector(".header").appendChild(themeToggleButton);
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

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

async function fetchParks(stateCode) {
  const apiKey = "jLzKx2ki9dlZhspMbatyVvTTOEMr9jpRFO1vGdLM";
  const url = `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayParks(data.data);
  } catch (error) {
    console.error("Error fetching parks:", error);
  }
}

async function fetchWeather(lat, lon) {
  const apiKey = "aea084410e2a1fd8fa28fba82202fd04";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

function displayParks(parks) {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  parks.forEach((park, index) => {
    const parkElement = document.createElement("div");
    parkElement.classList.add("col-md-6", "mb-4");

    const card = document.createElement("div");
    card.classList.add("card");
    card.style.border = "6px solid black";

    const parkImage = document.createElement("img");
    parkImage.src =
      park.images && park.images.length > 0 ? park.images[0].url : "";
    parkImage.classList.add("card-img-top");
    parkImage.alt = park.fullName;
    parkImage.style.cursor = "pointer"; // Indicate that the image is clickable

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const parkName = document.createElement("h5");
    parkName.classList.add("card-title");
    parkName.textContent = park.fullName;

    cardBody.appendChild(parkName);

    card.appendChild(parkImage);
    card.appendChild(cardBody);
    parkElement.appendChild(card);
    cardContainer.appendChild(parkElement);

    // Add click event to parkImage to show modal with details
    parkImage.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the click from propagating to the card
      showModal(park);
    });
  });
}

// Function to show modal with park details
async function showModal(park) {
  const modalContent = document.getElementById("modalContent");
  modalContent.innerHTML = `
    <h5>${park.fullName}</h5>
    <p>${park.description}</p>
    <p><strong>State:</strong> ${park.states}</p>
    <p><strong>Designation:</strong> ${park.designation}</p>
    <p><strong>Park Code:</strong> ${park.parkCode}</p>
    <a href="${park.url}" target="_blank" class="btn btn-primary">Visit Official Page</a>
  `;

  if (park.latitude && park.longitude) {
    const weatherData = await fetchWeather(park.latitude, park.longitude);
    if (weatherData) {
      modalContent.innerHTML += `
        <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
        <p><strong>Temp:</strong> ${weatherData.main.temp} °F</p>
        <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
      `;
      modalContent.innerHTML += `
        <a href="https://www.waze.com/ul?ll=${park.latitude},${park.longitude}&navigate=yes" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">Directions via Waze</a>
      `;
    }
  }

  const modal = new bootstrap.Modal(document.getElementById("parkModal"));
  modal.show();
}
