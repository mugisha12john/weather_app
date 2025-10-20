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
