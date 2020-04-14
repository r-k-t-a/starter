/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'koa';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { FilledContext } from 'react-helmet-async';

import { getBundlePath } from './getBundlePath';
import { serverApp } from './serverApp';
import { template } from './template';

export const defaultRoute = async (ctx: Context, next: () => Promise<any>): Promise<void> => {
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
      .on('data', (chunk) => {
        console.log('chunk', chunk.toString('utf8'));
      })
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
