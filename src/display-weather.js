import { getWeatherValue } from "./get-weather.js";
import { getWeekValue } from "./get-weather.js";
import { getWeatherIcon } from "./icons.js";

export async function displayWeather() {
  const data = await getWeatherValue();

  if (!data) {
    console.error("NO weather data to display");
    return;
  }
  const location = document.querySelector(".city");
  const temperature = document.querySelector(".temperature");
  const realFeel = document.querySelector(".real-feel");
  const wind = document.querySelector(".wind");
  const rainProb = document.querySelector(".rain-prob");
  const uvIndex = document.querySelector(".uv-index");
  const icon = document.querySelector(".icon");

  icon.src = getWeatherIcon(data.iconData)
  location.textContent = data.locationData;
  temperature.textContent = `${data.temperatureData}`;
  realFeel.textContent = data.realFeelData;
  wind.textContent = data.windData;
  rainProb.textContent = `${data.rainProbData}%`;
  uvIndex.textContent = data.uvIndexData;
}

export async function displayWeekForecast() {
  const weekData = await getWeekValue();

  if (!weekData || weekData.length === 0) {
    console.error("No week forecast data to display");
    return;
  }
  const weekDayContainer = document.querySelectorAll(".week-forecast");

  weekData.forEach((data, index) => {
    weekDayContainer[index].innerHTML = "";
    const statusContainer = document.createElement("div");
    const day = document.createElement("p");
    day.textContent = data.date;

    const iconContainer = document.createElement("img");
    iconContainer.src = getWeatherIcon(data.icon);

    const status = document.createElement("p");
    status.textContent = data.icon;

    const temperature = document.createElement("p");
    temperature.textContent = data.temperature;

    statusContainer.append(iconContainer, status);
    weekDayContainer[index].append(day, statusContainer, temperature);
  });
}
