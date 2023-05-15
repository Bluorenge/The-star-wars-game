import * as path from 'path';

export const NODE_ENV = process.env.NODE_ENV || '';

export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3001;

export const POSTGRES_DB = process.env.POSTGRES_DB || 'postgres';
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432;
export const POSTGRES_HOST = process.env.POSTGRES_HOST || '';
export const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres';

export const CLIENT_DIST_PATH = path.dirname(
  require.resolve('client/dist/index.html')
);
export const CLIENT_SRC_SERVER_PATH = path.dirname(
  require.resolve('client/src/server.entry.tsx')
);
export const CLIENT_DIST_SERVER_MODULE = require.resolve(
  'client/dist/server/server.entry.cjs'
);
