import Koa from 'koa';
import dotenv from 'dotenv';
import { Server } from '@logux/server';

import { allow } from './access';
import * as channels from './channels';
import * as types from './types';

dotenv.config();

const app = new Koa();
const port = parseInt(process.env.LOGUX_PORT!, 10) || 3000;
const server = app.listen(port, console.log);

const defaultOptions = {
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
