import Koa from 'koa';
import dotenv from 'dotenv';
import { Server } from '@logux/server';

import { allow } from './access';
import * as channels from './channels';
import * as types from './types';

dotenv.config();

const app = new Koa();
const server = app.listen(3030, console.log);

const defaultOptions = {
  port: parseInt(process.env.LOGUX_PORT!, 10),
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
