import { Middleware } from 'koa';
import render from 'preact-render-to-string';
import { StaticRouterContext } from 'react-router';
import { FilledContext } from 'react-helmet-async';
import { createStore } from 'redux';
import createEmotionServer from 'create-emotion-server';
import createCache from '@emotion/cache';
import prepass from 'preact-ssr-prepass';

import { rootReducer } from 'reducers';
import { getBundlePath } from './getBundlePath';
import { template } from './template';
import { fetch } from '../../fetch';
import { serverApp } from './serverApp';

export const defaultRoute: Middleware = async (ctx, next): Promise<void> => {
  await next();

  const cache = createCache();
  const { extractCritical } = createEmotionServer(cache);

  const reduxStore = createStore(rootReducer);
  const { json } = await fetch('page', { url: ctx.url });
  reduxStore.dispatch(json);

  const routerContext: StaticRouterContext = {
    statusCode: 200,
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
  await prepass(tree);
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

  ctx.status = routerContext.statusCode!;
  ctx.body = `<!DOCTYPE html>${output}`;
};
