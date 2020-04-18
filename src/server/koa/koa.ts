/* eslint-disable no-console */
import { Server } from 'http';
import Koa from 'koa';
import Router from 'koa-router';

import { addMiddleware } from './middleware';
import { defaultRoute } from './routes/defaultRoute';

const { KOA_PORT } = process.env;
const onConnect = (): void => console.log(`Koa is at http://localhost:${KOA_PORT}`);

export const koa = async (): Promise<Server> => {
  const app = new Koa();
  const router = new Router();

  router.get('*', defaultRoute);

  const middleware = await addMiddleware(router);
  middleware.forEach(app.use.bind(app));

  return app.listen(KOA_PORT, onConnect);
};
