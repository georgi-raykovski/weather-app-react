import React from 'react';
import { PropTypes } from 'prop-types';
import { capitalizeEveryWord } from '../constants';

export const WeatherCard = ({ day, units }) => {
  return (
    <div className='grid custom-grid items-center text-center forecast-card rounded p-2  md:p-4 lg:w-1/6 gap-2 lg:gap-4'>
      <h3 className='text-xs md:text-base lg:text-lg'>
        {new Date(day.dt_txt).toLocaleDateString('en-US', {
          weekday: 'long',
        })}
      </h3>
      <div className='border-r lg:border-t lg:border-r-0 border-white self-stretch lg:h-auto lg:w-full opacity-30' />
      <p className='text-xs md:text-sm'>
        High: {Math.round(day.main.temp_max)}°{units.symbol}
      </p>
      <p className='text-xs md:text-sm'>
        Low: {Math.round(day.main.temp_min)}°{units.symbol}
      </p>
      <div className='border-r lg:border-t lg:border-r-0 border-white self-stretch lg:h-auto lg:w-full opacity-30' />
      <div className='flex items-center justify-center lg:flex-col'>
        <p className='text-xs md:text-sm lg:text-base'>
          {capitalizeEveryWord(day.weather[0].description)}
        </p>
        <img
          className='max-w-[50%] md:max-w-100'
          src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
          alt={day.weather[0].description}
        />
      </div>
    </div>
  );
};

WeatherCard.propTypes = {
  day: PropTypes.object,
  units: PropTypes.object,
};
