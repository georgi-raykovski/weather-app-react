import React from 'react';
import { PropTypes } from 'prop-types';
import { capitalizeEveryWord } from '../../constants';
import { getOpenWeatherImageLink } from '../../constants';

const styles = {
  weatherCardContainer:
    'grid custom-grid items-center text-center forecast-card rounded p-2  md:p-4 lg:w-1/6 gap-2 lg:gap-4',
  weatherCardHeader: 'text-xs md:text-base lg:text-lg',
  separatorStyle:
    'border-r lg:border-t lg:border-r-0 border-white self-stretch lg:h-auto lg:w-full opacity-30',
  weatherCardFooter: 'flex items-center justify-center lg:flex-col',
};

export const WeatherForecastCard = ({ day, units }) => {
  const dateString = new Date(day.dt_txt).toLocaleDateString('en-US', {
    weekday: 'long',
  });

  const maxTemp = Math.round(day.main.temp_max);
  const minTemp = Math.round(day.main.temp_min);

  const weatherDescription = capitalizeEveryWord(day.weather[0].description);
  const weatherIconLink = getOpenWeatherImageLink(day.weather[0].icon);

  return (
    <div className={styles.weatherCardContainer}>
      <h3 className={styles.weatherCardHeader}>{dateString}</h3>
      <div className={styles.separatorStyle} />
      <p className='text-xs md:text-sm'>
        High: {maxTemp}°{units.symbol}
      </p>
      <p className='text-xs md:text-sm'>
        Low: {minTemp}°{units.symbol}
      </p>
      <div className={styles.separatorStyle} />
      <div className={styles.weatherCardFooter}>
        <p className='text-xs md:text-sm lg:text-base'>{weatherDescription}</p>
        <img
          className='max-w-[50%] md:max-w-100'
          src={weatherIconLink}
          alt={day.weather[0].description}
        />
      </div>
    </div>
  );
};

WeatherForecastCard.propTypes = {
  day: PropTypes.object,
  units: PropTypes.object,
};
