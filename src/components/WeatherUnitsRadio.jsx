import React from 'react';
import { weatherUnits } from '../constants';

export const WeatherUnitsRadio = ({ handleTemperatureUnitChange, selected }) => {
  return (
    <div>
      <label htmlFor='celcius'>
        <input
          type="radio"
          value="celcius"
          name='units'
          id='celcius'
          checked={selected === weatherUnits.celcius.name}
          onChange={handleTemperatureUnitChange}
        />
        Celsius
      </label>
      <label htmlFor='fahrenheit'>
        <input
          type="radio"
          value="fahrenheit"
          name='units'
          id='fahrenheit'
          checked={selected === weatherUnits.fahrenheit.name}
          onChange={handleTemperatureUnitChange}
        />
        Fahrenheit
      </label>
      <label htmlFor='kelvin'>
        <input
          type="radio"
          value="kelvin"
          name='units'
          id='kelvin'
          checked={selected === weatherUnits.kelvin.name}
          onChange={handleTemperatureUnitChange}
        />
        Kelvin
      </label>
    </div>
  );
};
