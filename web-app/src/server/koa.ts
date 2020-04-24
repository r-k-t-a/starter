/* eslint-disable no-console */
import { Server } from 'http';
import Koa from 'koa';

import { addMiddleware } from './middleware';

const { KOA_PORT } = process.env;
const onConnect = (): void => console.log(`Koa is at http://localhost:${KOA_PORT}`);

export const koa = async (): Promise<Server> => {
  const app = new Koa();
  const middleware = await addMiddleware();
  middleware.forEach(app.use.bind(app));
  return app.listen(KOA_PORT, onConnect);
};
