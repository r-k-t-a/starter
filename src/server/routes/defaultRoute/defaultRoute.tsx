/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'koa';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { getBundlePath } from './getBundlePath';
import { serverApp } from './serverApp';

const { CLIENT__APP_CONTAINER } = process.env;

export const defaultRoute = async (ctx: Context, next: () => Promise<any>): Promise<void> => {
  const routerContext: StaticRouter['context'] = {
    status: 200,
  };
  const bundlePath = getBundlePath(ctx);
  const app = serverApp(routerContext, ctx.url);
  const html = renderToStaticMarkup(app);

  ctx.status = routerContext.status;
  ctx.body = `<!DOCTYPE html>

  <html lang="en">
    <html>
      <head>
        <title>koa ejs</title>
        <script src="/${bundlePath}" async></script>
      </head>
      <body>
        <div id="${CLIENT__APP_CONTAINER}">${html}</div>
      </body>
    </html>
  </html>`;

  await next();
};
