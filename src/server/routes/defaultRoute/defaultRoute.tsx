import { Middleware } from 'koa';
import render from 'preact-render-to-string';
import { StaticRouterContext } from 'react-router';
import { FilledContext } from 'react-helmet-async';
import createEmotionServer from 'create-emotion-server';
import createCache from '@emotion/cache';
import prepass from 'preact-ssr-prepass';

import { getBundlePath } from './getBundlePath';
import { template } from './template';
import { serverApp } from './serverApp';

import { createLoguxBridge } from '../../loguxBridge';
import { createLoguxServer } from '../../../logux';

const loguxServer = createLoguxServer();

export const defaultRoute: Middleware = async (ctx, next): Promise<void> => {
  await next();

  const cache = createCache();
  const { extractCritical } = createEmotionServer(cache);

  const bridge = createLoguxBridge();
  const clientID = loguxServer.addClient(bridge.serverConnection);

  const routerContext: StaticRouterContext = {
    statusCode: 200,
  };
  const bundlePath = getBundlePath(ctx);
  const helmetContext = { helmet: {} };
  const [tree, reduxStore] = serverApp({
    bridge,
    emotionCache: cache,
    helmetContext,
    location: ctx.url,
    routerContext,
  });
  reduxStore.client.start();

  await prepass(tree);
  const emotionHtml = render(tree);
  const { html, css, ids } = extractCritical(emotionHtml);

  loguxServer.connected[clientID].destroy();
  delete loguxServer.connected[clientID];

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
