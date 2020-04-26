import { NotFoundPagePayload } from '@rkta-starter/client/src/reducers';

export const resolveNotFoundPage = (): NotFoundPagePayload => ({
  heading: 'Page Not Found',
  hero: '404',
  menu: [{ name: 'Go to the Home Page', path: '/' }],
});
