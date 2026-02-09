const addressInput = document.querySelector("input");

export async function getWeather() {
  const address = addressInput.value || "Manila";
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}?key=4S9RSABN3W3H94JTN923HC4SB`,
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const weatherData = await response.json();

    if (!weatherData.address) {
      throw new Error(`${weatherData.address} not found`);
    }
    return weatherData;
  } catch (error) {
    console.error("This is the error:", error);
    return null;
  }
}

export async function getWeatherValue() {
  const weatherData = await getWeather();

  if (weatherData) {
    const locationData = weatherData.address;
    const temperature = weatherData.currentConditions.temp;
    const temperatureData = convertTemp(temperature);
    const realFeel = weatherData.currentConditions.feelslike;
    const realFeelData = convertTemp(realFeel);
    const wind = weatherData.currentConditions.windspeed;
    const windData = convertWind(wind);
    const rainProbData =  weatherData.currentConditions.precipprob;
    const uvIndexData = weatherData.currentConditions.uvindex;
    const iconData = convertIcon(weatherData.currentConditions.icon);
    const weekData = weatherData.days.slice(0, 7);
    const todayData = weatherData.days.slice(0, 1);

    return {
      iconData,
      locationData,
      temperatureData,
      realFeelData,
      windData,
      rainProbData,
      uvIndexData,
      weekData,
      todayData
    };
  }
}

export async function getWeekValue() {
  const weatherData = await getWeatherValue();
  if (!weatherData || !weatherData.weekData) {
    console.error("No weather data available");
    return [];
    }
    const weekDataValue = weatherData.weekData;
    return weekDataValue.map((day) => ({
      date: convertDate(day.datetime),
      icon: convertIcon(day.icon),
      temperature: convertTemp(day.temp),
    }));
}

function convertDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();

  if(date.toDateString() === today.toDateString()) {
    return "Today"
  }
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

function convertTemp(temp) {
  return `${Math.floor(((temp - 32) * 5) / 9)}°`;
}

function convertWind(mph) {
  return `${(mph * 1.609344).toFixed(1)} km/h`; //formula for converting mph to km/h
}

function convertIcon(string) {
    if (string === "clear-day") {
      return "Sunny";
    } else if (string === "cloudy") {
      return "Cloudy";
    } else if (string === "partly-cloudy-day") {
      return "Partially Cloudy";
    } else if (string === "rain") {
      return "Rainy";
    } else if (string === "snow") {
      return "Snowy";
    } else if (string === "wind") {
      return "Windy";
    } else if (string === "fog") {
      return "Foggy";
    } else if (string === "thunder-rain" || string === "thunderstom") {
      return "Thunderstorm";
    } else {
      return "Sunny";
    }
}