import { Server } from '@logux/server';
import { deny } from 'src/logux/access';

export const click = (logux: Server): void =>
  logux.type('forbiden/action', {
    access: deny,
    async process() {
      // console.log('ctx', ctx);
      // console.log('click', action);
    },
    resend() {
      return { channel: 'page' };
    },
  });
