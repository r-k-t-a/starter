import { NotFoundPagePayload } from 'src/react/reducers';

export const resolveNotFoundPage = (): NotFoundPagePayload => ({
  heading: 'Page Not Found',
  hero: '404',
  menu: [{ name: 'Go to the Home Page', path: '/' }],
});
