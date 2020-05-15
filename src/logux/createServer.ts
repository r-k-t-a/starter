/* eslint-disable import/first, import/no-extraneous-dependencies */
import moduleAlias from 'module-alias';

moduleAlias.addPath(__dirname);

import dotenv from 'dotenv';
import { Server, ServerOptions } from '@logux/server';

import { allow } from 'src/access';
import * as channels from 'src/channels';
import * as types from 'src/types';

import { version } from '../../package.json';

dotenv.config();

const wsPort = parseInt(process.env.WS_PORT!, 10);
const isDevelopment = process.env.NODE_ENV === 'development';

let loguxServer: Server;

const defaultOptions: ServerOptions = {
  controlMask: '/0',
  port: wsPort,
  subprotocol: version,
  supports: version,
  root: __dirname,
  env: process.env.LOGUX_MODE as ServerOptions['env'],
};
const options = Server.loadOptions(process, defaultOptions);

export const createLoguxServer = (): Server => {
  if (loguxServer) return loguxServer;

  const logux = new Server(options);
  logux.auth(allow);

  Object.values(channels).forEach((addChannel) => {
    if (typeof addChannel !== 'function') return;
    addChannel(logux);
  });
  Object.values(types).forEach((addType) => {
    if (typeof addType !== 'function') return;
    addType(logux);
  });

  loguxServer = logux;

  if (isDevelopment) logux.listen();

  return logux;
};
