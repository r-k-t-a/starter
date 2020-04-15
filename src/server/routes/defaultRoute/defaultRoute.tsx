/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/no-unresolved, global-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any */
import { Context } from 'koa';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { FilledContext } from 'react-helmet-async';

import { getBundlePath } from './getBundlePath';

declare const __non_webpack_require__: any;
const directRequire = __non_webpack_require__;

export const defaultRoute = async (ctx: Context, next: () => Promise<any>): Promise<void> => {
  const { serverApp } = directRequire('./serverApp');
  const { template } = directRequire('./template');

  const routerContext: StaticRouter['context'] = {
    status: 200,
  };
  const bundlePath = getBundlePath(ctx);
  const helmetContext = { helmet: {} };
  const tree = serverApp({ helmetContext, location: ctx.url, routerContext });

  const [head, tail] = template({
    bundlePath,
    helmet: helmetContext.helmet as FilledContext['helmet'],
    reduxStore: {},
  });

  ctx.status = routerContext.status;
  ctx.res.write(head);

  await new Promise((resolve, reject) => {
    renderToNodeStream(tree)
      // .on('data', (chunk) => {
      //   console.log('chunk', chunk.toString('utf8'));
      // })
      .on('end', () => {
        ctx.res.write(tail);
        ctx.res.end();
        resolve();
      })
      .on('error', reject)
      .pipe(ctx.res);
  });

  await next();
};
