import Koa from 'koa';
import Router from 'koa-router';
import dotenv from 'dotenv';
import { Server } from '@logux/server';

import { allow } from './access';
import * as channels from './channels';
import { resolvePage } from './resolve';
import * as types from './types';

dotenv.config();

const httpPort = parseInt(process.env.HTTP_PORT!, 10);
const wsPort = parseInt(process.env.WS_PORT!, 10);

const app = new Koa();
const router = new Router();
router.get('page', async (ctx) => {
  const data = await resolvePage(ctx.url);
  ctx.body = data;
});

const server = app.listen(httpPort, console.log);

const defaultOptions = {
  port: wsPort,
  server,
  subprotocol: '1.0.0',
  supports: '1.x',
  root: __dirname,
};
const options = Server.loadOptions(process, defaultOptions);

const logux = new Server(options);
logux.auth(allow);

Object.values(channels).forEach((addChannel) => addChannel(logux));
Object.values(types).forEach((addType) => addType(logux));

logux.on('disconnected', () => {
  console.log('disconnect');
});

logux.listen();
