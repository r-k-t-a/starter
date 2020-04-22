import { allow } from '../access';
import { PageSubscribeAction } from '../../hook';

export const route = 'page';
export const access = allow;
export async function load(ctx, { url }: PageSubscribeAction) {
  const action = await resolvePage(url);
  ctx.sendBack(action);
}
