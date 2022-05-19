import React, { useState, useEffect } from 'react';

import CountryCard from './components/CountryCard';
import Pagination from './components/Pagination';
import countryApi from './api/countryApi';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [totalCountries, setTotalCountries] = useState(0);

  useEffect(() => {
    const getCountries = async () => {
      const { data } = await countryApi.get('/capital');

      setCountries(data.data);
      setTotalCountries(data.data.length);
    };

    getCountries();
  }, []);

  const renderedCountries = () => {
    if (countries.length === 0) return null;

    const countriesList = countries.map(({ name, capital, iso2 }) => {
      return (
        <CountryCard key={name} country={name} capital={capital} flag={iso2} />
      );
    });

    return countriesList;
  };

  return (
    <div className='app'>
      <Pagination totalCountries={totalCountries} />
      <div className='countries-list-container'>{renderedCountries()}</div>
    </div>
  );
};

export default App;
