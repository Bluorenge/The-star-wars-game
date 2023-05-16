const isDev = process.env.NODE_ENV === 'development';

const OUR_SERVER = isDev
  ? 'http://localhost:3001'
  : 'https://game-4nly.onrender.com';

export const YANDEX_API_URL = `${OUR_SERVER}/api/v2`; // чтобы запросы шли через мидлвару на нашем сервере

export const OUR_API_URL = `${OUR_SERVER}/api/v1`;

export const LEADERBOARD_NAME = 'the-star-wars-kitten';
