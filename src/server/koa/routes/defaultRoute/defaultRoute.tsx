/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/no-unresolved, global-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any */
import { Context } from 'koa';
import { renderToNodeStream, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { FilledContext } from 'react-helmet-async';
import { createStore } from 'redux';
import { rootReducer } from '../../../../reducer';
import { resolvePage } from '../../../../resolve';

import { getBundlePath } from './getBundlePath';

declare const __non_webpack_require__: any;
const directRequire = __non_webpack_require__;

export const defaultRoute = async (ctx: Context, next: () => Promise<any>): Promise<void> => {
  const { serverApp } = directRequire('./serverApp');
  const { template } = directRequire('./template');

  const store = createStore(rootReducer);
  const pageAction = await resolvePage(ctx.url);
  store.dispatch(pageAction);

  const routerContext: StaticRouter['context'] = {
    status: 200,
  };
  const bundlePath = getBundlePath(ctx);
  const helmetContext = { helmet: {} };
  const tree = serverApp({ helmetContext, location: ctx.url, routerContext, store });
  const html = renderToString(tree);

  const templateTree = template({
    html,
    bundlePath,
    helmet: helmetContext.helmet as FilledContext['helmet'],
    reduxState: store.getState(),
  });

  ctx.status = routerContext.status;
  ctx.res.write('<!DOCTYPE html>');

  await new Promise((resolve, reject) => {
    renderToNodeStream(templateTree)
      .on('end', () => {
        ctx.res.end();
        resolve();
      })
      .on('error', reject)
      .pipe(ctx.res);
  });

  await next();
};
