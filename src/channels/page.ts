/* eslint-disable import/no-extraneous-dependencies */
import { Server } from '@logux/server';
import { PageSubscribeAction } from 'src/hooks';
import { allow } from 'src/access';
import { resolvePage } from 'src/resolvers';

export const page = (logux: Server): void =>
  logux.channel('page', {
    access: allow,
    async load(ctx, { url }: PageSubscribeAction) {
      const action = await resolvePage(url);
      ctx.sendBack(action);
    },
  });
