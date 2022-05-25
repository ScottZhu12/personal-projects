import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const jsonPlaceholderApi = axios.create({
  baseURL: BASE_URL,
});

export default jsonPlaceholderApi;
