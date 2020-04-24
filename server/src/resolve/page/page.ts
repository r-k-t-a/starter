/* eslint-disable import/no-extraneous-dependencies */
import { PagePayload, PageLoadAction } from '@rkta-starter/client/src/reducer';
import createMatcher from 'feather-route-matcher';

import { homePage } from './homePage';
import { notFoundPage } from './notFoundPage';

const match = createMatcher({
  '/': homePage,
  '/*': notFoundPage,
});

export const resolvePage = async (url: string): Promise<PageLoadAction> => {
  const { page } = match(url);
  // const { page, params } = match(url);
  const payload: PagePayload = await page();
  return {
    payload,
    type: 'page/load',
    url,
  };
};
