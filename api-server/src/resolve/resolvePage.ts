/* eslint-disable import/no-extraneous-dependencies */
import { HomePage, PageLoadAction } from '@rkta-starter/client/src/reducer';
import createMatcher from 'feather-route-matcher';

const homePage = (): HomePage => ({
  availableLanguages: [
    {
      name: 'English',
      token: 'en',
    },
    {
      name: 'French',
      token: 'fr',
    },
    {
      name: 'Russian',
      token: 'ru',
    },
  ],
  heading: 'R-K-T-A',
  menu: [
    {
      name: 'Handle run-time errors',
      path: '/errors',
    },
    {
      name: 'Handle routing errors',
      path: '/404',
    },
  ],
});

const match = createMatcher({
  '/': homePage,
  // '/*': notFoundPage,
});

export const resolvePage = async (url: string): Promise<PageLoadAction> => {
  const { page, params } = match(url);
  const payload: HomePage = await page(params);
  return {
    payload,
    type: 'page/load',
    url,
  };
};
