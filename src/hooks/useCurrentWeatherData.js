import { useState, useEffect, useCallback } from 'react';
import {
  API_KEY,
  debounceDelay,
  API_WEATHER_URL as weatherUrl,
} from '../constants';

export const useCurrentWeatherData = (location, units, setError) => {
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const isZipCode = /^\d+$/.test(location);
      const apiUrl = `${weatherUrl}?${
        isZipCode ? `zip=${location}` : `q=${location}`
      }&appid=${API_KEY}&units=${units.apiUnitValue}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!response.ok) {
        console.error('HTTP error:', response.status, response.statusText);
        setError('Error fetching weather data');
        return;
      }

      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data');
    }
  }, [location, setError, units.apiUnitValue]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, debounceDelay);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [fetchData]);

  return { weatherData, loading, setLoading };
};
