/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'koa';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { FilledContext } from 'react-helmet-async';

import { getBundlePath } from './getBundlePath';

export const defaultRoute = async (ctx: Context, next: () => Promise<any>): Promise<void> => {
  const { serverApp } = require('./serverApp');
  const { template } = require('./template');

  const routerContext: StaticRouter['context'] = {
    status: 200,
  };
  const bundlePath = getBundlePath();
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
