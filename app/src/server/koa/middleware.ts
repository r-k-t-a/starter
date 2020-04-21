/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies, global-require */
import path from 'path';
import { Middleware } from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import staticServer from 'koa-static';
import Router from 'koa-router';
import webpack from 'webpack';
import koaWebpack from 'koa-webpack';

import { isDevelopment } from '../dotenv';

async function development(): Promise<Middleware[]> {
  const [client] = require('../../../webpack.config');
  const compiler = webpack(client);
  const mdl = await koaWebpack({
    compiler,
    devMiddleware: { publicPath: '/', serverSideRender: true },
  });
  return [logger(), mdl];
}

export async function addMiddleware(router: Router): Promise<Middleware[]> {
  const generalMiddleware = [
    bodyParser(),
    staticServer(path.join(__dirname, '../../public')),
    router.allowedMethods(),
    router.routes(),
  ] as Middleware[];
  if (!isDevelopment) return generalMiddleware;
  const devMiddleware = await development();
  return [...devMiddleware, ...generalMiddleware];
}
