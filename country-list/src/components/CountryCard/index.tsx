import React from 'react';

import { countryDataType } from '../../App';

interface CountryCardProps {
  data: countryDataType;
}

const CountryCard: React.FC<CountryCardProps> = ({ data }) => {
  const { name, flags, capital, region } = data;

  return (
    <div className='country-card'>
      <div className='country-card__flag'>
        <img src={flags.svg} alt={name.common} />
      </div>

      <div className='country-card__detail'>
        <h3>{name.common}</h3>
        <h4>{Array.isArray(capital) ? capital[0] : 'N/A'}</h4>
        <p>{region}</p>
      </div>
    </div>
  );
};

export default CountryCard;
