import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const usersApi = axios.create({
  baseURL: BASE_URL,
});

export default usersApi;
