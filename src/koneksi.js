// api.js
import axios from 'axios';
const baseURL = 'http://127.0.0.1:5000/api';

const api = axios.create({
  baseURL,
});

export const buildURL = (subpath) => `${baseURL}${subpath}`;

export default api;