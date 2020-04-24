import { Server } from '@logux/server';
import { allow } from 'access';

export const click = (logux: Server): void =>
  logux.type('click', {
    access: allow,
    async process() {
      // console.log('ctx', ctx);
      // console.log('click', action);
    },
    resend() {
      return { channel: 'page' };
    },
  });
