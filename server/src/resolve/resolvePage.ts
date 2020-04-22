/* eslint-disable import/no-extraneous-dependencies */
import { PageLoadAction } from '@rkta-starter/client/src/reducer/types';

// TODO: router
export const resolvePage = async (url: string): Promise<PageLoadAction> => ({
  payload: {
    h1: 'Hello Logux',
  },
  type: 'page/load',
  url,
});
