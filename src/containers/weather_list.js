import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = _.map(cityData.list.map(weather => weather.main.temp), temp => _.round(9 / 5 * (temp - 273) + 32));
    console.log(temps);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);

    return (
      <tr key={name}>
        <td>{name}</td>
        <td className="chart">
          <Chart data={temps} color="orange" units="F" />
        </td>
        <td className="chart">
          <Chart data={pressures} color="green" units="hPa" />
        </td>
        <td className="chart">
          <Chart data={humidities} color="black" units="%" />
        </td>
      </tr>
    );
  }
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (F)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>{this.props.weather.map(this.renderWeather)}</tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  // { weather } same as doing const weather = state.weather
  return { weather }; // { weather } === { weather: weather }
}

export default connect(mapStateToProps)(WeatherList);
