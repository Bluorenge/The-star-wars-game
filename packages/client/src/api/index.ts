import axios from 'axios';
import { OUR_API_URL, YNDEX_API_URL } from 'constants/main';

export const yandexApi = axios.create({
  baseURL: YNDEX_API_URL,
  withCredentials: true,
});

export const ourApi = axios.create({
  baseURL: OUR_API_URL,
  withCredentials: true,
});
