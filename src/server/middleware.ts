/* eslint-disable import/no-extraneous-dependencies */
import { Middleware } from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import staticServer from 'koa-static';
import Router from 'koa-router';

import config from '../../webpack.config';

import { isDevelopment } from './dotenv';

function development(): Middleware[] {
  if (!isDevelopment) {
    const [compiller] = config;
    // TODO:
    // devMiddleware
    // hotMiddleware
    return [] as Middleware[];
  }

  return [logger()];
}

export function middleware(router: Router): Middleware[] {
  const generalMiddleware = [
    bodyParser(),
    staticServer('public'),
    router.allowedMethods(),
    router.routes(),
  ] as Middleware[];
  return [...development(), ...generalMiddleware];
}
