/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'koa';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { getDataFromTree } from '@apollo/react-ssr';
import { FilledContext } from 'react-helmet-async';

import { getBundlePath } from './getBundlePath';
import { serverApp } from './serverApp';
import { template } from './template';
import { init } from '../../../apollo';

export const defaultRoute = async (ctx: Context, next: () => Promise<any>): Promise<void> => {
  const routerContext: StaticRouter['context'] = {
    status: 200,
  };
  const bundlePath = getBundlePath(ctx);
  const apolloClient = init({});
  const helmetContext = { helmet: {} };
  const tree = serverApp({ apolloClient, helmetContext, location: ctx.url, routerContext });
  await getDataFromTree(tree);
  const apolloCache = apolloClient.cache.extract();

  const [head, tail] = template({
    helmet: helmetContext.helmet as FilledContext['helmet'],
    apolloCache,
    bundlePath,
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
