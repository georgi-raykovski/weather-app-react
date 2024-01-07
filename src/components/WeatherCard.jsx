import React from 'react';
import { PropTypes } from 'prop-types';
import { capitalizeEveryWord } from '../constants';

export const WeatherCard = ({ day, units }) => {
  return (
    <div className='flex flex-col items-center text-center forecast-card rounded justify-around p-4 w-1/6'>
      <h3 className='text-lg'>
        {new Date(day.dt_txt).toLocaleDateString('en-US', {
          weekday: 'long',
        })}
      </h3>
      <div className='border-t border-white w-full my-2 opacity-30' />
      <p className='text-sm'>
        High: {day.main.temp_max}°{units.symbol}
      </p>
      <p className='text-sm'>
        Low: {day.main.temp_min}°{units.symbol}
      </p>
      <div className='border-t border-white w-full my-2 opacity-30' />
      <p>{capitalizeEveryWord(day.weather[0].description)}</p>
      <div>
        <img
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
