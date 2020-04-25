import { HomepagePayload } from '@rkta-starter/client/src/reducers';

export const resolveHomePage = (): HomepagePayload => ({
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
  cta: 'Poyekhali',
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
