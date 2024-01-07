import React, { useState, useEffect, useCallback } from 'react';
import {
  CurrentWeather,
  SkeletonComponent,
  WeatherForecast,
  WeatherUnitsRadio,
} from './components';
import {
  API_FORECAST_URL as forecastUrl,
  API_KEY,
  API_WEATHER_URL as weatherUrl,
  weatherUnits,
} from './constants';

const debounceDelay = 300;

const inputStyle =
  'bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500';

const getApiRoute = (isZipCode, location, units) =>
  isZipCode
    ? `${weatherUrl}?zip=${location}&appid=${API_KEY}&units=${units}`
    : `${weatherUrl}?q=${location}&appid=${API_KEY}&units=${units}`;

const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [location, setLocation] = useState('London');
  const [units, setUnits] = useState(weatherUnits.celcius);
  const [forecast, setForecast] = useState([]);
  const [weatherDataLoading, setWeatherDataLoading] = useState(true);
  const [forecastLoading, setForecastLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrentWeatherData = useCallback(async () => {
    try {
      const isZipCode = /^\d+$/.test(location);
      const apiUrl = getApiRoute(isZipCode, location, units.apiUnitValue);

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!response.ok) {
        console.error('HTTP error:', response.status, response.statusText);
        setError('Error fetching current weather data');
        return;
      }

      setWeatherData(data);
      setWeatherDataLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching current weather data');
    }
  }, [location, units]);

  const fetchWeatherForecast = useCallback(async () => {
    const apiUrl = `${forecastUrl}?q=${location}&appid=${API_KEY}&units=${units.apiUnitValue}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod !== '200') {
        console.error('HTTP error:', response.status, response.statusText);
        setError('Error fetching weather forecast data');
        return;
      }

      const forecasts = data.list.filter((entry) =>
        entry.dt_txt.includes('12:00:00')
      );
      setForecast(forecasts);
      setForecastLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather forecast data');
    }
  }, [location, units.apiUnitValue]);

  useEffect(() => {
    setWeatherData(null);
    setForecast([]);
    setForecastLoading(true);
    setWeatherDataLoading(true);
    setError(null);

    const debounceTimer = setTimeout(() => {
      fetchCurrentWeatherData();
      fetchWeatherForecast();
    }, debounceDelay);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [location, fetchCurrentWeatherData, fetchWeatherForecast]);

  const handleCityChange = (event) => {
    const inputValue = event.target.value;

    const validCityNameRegex = /^[a-zA-Z\s-]+$/;
    const validPostalCodeRegex = /^[\dA-Z\s,]+$/i;

    if (
      validCityNameRegex.test(inputValue) ||
      validPostalCodeRegex.test(inputValue) ||
      !inputValue
    ) {
      setLocation(inputValue);
    } else {
      console.error('Invalid input for city name or postal code');
    }
  };

  const handleTemperatureUnitChange = (event) => {
    setUnits(weatherUnits[event.target.value]);
  };

  const showSkeletons = forecastLoading || weatherDataLoading;
  const disabledStateOfRadio = !!error || showSkeletons; 

  return (
    <div className='App h-screen p-8 max-w-4xl m-auto'>
      <h1 className='text-4xl'>Weather App</h1>
      <div className='mt-6 flex justify-between'>
        <div>
          <label className='mr-4' htmlFor='city'>
            Enter City:
          </label>
          <input
            className={inputStyle}
            id='city'
            type='text'
            value={location}
            onChange={handleCityChange}
            placeholder='ex. London / W1H, GB'
          />
        </div>
        <WeatherUnitsRadio
          handleTemperatureUnitChange={handleTemperatureUnitChange}
          selected={units.name}
          error={disabledStateOfRadio}
        />
      </div>
      <div className='flex flex-col justify-between'>
        {error && (
          <p className='font-bold'>
            {error}.<br /> Please enter a valid city name or zip / postal code
            in the following format (postal-code, country-code)
            <br /> Eg. Sofia or 1000, BG / Silistra or 7500, BG / London or W1G,
            GE{' '}
          </p>
        )}
        {showSkeletons && !error && <SkeletonComponent />}
        {!showSkeletons && !error && (
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
