import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = _.map(cityData.list.map(weather => weather.main.temp), temp => _.round(9 / 5 * (temp - 273) + 32));
    console.log(temps);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    const { lon, lat } = cityData.city.coord;
    // ^^^^ same as const lon = cityData.city.coord.lon and const lat = cityData.city.coord.lon
    function average(data) {
      return _.round(_.sum(data) / data.length);
    }
    return (
      <tr key={name}>
        <td>
          <GoogleMap lon={lon} lat={lat} />
        </td>
        <td>
          <Chart data={temps} color="deeppink" units="F" />
        </td>
        <td>
          <Chart data={pressures} color="chartreuse" units="hPa" />
        </td>
        <td>
          <Chart data={humidities} color="aqua" units="%" />
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
