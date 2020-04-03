/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'koa';
import { getBundlePath } from './getBundlePath';

export const renderrer = async (ctx: Context, next: () => Promise<any>): Promise<void> => {
  const bundlePath = getBundlePath(ctx);

  ctx.body = `<!DOCTYPE html>

  <html lang="en">
    <html>
      <head>
        <title>koa ejs</title>
      </head>
      <body>
        <div id="app">App</div>
        <script src="/${bundlePath}"></script>
      </body>
    </html>
  </html>`;

  await next();
};
