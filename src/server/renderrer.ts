/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'koa';
import { getBundlePath } from './getBundlePath';

const { CLIENT__APP_CONTAINER } = process.env;

export const renderrer = async (ctx: Context, next: () => Promise<any>): Promise<void> => {
  const bundlePath = getBundlePath(ctx);

  ctx.body = `<!DOCTYPE html>

  <html lang="en">
    <html>
      <head>
        <title>koa ejs</title>
      </head>
      <body>
        <div id="${CLIENT__APP_CONTAINER}">App</div>
        <script src="/${bundlePath}"></script>
      </body>
    </html>
  </html>`;

  await next();
};
