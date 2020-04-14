/* eslint-disable import/no-extraneous-dependencies */
import { Context, Middleware, Next } from 'koa';
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

const wdmKoa = e2k(wdm(compiler, { publicPath: '/', serverSideRender: true }));

const extendedWdmKoa = async (ctx: Context, next: Next): Promise<void> => {
  (ctx.res as any).send = (content: any): void => {
    ctx.res.write(content);
    ctx.res.end();
  };
  (ctx.res as any).get = (): string | undefined => undefined;
  (ctx.res as any).set = (name: string, value: string | string[] | number): void => {
    ctx.res.setHeader(name, value);
  };
  await wdmKoa(ctx, next);
};

async function development(): Promise<Middleware[]> {
  if (!isDevelopment) return [] as Middleware[];
  // eslint-disable-next-line global-require
  require('./watcher');
  return [logger(), extendedWdmKoa];
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
