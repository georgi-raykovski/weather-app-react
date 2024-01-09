import React from 'react';
import PropTypes from 'prop-types';

export const BurgerMenu = ({ handleOpen }) => {
  return (
    <button
      type='button'
      onClick={handleOpen}
      className='space-y-2 forecast-card rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
      <div className='w-6 h-0.5 bg-white'></div>
      <div className='w-6 h-0.5 bg-white'></div>
      <div className='w-6 h-0.5 bg-white'></div>
    </button>
  );
};

BurgerMenu.propTypes = {
  handleOpen: PropTypes.func,
};
