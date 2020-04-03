/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'koa';

export const renderrer = async (ctx: Context, next: () => Promise<any>): Promise<any> => {
  ctx.body = `<!DOCTYPE html>

  <html lang="en">
    <html>
      <head>
        <title>koa ejs</title>
      </head>
      <body>
        <div id="app">App</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  </html>`;
  await next();
};
