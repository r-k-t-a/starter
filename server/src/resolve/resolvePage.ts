import { PageLoadAction, PAGE_LOAD } from '../reducer';

// TODO: router
export const resolvePage = async (url: string): Promise<PageLoadAction> => ({
  payload: {
    h1: 'Hello Logux',
  },
  type: PAGE_LOAD,
  url,
});
