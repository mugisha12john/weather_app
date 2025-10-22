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

function loading() {
  const weatherBoxes = [
    document.getElementById("weather-box-1"),
    document.getElementById("weather-box-2"),
    document.getElementById("weather-box-3"),
    document.getElementById("weather-box-4"),
  ];
  weatherBoxes.forEach((box) => {
    box.innerHTML = `
    <div class="flex justify-start items-center h-10">
      <img src="./assets/images/icon-loading.svg" alt="Loading..." class="w-4 h-4 animate-spin" />
    </div>
  `;
  });
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

  const dailyForecast = [
    document.getElementById("daily-box-1"),
    document.getElementById("daily-box-2"),
    document.getElementById("daily-box-3"),
    document.getElementById("daily-box-4"),
    document.getElementById("daily-box-5"),
    document.getElementById("daily-box-6"),
    document.getElementById("daily-box-7"),
  ];
  dailyForecast.forEach((box) => {
    box.innerHTML = `
        <div class="flex justify-center  w-24 items-center h-32">
          
        </div>
      `;
    box.classList.add("animate-pulse");
  });

  //   hourly forest loading
  const days = document.getElementById("day");

  const hourlyBoxes = [
    document.getElementById("hourly-box-1"),
    document.getElementById("hourly-box-2"),
    document.getElementById("hourly-box-3"),
    document.getElementById("hourly-box-4"),
    document.getElementById("hourly-box-5"),
    document.getElementById("hourly-box-6"),
    document.getElementById("hourly-box-7"),
    document.getElementById("hourly-box-8"),
  ];
  hourlyBoxes.forEach((box) => {
    box.innerHTML = `
      <div class="text-white  w-2xs p-6">
        
      </div>
    `;
    box.classList.add("animate-pulse");
  });
  days.innerHTML = "-";
}
function weatherCodeIcon(code) {
  const icons = {
    0: { icon: "./assets/images/icon-sunny.webp" },
    1: { icon: "./assets/images/icon-sunny.webp" },
    2: { icon: "./assets/images/icon-overcast.webp" },
    3: { icon: "./assets/images/icon-partly-cloudy.webp" },
    45: { icon: "./assets/images/icon-fog.webp" },
    48: { icon: "./assets/images/icon-fog.webp" },
    51: { icon: "./assets/images/icon-drizzle.webp" },
    53: { icon: "./assets/images/icon-drizzle.webp" },
    55: { icon: "./assets/images/icon-drizzle.webp" },
    61: { icon: "./assets/images/icon-rain.webp" },
    63: { icon: "./assets/images/icon-rain.webp" },
    65: { icon: "./assets/images/icon-rain.webp" },
    80: { icon: "./assets/images/icon-snow.webp" },
    81: { icon: "./assets/images/icon-snow.webp" },
    82: { icon: "./assets/images/icon-snow.webp" },
    95: { icon: "./assets/images/icon-storm.webp" },
    96: { icon: "./assets/images/icon-storm.webp" },
    99: { icon: "./assets/images/icon-storm.webp" },
  };
  return icons[code] || { icon: "/assets/images/icon-default.webp" };
}

searchButton.addEventListener("click", () => {
  if (searchInput.value.trim() === "") {
    alert("Please enter a location to search.");
    searchInput.focus();
    return;
  }
  searchButton.innerText = "Loading...";

  loading();
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
      heroSection.innerText = "";
      heroSection.style.backgroundImage =
        "url('/assets/images/bg-today-large.svg')";
      heroSection.style.backgroundRepeat = "no-repeat";
      heroSection.style.backgroundSize = "cover";
      heroSection.style.backgroundColor = "transparent";
      const currentDateWeather = new Date(wetherJson.current.time);
      const month = currentDateWeather.toLocaleString("en-US", {
        month: "short",
      });
      const dayLong = currentDateWeather.toLocaleString("en-US", {
        weekday: "long",
      });
      const dayDate = currentDateWeather.getDate();
      const year = currentDateWeather.getFullYear();
      heroSection.innerHTML = `
            <div class="lg:flex lg:justify-around lg:items-center lg:mb-20">
            <div class="p-2 lg:mt-14">
              <h2 class="mt-4 text-white text-3xl font-bold text-center">
                ${json.results[0].name}, ${json.results[0].country}
              </h2>
              <h5 class="text-white text-lg font-light text-center">
                ${dayLong}, ${month} ${dayDate}, ${year}
              </h5>
            </div>
            <div
              class="flex gap-2 mt-14 mb-0 lg:mb-0 justify-center items-center"
            >
              <img
                src="${weatherCodeIcon(wetherJson.current.weather_code).icon}"
                class="w-32"
                alt="cloud image"
              />
              <h1 class="text-6xl mr-10 mb-2 lg:mb-0 lg:text-7xl text-white font-bold">
                <i>${wetherJson.current.temperature_2m}°C</i>
              </h1>
            </div>
          </div>`;

      console.log(wetherJson);
      console.log(json);

      // Further processing of wetherJson to update the UI can be done here
      const temperature = wetherJson.current.temperature_2m;
      const temperatureUnit = wetherJson.current_units.temperature_2m;
      const humidity = wetherJson.current.relative_humidity_2m;
      const windSpeed = wetherJson.current.wind_speed_10m;
      const precipitation = wetherJson.current.precipitation;
      const humidityUnit = wetherJson.current_units.relative_humidity_2m;
      const windSpeedUnit = wetherJson.current_units.wind_speed_10m;
      const precipitationUnit = wetherJson.current_units.precipitation;

      const box1 = document.getElementById("weather-box-1");
      const box2 = document.getElementById("weather-box-2");
      const box3 = document.getElementById("weather-box-3");
      const box4 = document.getElementById("weather-box-4");

      box1.innerHTML = `
      <h3 class="text-2xl lg:text-xl font-bold p-4 lg:p-2 text-white">${temperature} ${temperatureUnit}</h3>
    `;
      box2.innerHTML = `
      <h3 class="text-2xl lg:text-xl font-bold p-4 lg:p-2 text-white">${humidity} ${humidityUnit}</h3>
    `;
      box3.innerHTML = `
      <h3 class="text-2xl lg:text-xl font-bold p-4 lg:p-2 text-white">${windSpeed} ${windSpeedUnit}</h3>
    `;
      box4.innerHTML = `
      <h3 class="text-2xl lg:text-xl font-bold p-4 lg:p-2 text-white">${precipitation} ${precipitationUnit}</h3>
    `;

      //dail forecast log
      const max = wetherJson.daily.temperature_2m_max;
      const min = wetherJson.daily.temperature_2m_min;
      const weatherCodes = wetherJson.daily.weather_code;

      const dailyBoxes = [
        document.getElementById("daily-box-1"),
        document.getElementById("daily-box-2"),
        document.getElementById("daily-box-3"),
        document.getElementById("daily-box-4"),
        document.getElementById("daily-box-5"),
        document.getElementById("daily-box-6"),
        document.getElementById("daily-box-7"),
      ];
      dailyBoxes.forEach((box, index) => {
        box.classList.remove("animate-pulse");
        box.innerHTML = `
            <div
              class="bg-[#25253f] w-28 rounded-2xl text-white"
            >
              <h1 class="font-semibold p-2 text-center text-lg">Tue</h1>
              <img src="${
                weatherCodeIcon(weatherCodes[index]).icon
              }" alt="weather icon" />
              <div class="flex justify-between text-[15px] p-4">
                <h1 >${max[index]}°</h1>
                <h2>${min[index]}°</h2>
              </div>
            </div>
      `;
      });
      console.log(wetherJson.daily.temperature_2m_max);
      console.log(wetherJson.daily.temperature_2m_min);
    } catch (err) {
      console.error("Error fetching data:", err);
      searchButton.innerText = "Search";
    }
  }

  fetchData();
});
