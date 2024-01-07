import React, { useState, useEffect, useCallback } from 'react';
import {
  CurrentWeather,
  WeatherForecast,
  WeatherUnitsRadio,
} from './components';
import { API_KEY, API_WEATHER_URL, weatherUnits } from './constants';

const debounceDelay = 300;

const getApiRoute = (isZipCode, location, units) =>
  isZipCode
    ? `${API_WEATHER_URL}?zip=${location}&appid=${API_KEY}&units=${units}`
    : `${API_WEATHER_URL}?q=${location}&appid=${API_KEY}&units=${units}`;

const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [location, setLocation] = useState('London');
  const [units, setUnits] = useState(weatherUnits.celcius);

  const fetchData = useCallback(async () => {
    try {
      const isZipCode = /^\d+$/.test(location);

      const response = await fetch(
        getApiRoute(isZipCode, location, units.apiUnitValue)
      );
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
    }, debounceDelay);

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
    <div className='App h-screen p-8 max-w-4xl m-auto'>
      <h1 className='text-4xl'>Weather App</h1>
      <div className='mt-6 flex justify-between'>
        <div>
          <label htmlFor='city'>Enter City:</label>
          <input
            type='text'
            id='city'
            value={location}
            onChange={handleCityChange}
          />
        </div>
        <WeatherUnitsRadio
          handleTemperatureUnitChange={handleTemperatureUnitChange}
          selected={units.name}
        />
      </div>
      <div className='flex flex-col justify-between'>
        <CurrentWeather units={units} weatherData={weatherData} />
        <WeatherForecast location={location} units={units} />
      </div>
    </div>
  );
};

export default App;
