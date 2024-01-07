import React, { useState, useEffect, useCallback } from 'react';
import './styles/App.css';
import { WeatherForecast, WeatherUnitsRadio } from './components';
import { API_KEY, API_WEATHER_URL, weatherUnits } from './constants';

const debounceDelay = 300;

const getApiRoute = (isZipCode, location, units) =>
  isZipCode
    ? `${API_WEATHER_URL}?zip=${location}&appid=${API_KEY}&units=${units}`
    : `${API_WEATHER_URL}?q=${location}&appid=${API_KEY}&units=${units}`;
;

const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [location, setLocation] = useState('London'); // Default city
  const [units, setUnits] = useState(weatherUnits.celcius)

  const fetchData = useCallback(async () => {
    try {
      const isZipCode = /^\d+$/.test(location);

      const response = await fetch(getApiRoute(isZipCode, location, units.apiUnitValue));
      const data = await response.json();

      if (!response.ok) {
        console.error('HTTP error:', response.status, response.statusText);
        return;
      }

      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [location, units]);

  useEffect(() => {
    setWeatherData(null);
    if (!location) return;

    const debounceTimer = setTimeout(() => {
      fetchData();
    }, debounceDelay)

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [location, fetchData]);

  const handleCityChange = (event) => {
    setLocation(event.target.value);
  };

  const handleTemperatureUnitChange = (event) => {
    setUnits(weatherUnits[event.target.value]);
  };

  return (
    <div className='App'>
      <h1>Weather App</h1>
      <div>
        <label htmlFor='city'>Enter City:</label>
        <input
          type='text'
          id='city'
          value={location}
          onChange={handleCityChange}
        />
      </div>
      <WeatherUnitsRadio handleTemperatureUnitChange={handleTemperatureUnitChange} selected={units.name} />
      {weatherData && (
        <div className='weather-info'>
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <div>
            <strong>Temperature:</strong> {weatherData.main.temp}°{units.symbol}
          </div>
          <div>
            <strong>Description:</strong> {weatherData.weather[0].description}
          </div>
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
            />
          </div>
        </div>
      )}
      {weatherData && <WeatherForecast location={location} units={units} />}
    </div>
  );
};

export default App;
