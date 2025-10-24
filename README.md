# Weather App 🌤️

![Weather App Preview](./preview.jpg)

## Overview

A responsive **weather application** built with **HTML, TailwindCSS, and modern JavaScript (ES6+)**.  
It fetches live weather data from the [Open-Meteo API](https://open-meteo.com/) to display:

- Current weather conditions
- 7-day daily forecast
- Next 8-hour hourly forecast

---

## Features

- Search weather by location
- Display current temperature, weather icon, and location details
- Show additional metrics: humidity, wind speed, precipitation
- 7-day forecast with high/low temperatures and icons
- Next 8-hour forecast with AM/PM time format
- Toggle between Celsius/Fahrenheit and other measurement units
- Responsive design for mobile and desktop
- Loading animations while fetching data

---

## Key Learnings

- **API Integration**: Fetching geolocation and weather data using `fetch` with **async/await**, handling JSON responses, and errors.
- **ES6+ Syntax**: Arrow functions, template literals, destructuring, `const/let`, array methods (`map`, `forEach`).
- **Dynamic DOM Manipulation**: Generated hourly and daily forecast boxes dynamically.
- **Modular JavaScript**: Functions like `renderHero`, `renderWeatherBoxes`, `renderDailyForecast`, and `renderHourlyForecast` to keep code DRY and maintainable.
- **UX Enhancements**: Loading states, responsive layout, and AM/PM formatting.

---

## Technologies

- HTML5 & TailwindCSS  
- JavaScript (ES6+)  
- Open-Meteo API  
- Responsive design principles

---

## How I Built It

1. Planned HTML structure based on mobile and desktop designs.  
2. Styled UI using TailwindCSS.  
3. Implemented **API fetching** for geolocation and weather data.  
4. Built **dynamic rendering functions** for hero section, current weather, daily, and hourly forecasts.  
5. Added **loading animations** for better UX.  
6. Ensured responsive layout and proper AM/PM formatting.  
7. Refactored code using **modern ES6 features** for readability and maintainability.

---

## Future Improvements

- Add **search history** for recent locations  
- Enable more **unit conversions** dynamically  
- Smooth **horizontal scroll** for hourly forecast  
- Add **animated weather transitions**  

---

## Deployment


- [Netlify](https://www.netlify.com/)  

---

## Reflection

This project strengthened my understanding of:

- **Fetching APIs** and handling JSON data  
- **Dynamic DOM updates**  
- Writing **clean ES6+ JavaScript**  
- Best practices for **UX and responsive design**
