export interface Config {
  paths: {
    clientDistPath: string;
    clientSrcServerPath: string;
  };

  server: {
    port: number;
  };

  clientDistServerModule: string;

  database: {
    host: string;
    port: number;
    user: string;
    database: string;
    password: string;
  };
}
