import React, { useState, useEffect, useCallback } from 'react';
import {
  CurrentWeather,
  SkeletonComponent,
  WeatherForecast,
  WeatherUnitsRadio,
} from './components';
import {
  API_FORECAST_URL,
  API_KEY,
  API_WEATHER_URL,
  weatherUnits,
} from './constants';

const debounceDelay = 300;

const inputStyle = "bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

const getApiRoute = (isZipCode, location, units) =>
  isZipCode
    ? `${API_WEATHER_URL}?zip=${location}&appid=${API_KEY}&units=${units}`
    : `${API_WEATHER_URL}?q=${location}&appid=${API_KEY}&units=${units}`;

const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [location, setLocation] = useState('London');
  const [units, setUnits] = useState(weatherUnits.celcius);
  const [forecast, setForecast] = useState([]);
  const [weatherDataLoading, setWeatherDataLoading] = useState(true);
  const [forecastLoading, setForecastLoading] = useState(true);

  const fetctCurrentWeatherData = useCallback(async () => {
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
      setWeatherDataLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [location, units]);

  const fetchWeatherForecast = useCallback(async () => {
    const apiUrl = `${API_FORECAST_URL}?q=${location}&appid=${API_KEY}&units=${units.apiUnitValue}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod !== '200') return;

      const forecasts = data.list.filter((entry) =>
        entry.dt_txt.includes('12:00:00')
      );
      setForecast(forecasts);
      setForecastLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [location, units.apiUnitValue]);

  useEffect(() => {
    setWeatherData(null);
    setForecast([]);
    setForecastLoading(true);
    setWeatherDataLoading(true);
    // if (!location) return;

    const debounceTimer = setTimeout(() => {
      fetctCurrentWeatherData();
      fetchWeatherForecast();
    }, debounceDelay);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [location, fetctCurrentWeatherData, fetchWeatherForecast]);

  const handleCityChange = (event) => {
    setLocation(event.target.value);
  };

  const handleTemperatureUnitChange = (event) => {
    setUnits(weatherUnits[event.target.value]);
  };

  const showSkeletons = forecastLoading || weatherDataLoading;

  return (
    <div className='App h-screen p-8 max-w-4xl m-auto'>
      <h1 className='text-4xl'>Weather App</h1>
      <div className='mt-6 flex justify-between'>
        <div>
          <label className='mr-4' htmlFor='city'>Enter City:</label>
          <input className={inputStyle} id='city' type="text" value={location} onChange={handleCityChange} />
        </div>
        <WeatherUnitsRadio
          handleTemperatureUnitChange={handleTemperatureUnitChange}
          selected={units.name}
        />
      </div>
      <div className='flex flex-col justify-between'>
        {showSkeletons && <SkeletonComponent />}
        {!showSkeletons && (
          <>
            <CurrentWeather units={units} weatherData={weatherData} />
            <WeatherForecast units={units} forecast={forecast} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
