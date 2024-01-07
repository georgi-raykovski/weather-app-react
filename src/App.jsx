import React, { useState, useEffect } from 'react';
import {
  CurrentWeather,
  SkeletonComponent,
  WeatherForecast,
  WeatherUnitsRadio,
} from './components';
import { weatherUnits } from './constants';
import { useCurrentWeatherData, useWeatherForecast } from './hooks';

const inputStyle =
  'bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500';

const App = () => {
  const [location, setLocation] = useState('London');
  const [units, setUnits] = useState(weatherUnits.celcius);
  const [error, setError] = useState(null);

  const {
    weatherData,
    loading: weatherDataLoading,
    setLoading: setWeatherDataLoading,
  } = useCurrentWeatherData(location, units, setError);

  const {
    forecast,
    loading: forecastLoading,
    setLoading: setForecastLoading,
  } = useWeatherForecast(location, units, setError);

  useEffect(() => {
    setForecastLoading(true);
    setWeatherDataLoading(true);
    setError(null);
  }, [location, setForecastLoading, setWeatherDataLoading, units]);

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
            GB
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
