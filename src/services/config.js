/* eslint-disable prettier/prettier */
import axios from 'axios';
import apiUrls from '../../apiUrls';

const http = axios.create({
  baseURL: apiUrls.apiBase,
  headers: {
    'Content-type': 'application/json',
  },
});

export default http;
