import React, { useState, useEffect, useCallback } from 'react';
import { API_FORECAST_URL, API_KEY } from '../constants';
import PropTypes from 'prop-types';
import { WeatherCard } from './WeatherCard';

export const WeatherForecast = ({ location, units }) => {
  const [forecast, setForecast] = useState([]);
  const apiUrl = `${API_FORECAST_URL}?q=${location}&appid=${API_KEY}&units=${units.apiUnitValue}`;

  const getWeatherForecast = useCallback(async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod !== '200') return;

      const forecasts = data.list.filter((entry) =>
        entry.dt_txt.includes('12:00:00')
      );
      setForecast(forecasts);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [apiUrl]);

  useEffect(() => {
    getWeatherForecast();
  }, [getWeatherForecast, location, units.apiUnitValue]);

  return (
    <div className='mt-8 flex flex-col gap-2'>
      <h2 className='text-xl'>5-Day Weather Forecast</h2>
      <div className='flex justify-around'>
        {forecast.map((day) => (
          <WeatherCard key={day.dt} day={day} units={units} />
        ))}
      </div>
    </div>
  );
};

WeatherForecast.propTypes = {
  location: PropTypes.string.isRequired,
  units: PropTypes.shape({
    apiUnitValue: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
  }),
};
