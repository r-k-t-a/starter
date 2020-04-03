/* eslint-disable import/no-extraneous-dependencies */
import { Middleware } from 'koa';
import logger from 'koa-logger';
import koaWebpack from 'koa-webpack';
import bodyParser from 'koa-bodyparser';
import staticServer from 'koa-static';
import Router from 'koa-router';

import { isDevelopment } from './dotenv';

async function development(): Promise<Middleware[]> {
  if (!isDevelopment) return [];
  const devServer = await koaWebpack({
    devMiddleware: {
      publicPath: '/',
      serverSideRender: true,
    },
    hotClient: {
      port: 32768,
    },
  });
  return [logger(), devServer];
}

export async function middleware(router: Router): Promise<Middleware[]> {
  const developmentMiddleware = await development();
  return developmentMiddleware.concat(
    bodyParser(),
    staticServer('public'),
    router.allowedMethods(),
    router.routes(),
  );
}
