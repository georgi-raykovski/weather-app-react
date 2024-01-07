import React from 'react';
import PropTypes from 'prop-types';
import { capitalizeEveryWord } from '../constants/helperMethods';

export const CurrentWeather = ({ weatherData, units }) => {
  return (
    <div className='flex flex-col mt-8 min-w-72'>
      <h2 className='text-xl mb-2'>Current Weather</h2>
      {weatherData && (
        <div className='flex gap-8'>
          <div>
            <h3>
              {weatherData.name}, {weatherData.sys.country}
            </h3>
            <div className='flex gap-0.5'>
              <p className='self-center'>
                {capitalizeEveryWord(weatherData.weather[0].description)}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
            </div>
          </div>
          <p className='text-5xl self-center'>
            {weatherData.main.temp}°{units.symbol}
          </p>
        </div>
      )}
    </div>
  );
};

CurrentWeather.propTypes = {
  weatherData: PropTypes.object,
  units: PropTypes.object,
};
