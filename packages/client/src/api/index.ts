import axios from 'axios';
import { OUR_API_URL, YANDEX_API_URL } from 'constants/main';

export const yandexApi = axios.create({
  baseURL: YANDEX_API_URL,
  withCredentials: true,
});

export const ourApi = axios.create({
  baseURL: OUR_API_URL,
  withCredentials: true,
});
