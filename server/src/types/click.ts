import { allow } from '../access';

export const route = 'click';
export const access = allow;

export async function process() {
  // console.log('ctx', ctx);
  // console.log('click', action);
}
export function resend() {
  return { channel: 'page' };
}
