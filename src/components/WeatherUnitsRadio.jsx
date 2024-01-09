import React from 'react';
import PropTypes from 'prop-types';
import { capitalizeEveryWord } from '../constants';

const labelStyles =
  'text-sm md:text-base block text-black cursor-pointer select-none rounded-xl p-1 md:p-2 text-center peer-disabled:opacity-50 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200';

export const WeatherUnitsRadio = ({
  handleTemperatureUnitChange,
  selected,
  error,
}) => {
  const radioButtons = ['celcius', 'fahrenheit', 'kelvin'];

  return (
    <div className='grid grid-cols-3 w-[18rem] md:w-[20rem] gap-0 md:gap-2 rounded-xl bg-gray-200 p-2'>
      {radioButtons.map((radioButtonName, radioIdx) => (
        <div key={radioIdx}>
          <input
            type='radio'
            value={radioButtonName}
            name='units'
            id={radioButtonName}
            checked={selected === radioButtonName}
            onChange={handleTemperatureUnitChange}
            className='peer sr-only'
            disabled={error}
          />
          <label htmlFor={radioButtonName} className={labelStyles}>
            {capitalizeEveryWord(radioButtonName)}
          </label>
        </div>
      ))}
    </div>
  );
};

WeatherUnitsRadio.propTypes = {
  selected: PropTypes.string.isRequired,
  handleTemperatureUnitChange: PropTypes.func,
  error: PropTypes.string,
};
