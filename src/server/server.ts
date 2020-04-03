/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import Koa, { Middleware } from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import staticServer from 'koa-static';
import koaWebpack from 'koa-webpack';

import { renderrer, isDevelopment } from './renderrer';

dotenv.config();
const { PORT } = process.env;

const app = new Koa();
const router = new Router();
router.get('*', renderrer);

const middlewares: Middleware[] = [];

async function useDevMiddleware(): Promise<void> {
  if (!isDevelopment) return;
  const devServer = await koaWebpack({
    devMiddleware: {
      publicPath: '/',
      serverSideRender: true,
    },
    hotClient: {
      port: 32768,
    },
  });
  middlewares.push(logger(), devServer);
}

middlewares.push(bodyParser(), staticServer('public'), router.allowedMethods(), router.routes());

const applyMiddleware = (): void => middlewares.forEach((item) => app.use(item));
const startServer = (): void => {
  app.listen(PORT, () => console.log(`Koa is at http://localhost:${PORT}`));
};
useDevMiddleware().then(applyMiddleware).then(startServer);
