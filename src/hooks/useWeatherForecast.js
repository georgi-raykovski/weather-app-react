import { useCallback, useEffect, useState } from 'react';
import { API_KEY, debounceDelay, API_FORECAST_URL as forecastUrl } from '../constants';

export const useWeatherForecast = (location, units, setError) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchForecast = useCallback(async () => {
    const apiUrl = `${forecastUrl}?q=${location}&appid=${API_KEY}&units=${units.apiUnitValue}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod !== '200') {
        console.error('HTTP error:', response.status, response.statusText);
        setError('Error fetching weather forecast data');
        return;
      }

      const forecasts = data.list.filter((entry) =>
        entry.dt_txt.includes('12:00:00')
      );
      setForecast(forecasts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather forecast data');
    }
  }, [location, setError, units.apiUnitValue]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchForecast();
    }, debounceDelay);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [fetchForecast]);

  return { forecast, loading, setLoading };
};
