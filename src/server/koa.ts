/* eslint-disable no-console */
import Koa from 'koa';
import Router from 'koa-router';

import { middleware } from './middleware';
import { defaultRoute } from './routes/defaultRoute';

const { PORT } = process.env;
const onConnect = (): void => console.log(`Koa is at http://localhost:${PORT}`);

const app = new Koa();
const router = new Router();

router.get('*', defaultRoute);
middleware(router).forEach(app.use.bind(app));

app.listen(PORT, onConnect);
