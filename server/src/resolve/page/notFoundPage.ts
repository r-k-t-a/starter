import { NotFoundPage } from '@rkta-starter/client/src/reducer';

export const notFoundPage = (): NotFoundPage => ({
  heading: 'Page Not Found',
  hero: '404',
  menu: [{ name: 'Go to Home Page', path: '/' }],
});
