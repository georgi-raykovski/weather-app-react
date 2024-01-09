import React from 'react';
import PropTypes from 'prop-types';
import {
  capitalizeEveryWord,
  getOpenWeatherImageLink,
} from '../constants/helperMethods';

export const CurrentWeather = ({ weatherData, units }) => {
  if (!weatherData) return;

  const weatherDescription = capitalizeEveryWord(
    weatherData.weather[0].description
  );

  const weatherIconLink = getOpenWeatherImageLink(weatherData.weather[0].icon);

  return (
    <div className='flex flex-col mt-8 lg:min-w-72'>
      <h2 className='text-lg lg:text-xl mb-2'>Current Weather</h2>
      <div className='flex gap-4 md:gap-8'>
        <div>
          <h3 className='text-base md:text-lg'>
            {weatherData.name}, {weatherData.sys.country}
          </h3>
          <div className='flex gap-0.5'>
            <p className='text-sm md:text-base self-center'>
              {weatherDescription}
            </p>
            <img
              src={weatherIconLink}
              alt={weatherData.weather[0].description}
            />
          </div>
        </div>
        <p className='text-4xl md:text-5xl self-center'>
          {weatherData.main.temp}°{units.symbol}
        </p>
      </div>
    </div>
  );
};

CurrentWeather.propTypes = {
  weatherData: PropTypes.object,
  units: PropTypes.object,
};
