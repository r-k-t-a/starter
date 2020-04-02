import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import render from 'koa-ejs';
import { renderrer } from './renderrer';

// todo: https://github.com/dougmoscrop/serverless-http

dotenv.config();
const { PORT } = process.env;
const app = new Koa();
const router = new Router();

render(app, {
  root: __dirname,
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true,
});

app
  .use(logger())
  .use(bodyParser())
  .use(renderrer)
  .use(router.routes())
  .use(router.allowedMethods());

// router.get('*', render);

app.listen(PORT, () => console.log(`Koa is at http://localhost:${PORT}`));
