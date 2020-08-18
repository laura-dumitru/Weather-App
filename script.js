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
li.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

let city = "Rio";
let apiKey = "e3dda97cfe9d9fc23a4b5fa7130913b1";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(showTemperature);
apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(update);

function update(response) {
  let forecastElement = document.querySelector("#forecast");
  let iconElement = document.querySelector(".main-icon");
  let gradientElement = document.querySelector(".container");
  let weatherAppElement = document.querySelector(".weather-app");
  let searchButtonElement = document.querySelector("input.btn");
  let locationButtonElement = document.querySelector(".location.btn");

  let forecast = null;
  forecastElement.innerHTML = null;

  for (let i = 0; i < 6; i++) {
    forecast = response.data.list[i];
    let description = forecast.weather[0].description;
    let icon = forecast.weather[0].icon;
    // https://openweathermap.org/weather-conditions#How-to-get-icon-URL

    if (icon === "01d") {
      // sun
      if (i === 0) {
        gradientElement.id = "sunny";
        searchButtonElement.id = "sun";
        locationButtonElement.id = "sun";
      }
    } else if (icon === "01n") {
      // moon
    } else if (icon === "02d") {
      // sun + cloud
      if (i === 0) {
        gradientElement.id = "sunny";
        searchButtonElement.id = "sun";
        locationButtonElement.id = "sun";
      }
    } else if (icon === "02n") {
      // cloud + moon
    } else if (/(0[34]|50)[dn]/.test(icon)) {
      // cloud
      if (i === 0) {
        gradientElement.id = "cloudy";
        searchButtonElement.id = "cloud";
        locationButtonElement.id = "cloud";
      }
    } else if (icon === "10d") {
      // rainbow
      if (i === 0) {
        gradientElement.id = "rainy";
        searchButtonElement.id = "rain";
        locationButtonElement.id = "rain";
      }
    } else if (/09[dn]|10n/.test(icon)) {
      // rain
      if (i === 0) {
        gradientElement.id = "rainy";
        searchButtonElement.id = "rain";
        locationButtonElement.id = "rain";
      }
    } else if (icon.includes("11")) {
      // lightning
      if (i === 0) {
        gradientElement.id = "stormy";
        searchButtonElement.id = "storm";
        locationButtonElement.id = "storm";
      }
    } else if (icon.includes("13")) {
      // snow
      if (i === 0) {
        gradientElement.id = "snowy";
        searchButtonElement.id = "snow";
        locationButtonElement.id = "snow";
      }
    }

    let src = `img/${icon}.svg`;
    let black = "#3f3f44";

    if (i === 0) {
      iconElement.setAttribute("src", src);
      iconElement.setAttribute("alt", description);

      if (icon.endsWith("n")) {
        gradientElement.id = "nighttime";
        searchButtonElement.id = "night";
        locationButtonElement.id = "night";
        weatherAppElement.style.color = "white";
      } else {
        weatherAppElement.style.color = black;
      }
    }

    forecastElement.style.color = black;
    forecastElement.innerHTML += `<div class="col-2">
      <h3>${formatHours(forecast.dt * 1000)}</h3>
      <img src="${src}" alt="${description}"/>
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
  apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(update);
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

  apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(update);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  //axios.get(`${apiUrl}&appid=${apiKey}`).then(log);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  //apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  //axios.get(apiURL).then(update);
}

let locationButton = document.querySelector(".location");
locationButton.addEventListener("click", getCurrentPosition);
