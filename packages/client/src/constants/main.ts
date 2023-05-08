import { isServer } from 'helpers/window';

export const YANDEX_API_URL =
  isServer || window.location.port === '3001'
    ? 'http://localhost:3001/api/v2' // чтобы запросы шли через мидлвару на нашем сервере
    : 'https://ya-praktikum.tech/api/v2';

export const OUR_API_URL = 'http://localhost:3001/api/v1';
