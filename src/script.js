const dropdownUnits = document.getElementById("dropdown-unit");
const unitsButton = document.getElementById("units");

unitsButton.addEventListener("click", () => {
  dropdownUnits.classList.toggle("hidden");
});

const daysButton = document.getElementById("days-btn");
const dropdownDays = document.getElementById("days-model");
daysButton.addEventListener("click", () => {
  dropdownDays.classList.toggle("hidden");
});

const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
searchButton.addEventListener("click", () => {
  const query = searchInput.value;
  console.log("Searching for:", query);
  // Add your search functionality here
  try {
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${searchInput.value}&count=1&language=en&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        searchButton.innerText = "Loading...";
        if (data.results && data.results.length > 0) {
          const { latitude, longitude } = data.results[0];
          searchButton.innerText = "search";
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          // You can now use latitude and longitude to fetch weather data
        } else {
          console.log("No results found");
        }
      })
      .catch((error) => {
        console.error("Error fetching geocoding data:", error);
      });
  } catch (error) {
    console.error("Error:", error);
  }
});
