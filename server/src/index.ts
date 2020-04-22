import Koa from 'koa';
import dotenv from 'dotenv';
import { Server } from '@logux/server';
import { allow } from './access';

dotenv.config();

const app = new Koa();
const httpServer = app.listen(3030, console.log);

// import { resolvePage } from './resolve';
// import { PageSubscribeAction } from '../../hook';

const defaultOptions = {
  port: parseInt(process.env.LOGUX_PORT!, 10),
  server: httpServer,
  subprotocol: '1.0.0',
  supports: '1.x',
  root: __dirname,
};
const options = Server.loadOptions(process, defaultOptions);
const server = new Server(options);

server.log.on('clean', (action, meta) => console.log('log clean', action, meta));

server.auth(allow);
// server.auth((...args) => console.log(args));

// server.channel('page', {
//   access: allow,
//   async load(ctx, { url }: PageSubscribeAction) {
//     const action = await resolvePage(url);
//     ctx.sendBack(action);
//   },
// });

server.type('click', {
  access: allow,
  async process() {
    // console.log('ctx', ctx);
    // console.log('click', action);
  },
  resend() {
    return { channel: 'page' };
  },
});

server.on('disconnected', () => {
  console.log('disconnect');
});
