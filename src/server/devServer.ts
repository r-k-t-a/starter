/* eslint-disable import/no-extraneous-dependencies */
import koaWebpack from 'koa-webpack';
import { start } from './server';

start(async (koaApp) => {
  const middleware = await koaWebpack({
    devMiddleware: {
      publicPath: '/',
      serverSideRender: true,
    },
    hotClient: {
      port: 32768,
    },
  });

  koaApp.use(middleware);
});
