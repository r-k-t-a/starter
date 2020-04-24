/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/no-unresolved, global-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any */
import { Context } from 'koa';
import render from 'preact-render-to-string';
import { StaticRouter } from 'react-router-dom';
import { FilledContext } from 'react-helmet-async';
import { createStore } from 'redux';
import createEmotionServer from 'create-emotion-server';
import createCache from '@emotion/cache';

// import { resolvePage } from 'resolve';
import { rootReducer } from 'reducer';
import { getBundlePath } from './getBundlePath';
import { template } from './template';
import { fetch } from '../../fetch';
import { serverApp } from './serverApp';

export const defaultRoute = async (ctx: Context, next: () => Promise<any>): Promise<void> => {
  const cache = createCache();
  const { extractCritical } = createEmotionServer(cache);

  const reduxStore = createStore(rootReducer);
  const { json } = await fetch('page', { url: ctx.url });
  reduxStore.dispatch(json);

  const routerContext: StaticRouter['context'] = {
    status: 200,
  };
  const bundlePath = getBundlePath(ctx);
  const helmetContext = { helmet: {} };
  const tree = serverApp({
    emotionCache: cache,
    helmetContext,
    location: ctx.url,
    routerContext,
    reduxStore,
  });
  const emotionHtml = render(tree);
  const { html, css, ids } = extractCritical(emotionHtml);

  const templateTree = template({
    bundlePath,
    css,
    helmet: helmetContext.helmet as FilledContext['helmet'],
    html,
    ids,
    reduxState: reduxStore.getState(),
  });

  const output = render(templateTree);

  ctx.status = routerContext.status;
  ctx.res.write(`<!DOCTYPE html>${output}`);

  // await new Promise((resolve, reject) => {
  //   renderToNodeStream(templateTree)
  //     .on('end', () => {
  //       ctx.res.end();
  //       resolve();
  //     })
  //     .on('error', reject)
  //     .pipe(ctx.res);
  // });

  await next();
};
