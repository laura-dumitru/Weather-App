let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = `0${now.getMinutes()}`.slice(-2);
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let day = days[date.getDay()];

  return formatHours(timestamp);
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

let li = document.querySelector(".date");
li.innerHTML = `${day} ${date} ${month} ${year} ${hours}:${minutes}`;

let city = "Barcelona";
let apiKey = "e3dda97cfe9d9fc23a4b5fa7130913b1";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(showTemperature);
apiURL = ` https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(displayForecast);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
      <h3> ${formatDate(forecast.dt * 1000)}</h3>
      <img
        src="https://image.flaticon.com/icons/svg/169/169367.svg"
        alt=""
      />
      <div class="weather-forecast-temperature">
        <strong>${Math.round(forecast.main.temp_max)}˚</strong>|${Math.round(
      forecast.main.temp_min
    )}˚
      </div>
    </div>`;
  }
}

function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#inputCity");

  let h1 = document.querySelector("h1");
  h1.innerHTML = inputCity.value;

  apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
  apiURL = ` https://api.openweathermap.org/data/2.5/forecast?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let link = document.querySelector(".temperature strong");
//link.innerHTML = 30;

function linkCelcius(event) {
  event.preventDefault();
  //link.innerHTML = 30;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}
let celciusTemperature = null;

let celciusLink = document.querySelector("#celsius");
celciusLink.addEventListener("click", linkCelcius);

function linkFahrenheit(event) {
  event.preventDefault();

  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", linkFahrenheit);

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  let description = response.data.weather[0].description;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} Km/h`;
  celciusTemperature = response.data.main.temp;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let locationButton = document.querySelector(".location");
locationButton.addEventListener("click", getCurrentPosition);
