import React, { useState, useEffect } from 'react';
import {
  CurrentWeather,
  Error,
  Favorites,
  SkeletonComponent,
  WeatherForecast,
  WeatherLocationSearch,
} from './components';
import { FAVORITES_KEY, weatherUnits } from './constants';
import { useCurrentWeatherData, useWeatherForecast } from './hooks';

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

  const setCityInput = (inputValue) => {
    setLocation(inputValue);
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
          !!favorites.filter((favoriteId) => favoriteId === weatherData.id).length
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
      handleRemoveFavorite(weatherData.id)
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
      <WeatherLocationSearch
        setCityInput={setCityInput}
        handleTemperatureUnitChange={handleTemperatureUnitChange}
        showSkeletons={showSkeletons}
        disabledStateOfRadio={disabledStateOfRadio}
        handleFavoriteSetter={handleFavoriteSetter}
        unitsName={units.name}
        currentIsFavorite={currentIsFavorite}
        location={location}
      />
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
