import React, { Component } from "react";
import PropTypes from "prop-types";

import "./styles/weather-icons-master/css/weather-icons.min.css";

class ForecastCard extends Component {
  kelvinToFahrenheit = (kelvin) => {
    return Math.round(kelvin * 9/5 - 459.67);
  };

  render() {
    return (
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
        <div className="weather-data row">
          <div className="col col-center" key={0}>
            <i className={this.props.icon}></i>
          </div>
          <div className="date col col-center" key={1}>
            {this.props.date}
          </div>
          <div className="col col-center" key={2}>
            {this.kelvinToFahrenheit(this.props.temp)}&deg;F
          </div>
          <div className="col col-center" key={3}>
            {this.props.humidity}%
          </div>
          <div className="col col-center" key={4}>
            {this.props.pressure} hPa
          </div>
          <div className="wind-speed col col-center" key={5}>
            {this.props.windSpeed} m/s
          </div>
        </div>
      </div>
    );
  }
}

ForecastCard.propTypes = {
  icon: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
};

export default ForecastCard;
