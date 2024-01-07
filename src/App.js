import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const API_KEY = 'a08f769b5832a3819c04262b46054e07';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState('London'); // Default city

  const fetchData = useCallback(async () => {
    try {
      setWeatherData(null);

      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== '404') {
        setWeatherData(data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [city]);

  useEffect(() => {
    if (!city) return;

    fetchData();
  }, [city, fetchData]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className='App'>
      <h1>Weather App</h1>
      <div>
        <label htmlFor='city'>Enter City:</label>
        <input type='text' id='city' value={city} onChange={handleCityChange} />
      </div>
      {weatherData && (
        <div className='weather-info'>
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <div>
            <strong>Temperature:</strong> {weatherData.main.temp}°C
          </div>
          <div>
            <strong>Description:</strong> {weatherData.weather[0].description}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
