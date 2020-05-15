/* eslint-disable import/order */
/* eslint-disable import/first */
import path from 'path';
import Koa from 'koa';
import 'preact/compat';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { addAliases, srcDirList } = require('../aliases');

addAliases(
  srcDirList.reduce(
    (acc: {}, item: string) => ({ ...acc, [item]: path.join(__dirname, '../src', item) }),
    {},
  ),
);

import { production, responseTime } from '../src/server/middleware';

const app = new Koa();

const applMiddleware = (): void => {
  app.use(responseTime);
  const middleware = production();
  middleware.forEach(app.use.bind(app));
};

applMiddleware();

export default app.callback();
