import React from 'react';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';

const capitalizeEveryWord = (sentence) => {
  return sentence.replace(/\b\w/g, (match) => match.toUpperCase());
};

export const CurrentWeather = ({ weatherData, units }) => {
  return (
    <div className='flex justify-center flex-col p-8 min-w-72'>
      {weatherData ? (
        <>
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>
            <strong>Temperature:</strong> {weatherData.main.temp}°{units.symbol}
          </p>
          <div className='flex gap-0.5 justify-center'>
            <p className='self-center'>
              {capitalizeEveryWord(weatherData.weather[0].description)}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
            />
          </div>
        </>
      ) : (
        <>
          <Skeleton containerClassName='flex-1 w-full' />
          <Skeleton containerClassName='flex-1 w-full' />
          <div className='flex gap-1 justify-center'>
            <Skeleton containerClassName='flex-1 w-full self-center' />
            <Skeleton circle width={40} height={40} />
          </div>
        </>
      )}
    </div>
  );
};

CurrentWeather.propTypes = {
  weatherData: PropTypes.object,
  units: PropTypes.object,
};
