/* eslint-disable import/no-extraneous-dependencies */
import { Server } from '@logux/server';
import { PageSubscribeAction } from 'src/react/hooks';
import { allow } from 'src/logux/access';
import { resolvePage } from 'src/logux/resolvers';

export const page = (logux: Server): void =>
  logux.channel('page', {
    access: allow,
    async load(ctx, { url }: PageSubscribeAction) {
      const action = await resolvePage(url);
      ctx.sendBack(action);
    },
  });
