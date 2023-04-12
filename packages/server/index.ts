import dotenv from 'dotenv';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';

dotenv.config();

import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import jsesc from 'jsesc';
import { YandexAPIRepository } from './repository/YandexAPIRepository';

const isDev = () => process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer | undefined;
  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client/src/server.entry.tsx'));
  const ssrClientPath = require.resolve('client/dist/server/server.entry.cjs');

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: path.resolve(srcPath, '../'),
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  );

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
    app.use('/images', express.static(path.resolve(distPath, 'images')));
  }

  app.use('*', cookieParser(), async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        );
      } else {
        template = fs.readFileSync(
          path.resolve(path.resolve(srcPath, '../'), 'index.html'),
          'utf-8'
        );

        template = await vite!.transformIndexHtml(url, template);
      }

      type SSRModule = (
        uri: string,
        repository: any
      ) => Promise<[string, string, Record<string, any>]>;

      let render: SSRModule;

      if (!isDev()) {
        render = (await import(ssrClientPath)).render;
      } else {
        render = (
          await vite!.ssrLoadModule(path.resolve(srcPath, 'server.entry.tsx'))
        ).render;
      }

      const [appHtml, styleText, initialState] = await render(
        url,
        new YandexAPIRepository(req.headers['cookie'])
      );

      const initStateSerialized = jsesc(JSON.stringify(initialState), {
        json: true,
        isScriptContext: true,
      });

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--inline-css-outlet-->`, styleText)
        .replace('<!--store-data-->', initStateSerialized);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
