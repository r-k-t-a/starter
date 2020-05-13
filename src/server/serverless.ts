import moduleAlias from 'module-alias';
import Koa from 'koa';

import { addMiddleware } from './middleware';

moduleAlias.addAliases({
  react: 'preact/compat',
  'react-dom/test-utils': 'preact/test-utils',
  'react-dom': 'preact/compat',
});

const app = new Koa();

const applMiddleware = async (): Promise<void> => {
  const middleware = await addMiddleware();
  middleware.forEach(app.use.bind(app));
};

applMiddleware();

export default app.callback();
