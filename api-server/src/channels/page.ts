/* eslint-disable import/no-extraneous-dependencies */
import { Server } from '@logux/server';
import { PageSubscribeAction } from '@rkta-starter/client/src/hooks';
import { allow } from 'access';
import { resolvePage } from 'resolvers';

export const page = (logux: Server): void =>
  logux.channel('page', {
    access: allow,
    async load(ctx, { url }: PageSubscribeAction) {
      const action = await resolvePage(url);
      ctx.sendBack(action);
    },
  });
