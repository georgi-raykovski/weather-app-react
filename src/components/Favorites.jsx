import React, { useEffect, useRef, useState } from 'react';
import { BurgerMenu, CloseButton } from './generic';
import { useOutsideClick } from '../hooks';
import { FavoriteCard } from './FavoriteCard';
import PropTypes from 'prop-types';
import { API_KEY } from '../constants';

export const Favorites = ({ favoritesArray, units }) => {
  const [showFavorites, setShowFavorites] = useState(false);
  const favoritesRef = useRef(null);
  const [favoritesWeatherData, setFavoriteWeatherData] = useState([]);

  const handleToggleFavorites = () => {
    setShowFavorites((prevValue) => !prevValue);
  };

  useOutsideClick(favoritesRef, handleToggleFavorites, !showFavorites);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&units=${units.apiUnitValue}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching weather data for location ${id}:`, error);
        throw error;
      }
    };

    const promises = favoritesArray.map((id) => fetchData(id));

    Promise.all(promises)
      .then((allData) => {
        console.log(allData);
        setFavoriteWeatherData(allData);
      })
      .catch((error) => {
        console.error('Error fetching favorites weather data:', error);
      });
  }, [favoritesArray, units.apiUnitValue]);

  return (
    <div className='absolute top-5 right-5'>
      <div className='flex gap-2 items-center'>
        <h2 className='hidden lg:block'>Favorite Locations</h2>
        <BurgerMenu handleOpen={handleToggleFavorites} />
      </div>
      <div
        ref={favoritesRef}
        className={`${
          showFavorites ? 'opacity-0 invisible' : ' opacity-100 visible'
        } absolute top-[-8px] right-[-8px] transition-all duration-500 bg-blue-500 min-w-72 rounded linear p-2`}>
        <div className='flex justify-between mb-2 items-center'>
          <h1 className='text-lg'>Favorite Locations</h1>
          <CloseButton handleClick={handleToggleFavorites} />
        </div>
        <div className='max-h-[60vh] overflow-scroll'>
          {favoritesWeatherData.map((weatherData, favoriteIdx) => (
            <FavoriteCard
              key={favoriteIdx}
              weatherData={weatherData}
              unitsSymbol={units.symbol}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Favorites.propTypes = {
  favoritesArray: PropTypes.array,
  units: PropTypes.object,
};
