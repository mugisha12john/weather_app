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
const heroSection = document.querySelector(".hero-section");
searchButton.addEventListener("click", () => {
  searchButton.innerText = "Loading...";
  const query = searchInput.value;
  console.log("Searching for:", query);
  // Apply background color
  heroSection.style.backgroundImage = "none";
  heroSection.style.backgroundColor = "#25253f";

  // Replace content with a loading placeholder
  heroSection.innerHTML = `
  <div class="flex justify-center gap-4 items-center h-[300px]">
    <img src="./assets/images/icon-loading.svg" alt="Loading..." class="w-10 h-10 animate-spin" />
     <p class="text-white font-bold text-2xl">please wait</p>
  </div>
`;

  heroSection.classList.add("animate-pulse");

  // Add your search functionality here
  const api = `https://geocoding-api.open-meteo.com/v1/search?name=${searchInput.value}&count=1&language=en&format=json`;

  async function fetchData() {
    try {
      const res = await fetch(api);
      const json = await res.json();
      let lat = json.results[0].latitude;
      let lon = json.results[0].longitude;
      const wether = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code`
      );
      const wetherJson = await wether.json();
      searchButton.innerText = "Search";
      heroSection.classList.remove("animate-pulse");
      // Now you can use wetherJson to update your UI with the fetched weather data
      heroSection.innerHTML = `
        <div class="p-2 lg:mt-14">
          <h2 class="text-white font-medium">Location: ${json.results[0].name}, ${json.results[0].country}</h2>
          <p class="text-white text-5xl font-bold">${wetherJson.current.temperature_2m}°C</p>
          <p class="text-white font-medium">Weather Code: ${wetherJson.current.weather_code}</p>
        </div>
        `;
      console.log(wetherJson);
      console.log(json);
    } catch (err) {
      console.error("Error fetching data:", err);
      searchButton.innerText = "Search";
    }
  }

  fetchData();
});
