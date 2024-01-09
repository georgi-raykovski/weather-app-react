import React from 'react';
import PropTypes from 'prop-types';
import { capitalizeEveryWord } from '../constants';

export const FavoriteCard = ({ weatherData, unitsSymbol }) => {
  return (
    <div className='w-full bg-blue-400 rounded p-2 my-2 grid grid-rows-2 justify-between items-center'>
      <h3 className='font-bold text-base'>
        {weatherData.name}, {weatherData.sys.country}
      </h3>
      <div className='flex items-center justify-between'>
        <p className='text-sm'>
          {capitalizeEveryWord(weatherData.weather[0].description)}{' '}
          {weatherData.main.temp}°{unitsSymbol}
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt={weatherData.weather[0].description}
          width={30}
          height={'auto'}
        />
      </div>
    </div>
  );
};

FavoriteCard.propTypes = {
  weatherData: PropTypes.object,
  unitsSymbol: PropTypes.string,
};
