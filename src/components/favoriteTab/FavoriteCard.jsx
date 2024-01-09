import React from 'react';
import PropTypes from 'prop-types';
import { capitalizeEveryWord } from '../../constants';
import { getOpenWeatherImageLink } from '../../constants/helperMethods';

const styles = {
  cardContainer:
    'w-full bg-blue-400 rounded p-2 my-2 grid grid-rows-2 grid-cols-1 justify-between items-center',
  closeButton: 'bg-blue-500 hover:bg-blue-600 p-1 min-w-8 min-h-8 rounded-full',
};

export const FavoriteCard = ({
  weatherData,
  unitsSymbol,
  handleRemoveFavorite,
}) => {
  const weatherDescription = capitalizeEveryWord(
    weatherData.weather[0].description
  );

  const weatherIconLink = getOpenWeatherImageLink(weatherData.weather[0].icon);

  return (
    <div className={styles.cardContainer}>
      <div className='flex gap-4 justify-between items-center'>
        <h3 className='font-bold text-base'>
          {weatherData.name}, {weatherData.sys.country}
        </h3>
        <button
          type='button'
          className={styles.closeButton}
          onClick={() => handleRemoveFavorite(weatherData.id)}>
          ✕
        </button>
      </div>
      <div className='flex items-center gap-2'>
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
  handleRemoveFavorite: PropTypes.func,
};
