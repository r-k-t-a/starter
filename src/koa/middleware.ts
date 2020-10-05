/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies, global-require */
import path from 'path';
import { Middleware } from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import logger from 'koa-logger';
import staticServer from 'koa-static';
import webpack from 'webpack';
import koaWebpack from 'koa-webpack';

import { isDevelopment } from './dotenv';
import { defaultRoute } from './routes/defaultRoute';

export const responseTime: Middleware = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
};

async function development(): Promise<Middleware[]> {
  const client = require('../../webpack.config');
  const compiler = webpack(client);
  const mdl = await koaWebpack({
    compiler,
    devMiddleware: { publicPath: '/', serverSideRender: true },
    hotClient: { port: 39172 },
  });
  return [logger(), mdl];
}

export function production(): Middleware[] {
  const router = new Router();
  return [
    bodyParser(),
    staticServer(path.join(__dirname, '../../public')),
    router.allowedMethods(),
    router.routes(),
    defaultRoute,
  ];
}

export async function addMiddleware(): Promise<Middleware[]> {
  const generalMiddleware = production();
  const devMiddleware = isDevelopment ? await development() : [];
  return [responseTime, ...devMiddleware, ...generalMiddleware];
}
