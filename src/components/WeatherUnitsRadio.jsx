import React from 'react';
import { weatherUnits } from '../constants';
import PropTypes from 'prop-types';

const labelStyles =
  'text-sm md:text-base block text-black cursor-pointer select-none rounded-xl p-1 md:p-2 text-center peer-disabled:opacity-50 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200';

export const WeatherUnitsRadio = ({
  handleTemperatureUnitChange,
  selected,
  error
}) => {
  return (
    <div className='grid grid-cols-3 w-[18rem] md:w-[20rem] gap-0 md:gap-2 rounded-xl bg-gray-200 p-2'>
      <div>
        <input
          type='radio'
          value='celcius'
          name='units'
          id='celcius'
          checked={selected === weatherUnits.celcius.name}
          onChange={handleTemperatureUnitChange}
          className='peer sr-only'
          disabled={error}
        />
        <label htmlFor='celcius' className={labelStyles}>
          Celsius
        </label>
      </div>
      <div>
        <input
          type='radio'
          value='fahrenheit'
          name='units'
          id='fahrenheit'
          checked={selected === weatherUnits.fahrenheit.name}
          onChange={handleTemperatureUnitChange}
          className='peer sr-only'
          disabled={error}
        />
        <label htmlFor='fahrenheit' className={labelStyles}>
          Fahrenheit
        </label>
      </div>
      <div>
        <input
          type='radio'
          value='kelvin'
          name='units'
          id='kelvin'
          checked={selected === weatherUnits.kelvin.name}
          onChange={handleTemperatureUnitChange}
          className='peer sr-only'
          disabled={error}
        />
        <label htmlFor='kelvin' className={labelStyles}>
          Kelvin
        </label>
      </div>
    </div>
  );
};

WeatherUnitsRadio.propTypes = {
  selected: PropTypes.string.isRequired,
  handleTemperatureUnitChange: PropTypes.func,
  error: PropTypes.string
};
