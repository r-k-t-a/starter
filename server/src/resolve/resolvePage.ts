/* eslint-disable import/no-extraneous-dependencies */
import { PageLoadAction, PAGE_LOAD } from '@rkta-starter/client/src/reducer/types';

// TODO: router
export const resolvePage = async (url: string): Promise<PageLoadAction> => ({
  payload: {
    h1: 'Hello Logux',
  },
  type: PAGE_LOAD,
  url,
});
