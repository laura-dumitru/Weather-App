let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
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

let li = document.querySelector(".date");
li.innerHTML = `${day} ${date} ${month} ${year} ${hours}:${minutes}`;

let city = "Barcelona";
let apiKey = "e3dda97cfe9d9fc23a4b5fa7130913b1";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);

function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#inputCity");

  let h1 = document.querySelector("h1");
  h1.innerHTML = inputCity.value;

  apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let link = document.querySelector(".temperature strong");
link.innerHTML = 30;

function linkCelcius(event) {
  event.preventDefault();
  link.innerHTML = 30;
}
let celciusLink = document.querySelector("#celsius");
celciusLink.addEventListener("click", linkCelcius);

function linkFahrenheit(event) {
  event.preventDefault();
  link.innerHTML = 86;
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", linkFahrenheit);

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
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
