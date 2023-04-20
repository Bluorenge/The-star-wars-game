/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';

dotenv.config();

import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { config } from './config';
import { dbConnect } from './db';
import { appRouter } from './routes';

dbConnect();

const isDev = () => process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  app.use(cors());

  app.use(appRouter);

  let vite: ViteDevServer | undefined;

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: path.resolve(config.paths.clientSrcServerPath, '../'),
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

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

      let render: (url: string) => Promise<string>;

      if (!isDev()) {
        render = (await import(config.clientDistServerModule)).render;
      } else {
        render = (
          await vite!.ssrLoadModule(
            path.resolve(config.paths.clientSrcServerPath, 'server.entry.tsx')
          )
        ).render;
      }

      const [appHtml, styleText] = await render(url);

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--inline-css-outlet-->`, styleText);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
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
