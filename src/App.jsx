import React, { useState, useEffect } from 'react';
import {
  CurrentWeather,
  Error,
  Favorites,
  SkeletonComponent,
  WeatherForecast,
  WeatherUnitsRadio,
} from './components';
import { FAVORITES_KEY, weatherUnits } from './constants';
import { useCurrentWeatherData, useWeatherForecast } from './hooks';

const inputStyle =
  'bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500';

const getInitialFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) ?? [];
  return favorites;
};

const App = () => {
  const [location, setLocation] = useState('London');
  const [units, setUnits] = useState(weatherUnits.celcius);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(getInitialFavorites());
  const [currentIsFavorite, setCurrentIsFavorite] = useState(false);

  const {
    weatherData,
    loading: weatherDataLoading,
    setLoading: setWeatherDataLoading,
  } = useCurrentWeatherData(location, units, setError);

  const {
    forecast,
    loading: forecastLoading,
    setLoading: setForecastLoading,
  } = useWeatherForecast(location, units, setError);

  useEffect(() => {
    setForecastLoading(true);
    setWeatherDataLoading(true);
    setError(null);
  }, [location, setForecastLoading, setWeatherDataLoading, units]);

  const handleCityChange = (event) => {
    const inputValue = event.target.value;

    const validCityNameRegex = /^[a-zA-Z\s-]+$/;
    const validPostalCodeRegex = /^[\dA-Z\s,]+$/i;

    if (
      validCityNameRegex.test(inputValue) ||
      validPostalCodeRegex.test(inputValue) ||
      !inputValue
    ) {
      setLocation(inputValue);
    } else {
      console.error('Invalid input for city name or postal code');
    }
  };

  const handleTemperatureUnitChange = (event) => {
    setUnits(weatherUnits[event.target.value]);
  };

  useEffect(() => {
    if (!weatherData) {
      setCurrentIsFavorite(false);
    } else {
      setCurrentIsFavorite(
        () =>
          favorites.filter((favoriteId) => favoriteId === weatherData.id).length
      );
    }
  }, [favorites, weatherData]);

  const showSkeletons = forecastLoading || weatherDataLoading;
  const disabledStateOfRadio = !!error || showSkeletons;

  const handleFavoriteSetter = () => {
    if (!currentIsFavorite) {
      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify([...favorites, weatherData.id])
      );
      setFavorites((prevValue) => [...prevValue, weatherData.id]);
    }

    if (currentIsFavorite) {
      const remainingFavorites = favorites.filter(
        (favoriteId) => favoriteId !== weatherData.id
      );

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(remainingFavorites));
      setFavorites(remainingFavorites);
    }
  };

  const handleRemoveFavorite = (id) => {
    const remainingFavorites = favorites.filter(
      (favoriteId) => favoriteId !== id
    );
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(remainingFavorites));
    setFavorites(remainingFavorites);
  };

  return (
    <div className='App min-h-screen p-2 sm:p-8 mb-4 lg:max-w-4xl m-auto relative'>
      <h1 className='text-4xl'>Weather App</h1>
      <div className='my-6 flex gap-4 flex-col md:items-center md:flex-row justify-between'>
        <div>
          <label className='mr-4' htmlFor='city'>
            Enter City:
          </label>
          <input
            className={inputStyle}
            id='city'
            type='text'
            value={location}
            onChange={handleCityChange}
            placeholder='ex. London / W1H, GB'
          />
          <button
            disabled={showSkeletons}
            type='button'
            className='ml-2 text-xl cursor-pointer disabled:opacity-30'
            onClick={handleFavoriteSetter}>
            {!currentIsFavorite ? '☆' : '⭐️'}
          </button>
        </div>
        <WeatherUnitsRadio
          handleTemperatureUnitChange={handleTemperatureUnitChange}
          selected={units.name}
          error={disabledStateOfRadio}
        />
      </div>
      <div className='flex flex-col justify-between'>
        {error && <Error errorMessage={error} />}
        {showSkeletons && !error && <SkeletonComponent />}
        {!showSkeletons && !error && (
          <>
            <CurrentWeather units={units} weatherData={weatherData} />
            <WeatherForecast units={units} forecast={forecast} />
          </>
        )}
      </div>
      <Favorites
        favoritesArray={favorites}
        units={units}
        handleRemoveFavorite={handleRemoveFavorite}
      />
    </div>
  );
};

export default App;
