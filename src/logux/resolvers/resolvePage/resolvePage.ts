/* eslint-disable import/no-extraneous-dependencies */
import { PagePayload, PageLoadAction } from 'src/react';
import createMatcher from 'feather-route-matcher';

import { resolveHomePage } from './resolveHomePage';
import { resolveNotFoundPage } from './resolveNotFoundPage';

const match = createMatcher({
  '/': resolveHomePage,
  '/*': resolveNotFoundPage,
});

export const resolvePage = async (url: string): Promise<PageLoadAction> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { value: page } = match(url) as any;
  // const { page, params } = match(url);
  const payload: PagePayload = await page();
  return {
    payload,
    type: 'page/load',
    url,
  };
};
