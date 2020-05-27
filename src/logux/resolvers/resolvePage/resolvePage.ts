/* eslint-disable import/no-extraneous-dependencies */
import { PagePayload, PageLoadAction } from 'src/react/reducers';
import createMatcher from 'feather-route-matcher';

import { resolveHomePage } from './resolveHomePage';
import { resolveNotFoundPage } from './resolveNotFoundPage';

const match = createMatcher({
  '/': resolveHomePage,
  '/*': resolveNotFoundPage,
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
