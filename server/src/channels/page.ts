import { Server } from '@logux/server';
import { allow } from '../access';
import { PageSubscribeAction } from '../../hook';

export const page = (logux: Server): void =>
  logux.channel('page', {
    access: allow,
    async load(ctx, { url }: PageSubscribeAction) {
      const action = await resolvePage(url);
      ctx.sendBack(action);
    },
  });
