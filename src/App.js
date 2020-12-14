import { useState } from "react";
import "./style/main.scss";
const api = {
  baseApi: "http://api.openweathermap.org/data/2.5/",
  apiKey: "f44af96718edd14bb8a7006ab45b2ae3",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const getData = (e) => {
    if (e.which === 13) {
      fetch(
        `${api.baseApi}weather?q=${query}&units=metric&&appid=${api.apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
          setQuery("");
        });
    }
  };
  let dateBuilder = (d) => {
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
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let day = days[d.getDay()],
      date = d.getDate(),
      month = months[d.getMonth()],
      year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className="App">
      <div
        className={
          typeof weather.main !== "undefined"
            ? weather.main.temp > 16
              ? "weather_app wram"
              : "weather_app"
            : "weather_app"
        }
      >
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={getData}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div className="weather_content">
            <h3>
              {weather.name}, {weather.sys.country}
            </h3>
            <p>{dateBuilder(new Date())}</p>
            <div className="c">
              <h2>{Math.round(weather.main.temp)} </h2>
              <span>C</span>
            </div>
            <h4>{weather.weather[0].main}</h4>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
