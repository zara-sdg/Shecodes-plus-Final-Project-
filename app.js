function showDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return day;
}

function getForecast(coordinates) {
  let apiKey = "tfed3e5cefb4b66afc87ab20o9c21efc";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let temperature = document.querySelector("#temperature-value");
  let city = document.querySelector("#city-name");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let feelsLike = document.querySelector("#feels-like");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");
  celciusTemperature = response.data.temperature.current;
  temperature.innerHTML = Math.round(celciusTemperature);
  city.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  feelsLike.innerHTML = Math.round(response.data.temperature.feels_like);
  date.innerHTML = showDate(response.data.time * 1000);
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "tfed3e5cefb4b66afc87ab20o9c21efc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchForm(event) {
  event.preventDefault();
  let searchInpute = document.querySelector("#search-inpute");
  let city = searchInpute.value;
  searchCity(city);
}

function onFahrenheitClick(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature-value");
  celcius.classList.remove("degree-link");
  fahrenheit.classList.add("degree-link");
  temperature.innerHTML = Math.round((9 / 5) * celciusTemperature + 32);
}

function onCelciusClick(event) {
  event.preventDefault();
  celcius.classList.add("degree-link");
  fahrenheit.classList.remove("degree-link");
  let temperature = document.querySelector("#temperature-value");
  temperature.innerHTML = Math.round(celciusTemperature);
}

function showForecast(response) {
  let forecastDay = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<p class="row">`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-auto col-md-2 weather-forecast-item">
                <p class="weather-forecast-date">${formatDay(
                  forecastDay.time
                )}</p><img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png"
                  alt="" width="38">
                <p class="weather-forecast-temperature"><span class="weather-forecast-max">${Math.round(
                  forecastDay.temperature.maximum
                )}°</span><span class="weather-forecast-min">${Math.round(
          forecastDay.temperature.minimum
        )}°</span></p>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</p>`;
  forecastElement.innerHTML = forecastHTML;
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchForm);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", onFahrenheitClick);

let celcius = document.querySelector("#celsius-link");
celcius.addEventListener("click", onCelciusClick);
searchCity("shiraz");
