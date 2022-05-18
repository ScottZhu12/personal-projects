import React from 'react';
import ReactCountryFlag from 'react-country-flag';

const CountryCard = ({ country, capital, flag }) => {
  return (
    <div className='country-card'>
      <div className='country-card-container'>
        <div className='country-card__flag'>
          <ReactCountryFlag countryCode={flag} aria-label='United States' svg />
        </div>

        <div className='country-card__text'>
          <h3 className='heading heading--country-name'>{country}</h3>
          <span className='paragraph paragraph--country-capital'>
            {capital}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
