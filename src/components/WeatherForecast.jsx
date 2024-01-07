import React, { useState, useEffect } from 'react';
import { API_FORECAST_URL, API_KEY } from '../constants';
import PropTypes from 'prop-types'

export const WeatherForecast = ({ location, units }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const getWeatherForecast = async () => {
      const apiUrl = `${API_FORECAST_URL}?q=${location}&appid=${API_KEY}&units=${units.apiUnitValue}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== '200') return;

        const forecasts = data.list.filter(entry => entry.dt_txt.includes('12:00:00'));
        setForecast(forecasts);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    getWeatherForecast();
  }, [location, units.apiUnitValue]);

  return (
    <div>
      <h2>5-Day Weather Forecast</h2>
      <div id="forecast-container">
        {forecast.map(day => (
          <div key={day.dt} className="day-card">
            <h3>{new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}</h3>
            <p>High: {day.main.temp_max}°{units.symbol}</p>
            <p>Low: {day.main.temp_min}°{units.symbol}</p>
            <p>{day.weather[0].description}</p>
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

WeatherForecast.propTypes = {
  location: PropTypes.string.isRequired,
  units: PropTypes.shape({
    apiUnitValue: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired
  })
}
