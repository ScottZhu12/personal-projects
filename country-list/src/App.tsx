import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CountriesList from './components/CountriesList';
import Paginate from './components/Paginate';

export type countryDataType = {
  name: { common: string; official: string };
  capital: string[];
  region: string;
  flags: { svg: string; png: string };
};

const App: React.FC = () => {
  const [countries, setCountries] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentCountries, setCurrentCountries] = useState<countryDataType[]>(
    []
  );
  const [countriesOffset, setCountriesOffset] = useState(0);

  const countriesPerPage = 12;

  // get countries data, should run once only
  useEffect(() => {
    const fetchCountries = async () => {
      const { data } = await axios.get('https://restcountries.com/v3.1/all');

      const pageNumbers = Math.ceil(data.length / countriesPerPage);
      // extract only the data this app needs
      const countriesData = data.map((country: countryDataType) => {
        const { name, capital, region, flags } = country;

        return { name, capital, region, flags };
      });
      setCountries(countriesData);
      setTotalPages(pageNumbers);
    };

    fetchCountries();
  }, []);

  // get the data to render on the selected page
  useEffect(() => {
    const endOffset = countriesOffset + countriesPerPage;
    setCurrentCountries(countries.slice(countriesOffset, endOffset));
  }, [countriesOffset, countries]);

  return (
    <div className='app'>
      <CountriesList data={currentCountries} />
      <Paginate
        itemsPerPage={countriesPerPage}
        pageCount={totalPages}
        data={countries}
        setCountriesOffset={setCountriesOffset}
      />
    </div>
  );
};

export default App;
