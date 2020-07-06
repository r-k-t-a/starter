import { HomepagePayload } from 'src/react';

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
      name: 'Logux demo',
      path: '/logux-demo',
    },
    {
      name: 'Routing error',
      path: '/404',
    },
  ],
});
