import React from 'react';
import PropTypes from 'prop-types';
import { WeatherForecastCard } from './WeatherForecastCard';

const weatherCardContainerStyles = 'flex flex-col lg:flex-row justify-between gap-4 lg:gap-0 mt-2';

export const WeatherForecast = ({ units, forecast }) => {
  return (
    <div className='mt-8 flex flex-col gap-2'>
      <h2 className='text-xl'>5-Day Weather Forecast</h2>
      <div className={weatherCardContainerStyles}>
        {forecast.map((day) => (
          <WeatherForecastCard key={day.dt} day={day} units={units} />
        ))}
      </div>
    </div>
  );
};

WeatherForecast.propTypes = {
  forecast: PropTypes.array.isRequired,
  units: PropTypes.object,
};
