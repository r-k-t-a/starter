import dotenv from 'dotenv';
import Koa, { Middleware } from 'koa';
import Router from 'koa-router';

import { middleware } from './middleware';
import { renderrer } from './renderrer';

dotenv.config();

const { PORT } = process.env;
const app = new Koa();
const router = new Router();
router.get('*', renderrer);

const apply = (items: Middleware[]): void => items.forEach(app.use.bind(app));

function startServer(): void {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Koa is at http://localhost:${PORT}`));
}

middleware(router).then(apply).then(startServer);
