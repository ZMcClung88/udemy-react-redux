import axios from 'axios';

const API_KEY = 'db9ab39b8cff62e7cb59d50fd2282de2';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
// same as ^^^^ const ROOT_URL = 'http://api.openweathermap.org/data/2.5/forecast?appid=' + API_KEY

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city},us`;
  const request = axios.get(url);

  console.log('Request', request);

  return {
    type: FETCH_WEATHER,
    // We are returning the promise as the payload
    payload: request
  };
}
