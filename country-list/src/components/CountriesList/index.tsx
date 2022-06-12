import React from 'react';

import { countryDataType } from '../../App';
import CountryCard from '../CountryCard';

interface CountryCardProps {
  data: countryDataType[];
}

const CountriesList: React.FC<CountryCardProps> = ({ data }) => {
  if (!data || data.length === 0) return <h1>Loading...</h1>;

  const renderedList = data.map((country) => {
    return <CountryCard key={country.name.common} data={country} />;
  });

  return <div className='countries-list'>{renderedList}</div>;
};

export default CountriesList;
