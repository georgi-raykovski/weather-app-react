import React from 'react';
import PropTypes from 'prop-types';
import { capitalizeEveryWord } from '../../constants';
import { getOpenWeatherImageLink } from '../../constants/helperMethods';

const styles = {
  cardContainer:
    'w-full bg-blue-400 rounded p-2 my-2 grid grid-rows-2 justify-between items-center',
};

export const FavoriteCard = ({ weatherData, unitsSymbol }) => {
  const weatherDescription = capitalizeEveryWord(
    weatherData.weather[0].description
  );

  const weatherIconLink = getOpenWeatherImageLink(weatherData.weather[0].icon);

  return (
    <div className={styles.cardContainer}>
      <h3 className='font-bold text-base'>
        {weatherData.name}, {weatherData.sys.country}
      </h3>
      <div className='flex items-center justify-between'>
        <p className='text-sm'>
          {weatherDescription} {weatherData.main.temp}°{unitsSymbol}
        </p>
        <img
          src={weatherIconLink}
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
