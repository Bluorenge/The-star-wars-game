import type { Config } from './types';
import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  CLIENT_DIST_PATH,
  CLIENT_DIST_SERVER_MODULE,
  CLIENT_SRC_SERVER_PATH,
  SERVER_PORT,
} from './constants/main';

export const config: Config = {
  paths: {
    clientDistPath: CLIENT_DIST_PATH,
    clientSrcServerPath: CLIENT_SRC_SERVER_PATH,
  },

  clientDistServerModule: CLIENT_DIST_SERVER_MODULE,

  server: {
    port: SERVER_PORT,
  },

  database: {
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    user: POSTGRES_USER,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
  },
};
