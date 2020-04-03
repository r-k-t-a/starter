import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import staticServer from 'koa-static';
import { renderrer } from './renderrer';

// todo: https://github.com/dougmoscrop/serverless-http

dotenv.config();
const { PORT } = process.env;
const app = new Koa();
const router = new Router();

app
  .use(logger())
  .use(bodyParser())
  .use(staticServer('public'))
  .use(router.routes())
  .use(router.allowedMethods());

router.get('*', renderrer);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Koa is at http://localhost:${PORT}`));
