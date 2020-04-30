/* eslint-disable import/first, import/no-extraneous-dependencies */
import moduleAlias from 'module-alias';

moduleAlias.addPath(__dirname);

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import dotenv from 'dotenv';
import { Server, ServerOptions } from '@logux/server';

import { allow } from 'access';
import * as channels from 'channels';
import { resolvePage } from 'resolvers';
import * as types from 'types';

import { version } from '../package.json';

dotenv.config();

const httpPort = parseInt(process.env.HTTP_PORT!, 10);
const wsPort = parseInt(process.env.WS_PORT!, 10);

const app = new Koa();
const router = new Router();
router.post('/page', async (ctx) => {
  const { url } = ctx.request.body;
  const json = await resolvePage(url);
  ctx.status = 200;
  ctx.body = { json };
});

app.use(bodyParser()).use(router.allowedMethods()).use(router.routes());
app.listen(httpPort, () => console.log(`Koa is listening http://localhost:${httpPort}`));

const defaultOptions: ServerOptions = {
  controlMask: '/0',
  port: wsPort,
  subprotocol: version,
  supports: version,
  root: __dirname,
  env: process.env.LOGUX_MODE as ServerOptions['env'],
};
const options = Server.loadOptions(process, defaultOptions);

const logux = new Server(options);
logux.auth(allow);

Object.values(channels).forEach((addChannel) => addChannel(logux));
Object.values(types).forEach((addType) => addType(logux));

logux.listen();
