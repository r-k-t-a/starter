/* eslint-disable import/no-extraneous-dependencies */
import { Server } from '@logux/server';
import { PageSubscribeAction } from '@rkta-starter/client/src/hook';
import { resolvePage } from '../resolve';
import { allow } from '../access';

export const page = (logux: Server): void =>
  logux.channel('page', {
    access: allow,
    async load(ctx, { url }: PageSubscribeAction) {
      const action = await resolvePage(url);
      ctx.sendBack(action);
    },
  });
