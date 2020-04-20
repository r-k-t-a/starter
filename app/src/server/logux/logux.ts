import { Server } from '@logux/server';

import { allow } from '../../acess';
import { PageSubscribeAction } from '../../hook';
import { resolvePage } from '../../resolve';

const defaultOptions = {
  port: parseInt(process.env.LOGUX_PORT!, 10),
  subprotocol: '1.0.0',
  supports: '1.x',
  root: __dirname,
};
const options = Server.loadOptions(process, defaultOptions);
const server = new Server(options);

server.log.on('clean', (action, meta) => console.log('log clean', action, meta));

server.auth(allow);
// server.auth((...args) => console.log(args));

server.channel('page', {
  access: allow,
  async load(ctx, { url }: PageSubscribeAction) {
    const action = await resolvePage(url);
    ctx.sendBack(action);
  },
});

server.type('click', {
  access: allow,
  async process(ctx, action, meta) {
    // console.log('ctx', ctx);
    // console.log('click', action);
  },
  resend(ctx, action, meta) {
    return { channel: 'page' };
  },
});

server.on('disconnected', () => {
  console.log('disconnect');
});

export const logux = (): Promise<void> => server.listen();
