import React, { Component } from "react";
import PropTypes from "prop-types";
import dateFns from "date-fns";
import https from "https";

import ForecastCard from "../ForecastCard";
import weatherIcons from "./icons.json";

class WeatherForecast extends Component {
  state = {
    data: null,
    apiKey: "82d5aca104b36081fa4a3759bfd51054",
    lat: "38.8213",
    lon: "-121.1931", 
    apiUrl: "https://api.openweathermap.org/data/2.5/" + this.props.apiType,
  };

  componentWillMount() {
    const { apiKey, apiUrl, lat, lon } = this.state;
    https.get(`${apiUrl}?lat=${lat}&lon=${lon}&APPID=${apiKey}`, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
        if (data.length > 0) {
          this.loadWeatherData(data);
          console.log("Data loaded!");
        }
      });

    }).on("error", (err) => {
      console.log("Error: " + err);
    });
  }

  loadWeatherData = (data) => {
    this.setState({
      data: JSON.parse(data)
    });
  }

  loadIndicatorIcon = (weatherId) => {
    var prefix = 'wi wi-';
    var icon = weatherIcons[weatherId].icon;

    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(weatherId > 699 && weatherId < 800) && !(weatherId > 899 && weatherId < 1000)) {
      icon = 'day-' + icon;
    }

    // Finally tack on the prefix.
    icon = prefix + icon;
    return icon;
  }

  renderCards() {
    let cards = [];

    if (this.state.data !== null) {
      for (let i = 0; i < this.state.data.list.length; i++) {
        let forecast = this.state.data.list[i];
        const date = new Date(forecast.dt * 1000);
        const formattedString = dateFns.format(date, "ddd h aa");
        if (forecast) {
          cards.push(
            <ForecastCard icon={this.loadIndicatorIcon(forecast.weather[0].id)}
                          date={formattedString}
                          temp={forecast.main.temp}
                          humidity={forecast.main.humidity}
                          pressure={forecast.main.pressure}
                          windSpeed={forecast.wind.speed}
            />
          );
        }
      }
    }

    return (
      <div className="weather-cards">
        <div className="forecast-card">
          <div className="desc row">
            <div className="col col-center" key={0}>
              Indicator
            </div>
            <div className="col col-center" key={1}>
              Date/Time
            </div>
            <div className="col col-center" key={2}>
              Temperature
            </div>
            <div className="col col-center" key={3}>
              Humidity
            </div>
            <div className="col col-center" key={4}>
              Pressure
            </div>
            <div className="col col-center" key={5}>
              Wind Speed
            </div>
          </div>
          {cards}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="weather">
        {this.renderCards()}
      </div>
    );
  }
}

WeatherForecast.propTypes = {
  apiType: PropTypes.string.isRequired,
};

export default WeatherForecast;
