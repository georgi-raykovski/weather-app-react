import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BurgerMenu, CloseButton } from '../generic';
import { useOutsideClick } from '../../hooks';
import { FavoriteCard } from './FavoriteCard';
import PropTypes from 'prop-types';
import { API_KEY } from '../../constants';
import { API_ID_URL } from '../../constants/apiConstants';

const styles = {
  overallContainer: 'absolute top-5 right-5',
  initialViewContainer: 'flex gap-2 items-center',
  favoritesTabContainer:
    'absolute top-[-8px] right-[-8px] transition-all duration-500 bg-blue-500 min-w-72 rounded linear p-2',
  favoritesTabHeader: 'flex justify-between mb-2 items-center',
  favoriteCardsContainer: 'max-h-[60vh] overflow-scroll',
};

export const Favorites = ({ favoritesArray, units, handleRemoveFavorite }) => {
  const [showFavorites, setShowFavorites] = useState(false);
  const favoritesRef = useRef(null);
  const [favoritesWeatherData, setFavoriteWeatherData] = useState([]);

  const handleToggleFavorites = () => {
    setShowFavorites((prevValue) => !prevValue);
  };

  useOutsideClick(favoritesRef, handleToggleFavorites, showFavorites);

  const fetchData = useCallback(
    async (id) => {
      try {
        const response = await fetch(
          `${API_ID_URL}=${id}&appid=${API_KEY}&units=${units.apiUnitValue}`
        );
        const data = await response.json();

        if (!response.ok) {
          console.error('HTTP error:', response.status, response.statusText);
          return;
        }

        return data;
      } catch (error) {
        console.error(`Error fetching weather data for location ${id}:`, error);
        throw error;
      }
    },
    [units.apiUnitValue]
  );

  const handleRemoval = (id) => {
    handleRemoveFavorite(id);

    setFavoriteWeatherData((prevValue) =>
      prevValue.filter((favorite) => favorite.id !== id)
    );
  };

  useEffect(() => {
    const promises = favoritesArray.map((id) => fetchData(id));

    Promise.all(promises)
      .then((allData) => {
        if (allData[0] === undefined) {
          setFavoriteWeatherData([]);
        } else {
          setFavoriteWeatherData(allData);
        }
      })
      .catch((error) => {
        console.error('Error fetching favorites weather data:', error);
      });
  }, [favoritesArray, fetchData]);

  const favoritesTabVisibilityStyles = showFavorites
    ? 'opacity-100 visible'
    : ' opacity-0 invisible';

  return (
    <div className={styles.overallContainer}>
      <div className={styles.initialViewContainer}>
        <h2 className='hidden lg:block'>Favorite Locations</h2>
        <BurgerMenu handleOpen={handleToggleFavorites} />
      </div>
      <div
        ref={favoritesRef}
        className={`${favoritesTabVisibilityStyles} ${styles.favoritesTabContainer}`}>
        <div className={styles.favoritesTabHeader}>
          <h1 className='text-lg'>Favorite Locations</h1>
          <CloseButton handleClick={handleToggleFavorites} />
        </div>
        <div className={styles.favoriteCardsContainer}>
          {favoritesWeatherData.map((weatherData, favoriteIdx) => (
            <FavoriteCard
              key={favoriteIdx}
              weatherData={weatherData}
              unitsSymbol={units.symbol}
              handleRemoveFavorite={handleRemoval}
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
  handleRemoveFavorite: PropTypes.func,
};
