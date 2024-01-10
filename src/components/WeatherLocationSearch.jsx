import React from 'react';
import PropTypes from 'prop-types';
import { WeatherUnitsRadio } from './WeatherUnitsRadio';

const inputStyle =
  'bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500';

export const WeatherLocationSearch = ({
  setCityInput,
  handleTemperatureUnitChange,
  showSkeletons,
  handleFavoriteSetter,
  disabledStateOfRadio,
  unitsName,
  currentIsFavorite,
  location
}) => {

  const handleCityChange = (event) => {
    const inputValue = event.target.value;

    const validCityNameRegex = /^[a-zA-Z\s-]+$/;
    const validPostalCodeRegex = /^[\dA-Z\s,]+$/i;

    if (
      validCityNameRegex.test(inputValue) ||
      validPostalCodeRegex.test(inputValue) ||
      !inputValue
    ) {
      setCityInput(inputValue);
    } else {
      console.error('Invalid input for city name or postal code');
    }
  };

  return (
    <div className='my-6 flex gap-4 flex-col md:items-center md:flex-row justify-between'>
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
        <button
          disabled={showSkeletons}
          type='button'
          className='ml-2 text-xl cursor-pointer disabled:opacity-30'
          onClick={handleFavoriteSetter}>
          {!currentIsFavorite ? '☆' : '⭐️'}
        </button>
      </div>
      <WeatherUnitsRadio
        handleTemperatureUnitChange={handleTemperatureUnitChange}
        selected={unitsName}
        error={disabledStateOfRadio}
      />
    </div>
  );
};

WeatherLocationSearch.propTypes = {
  setCityInput: PropTypes.func,
  handleTemperatureUnitChange: PropTypes.func,
  handleFavoriteSetter: PropTypes.func,
  showSkeletons: PropTypes.bool,
  disabledStateOfRadio: PropTypes.bool,
  unitsName: PropTypes.string,
  currentIsFavorite: PropTypes.bool,
  location: PropTypes.string
};
