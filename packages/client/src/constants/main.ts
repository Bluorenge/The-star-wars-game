import { isServer } from 'helpers/window';

const isDev = process.env.NODE_ENV === 'development';
const ourServer = isDev
  ? 'http://localhost:3001'
  : 'https://game-4nly.onrender.com';

export const YANDEX_API_URL = isServer
  ? `${ourServer}/api/v2` // чтобы запросы шли через мидлвару на нашем сервере
  : 'https://ya-praktikum.tech/api/v2';

export const OUR_API_URL = `${ourServer}/api/v1`;

export const LEADERBOARD_NAME = 'the-star-wars-kitten';
