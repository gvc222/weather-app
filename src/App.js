import React, { useState } from 'react';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE = "http://api.openweathermap.org/data/2.5/"

const App = () => {
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const [weather, setWeather] = useState({});
  const [ query, setQuery ] = useState("");

  const search = evt => {
    if (evt.key === "Enter" || evt.keyCode === 13){
      // Get API
      fetch(`${API_BASE}weather?q=${query}&units=metric&APPID=${API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          console.log(weather);
        });
    }
  }

  // const search = async () => {
  //   const response = await fetch(`${API_BASE}weather?q=${query}&APPID=${API_KEY}`);
  //   const data = await response.json();
  //   setWeather(data);
  //   setQuery("")
  //   console.log(weather);
  // }

  const submitButton = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}weather?q=${query}&units=metric&APPID=${API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          console.log(weather);
        });
    
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <form className="search-form" onSubmit={submitButton}>
          <div className="search-box">
            <input 
              type="text" 
              className="search-bar"
              placeholder="Type a location here..." 
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyDown={search}
            />
            <button type="submit" className='search-button'>Search</button>
          </div>
          
        </form>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">
                {dateBuilder(new Date())}
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : (
          ''
        ) }
      </main>
    </div>
  )
}

export default App;
