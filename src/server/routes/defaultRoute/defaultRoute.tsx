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

import { createLoguxServer, createLoguxBridge } from '../../../logux';

const loguxServer = createLoguxServer();

export const defaultRoute: Middleware = async (ctx): Promise<void> => {
  const cache = createCache();
  const { extractCritical } = createEmotionServer(cache);

  const bridge = createLoguxBridge();
  const clientID = loguxServer.addClient(bridge.serverConnection);

  const routerContext: StaticRouterContext = {
    statusCode: 200,
  };
  const bundlePath = getBundlePath(ctx);
  const helmetContext = { helmet: {} };
  const [tree, loguxReduxStore] = serverApp({
    bridge,
    emotionCache: cache,
    helmetContext,
    location: ctx.url,
    routerContext,
  });
  loguxReduxStore.client.start();
  loguxReduxStore.dispatch.sync({ channel: 'page', url: ctx.url, type: 'logux/subscribe' });
  // TODO: await prerender(tree, loguxReduxStore, render);

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
    reduxState: loguxReduxStore.getState(),
  });

  const output = render(templateTree);

  ctx.status = routerContext.statusCode!;
  ctx.body = `<!DOCTYPE html>${output}`;
};
