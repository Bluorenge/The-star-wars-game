import { isServer } from 'helpers/window';

export const API_URL =
  isServer || window.location.port === '3001'
    ? 'http://localhost:3001/api/v2'
    : 'https://ya-praktikum.tech/api/v2';
