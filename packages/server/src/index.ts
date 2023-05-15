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

import { config } from './config';
import { dbConnect } from './db';
import { appRouter } from './routes';
import { YandexAPIRepository } from './repository/YandexAPIRepository';

dbConnect();

const isDev = () => process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(cookieParser());

  let vite: ViteDevServer | undefined;

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: path.resolve(config.paths.clientSrcServerPath, '../'),
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  if (!isDev()) {
    app.use(
      '/assets',
      express.static(path.resolve(config.paths.clientDistPath, 'assets'))
    );
    app.use(
      '/images',
      express.static(path.resolve(config.paths.clientDistPath, 'images'))
    );
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

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(appRouter);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(config.paths.clientDistPath, 'index.html'),
          'utf-8'
        );
      } else {
        template = fs.readFileSync(
          path.resolve(
            path.resolve(config.paths.clientSrcServerPath, '../'),
            'index.html'
          ),
          'utf-8'
        );

        template = await vite!.transformIndexHtml(url, template);
      }

      type SSRModule = (
        uri: string,
        repository: any
      ) => Promise<[string, string, Record<string, any>, string?]>;

      let render: SSRModule;

      if (!isDev()) {
        render = (await import(config.clientDistServerModule)).render;
      } else {
        render = (
          await vite!.ssrLoadModule(
            path.resolve(config.paths.clientSrcServerPath, 'server.entry.tsx')
          )
        ).render;
      }

      const [appHtml, styleText, initialState, redirectUrl] = await render(
        url,
        new YandexAPIRepository(req.headers['cookie'])
      );

      const initStateSerialized = `<script>window.initialState = ${JSON.stringify(
        initialState
      ).replace(/</g, '\\u003c')}</script>`;

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--inline-css-outlet-->`, styleText)
        .replace('<!--store-data-->', initStateSerialized);

      if (redirectUrl) {
        res.redirect(redirectUrl);
        next();
      } else {
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      }
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(config.server.port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${config.server.port}`);
  });
}

startServer();
