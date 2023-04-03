function showTemperature(response) {
  let temperature = document.querySelector("#temperature-value");
  let city = document.querySelector("#city-name");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  temperature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  console.log(response.data);
}

let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=shiraz&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
