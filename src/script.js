const dropdownUnits = document.getElementById("dropdown-unit");
const unitsButton = document.getElementById("units");

unitsButton.addEventListener("click", () => {
  dropdownUnits.classList.toggle("hidden");
});
