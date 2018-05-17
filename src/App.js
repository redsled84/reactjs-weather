import React, { Component } from 'react';
// import Weather from "./components/Weather";
import WeatherForecast from "./modules/WeatherForecast";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <title>
          myweather
        </title>
        <header className="App-header">
          <div id="logo">
            <span className="icon">wb_cloudy</span>
            <span>
              My<b>Weather</b>
            </span>
          </div>
        </header>
        <main>
          <WeatherForecast apiType="forecast" />
        </main>
      </div>
    );
  }
}

export default App;
