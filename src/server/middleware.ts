/* eslint-disable import/no-extraneous-dependencies */
import { Middleware } from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import staticServer from 'koa-static';
import Router from 'koa-router';
import wdm from 'webpack-dev-middleware';
import webpack from 'webpack';
import e2k from 'express-to-koa';
import { client } from '../../webpack.config';

import { isDevelopment } from './dotenv';

const compiler = webpack(client);

async function development(): Promise<Middleware[]> {
  if (!isDevelopment) return [] as Middleware[];
  return [logger(), e2k(wdm(compiler, { publicPath: '/', serverSideRender: true }))];
}

export async function middleware(router: Router): Promise<Middleware[]> {
  const developmentMiddleware = await development();
  const generalMiddleware = [
    bodyParser(),
    staticServer('public'),
    router.allowedMethods(),
    router.routes(),
  ] as Middleware[];
  return [...developmentMiddleware, ...generalMiddleware];
}
