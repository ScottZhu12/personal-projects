import axios from 'axios';

const countryApi = axios.create({
  baseURL: 'https://countriesnow.space/api/v0.1/countries',
  timeout: 3000,
});

export default countryApi;
