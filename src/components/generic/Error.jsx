import React from 'react';
import PropTypes from 'prop-types';

export const Error = ({ errorMessage }) => {
  return (
    <p className='font-bold'>
      {errorMessage}.<br /> Please enter a valid city name or zip / postal code
      in the following format (postal-code, country-code)
      <br /> Eg. Sofia or 1000, BG / Silistra or 7500, BG / London or W1G, GB
    </p>
  );
};

Error.propTypes = {
  errorMessage: PropTypes.string,
};
