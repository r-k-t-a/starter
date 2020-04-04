/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'koa';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { getDataFromTree } from '@apollo/react-ssr';

import { getBundlePath } from './getBundlePath';
import { serverApp } from './serverApp';
import { template, HelmetData } from './template';
import { init } from '../../../apollo';

export const defaultRoute = async (ctx: Context): Promise<void> => {
  const routerContext: StaticRouter['context'] = {
    status: 200,
  };
  const bundlePath = getBundlePath(ctx);
  const apolloClient = init({});
  const helmetContext = { helmet: {} };
  const tree = serverApp({ apolloClient, helmetContext, location: ctx.url, routerContext });
  await getDataFromTree(tree);
  const apolloCache = apolloClient.cache.extract();

  const [header, footer] = template({
    helmet: helmetContext.helmet as HelmetData,
    apolloCache,
    bundlePath,
  });

  ctx.status = routerContext.status;
  ctx.res.write(header);

  return new Promise((resolve) => {
    renderToNodeStream(tree)
      .on('end', () => {
        ctx.res.write(footer);
        ctx.res.end();
        resolve();
      })
      .pipe(ctx.res, { end: false });
  });
};
