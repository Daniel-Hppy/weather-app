import "./style.css";
import { displayWeather, displayWeekForecast } from "./display-weather.js";
import { getWeather } from "./get-weather.js";
import { createLoadingScreen, hideLoading, showLoading } from "./loading.js";

const form = document.querySelector("form");
const loadingScreen = createLoadingScreen();

(async () => {
  const weatherData = await getWeather();
  console.log(weatherData);
})();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  showLoading(loadingScreen);
  try {
  await displayWeekForecast();
  await displayWeather();
  } finally {
    hideLoading(loadingScreen);
  }
});

(async () => {
  showLoading(loadingScreen);
  try {
  await displayWeather();
  await displayWeekForecast();
  } finally {
    hideLoading(loadingScreen);
  }
})();

