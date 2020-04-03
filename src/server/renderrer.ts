/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import { Context } from 'koa';

const statsFilePath = path.join(__dirname, '../../build/bundle-stats.json');

let stats: any = null;
if (fs.existsSync(statsFilePath)) stats = JSON.parse(fs.readFileSync(statsFilePath).toString());

const isDevelopment = process.env.NODE_ENV === 'development';

export const renderrer = async (ctx: Context, next: () => Promise<any>): Promise<void> => {
  let bundleFilename = stats?.assetsByChunkName?.main;

  if (isDevelopment) {
    const { main } = ctx.state.webpackStats.toJson().assetsByChunkName;
    bundleFilename = typeof main === 'string' ? main : main[0];
  }

  ctx.body = `<!DOCTYPE html>

  <html lang="en">
    <html>
      <head>
        <title>koa ejs</title>
      </head>
      <body>
        <div id="app">App</div>
        <script src="/bundle/${bundleFilename}"></script>
      </body>
    </html>
  </html>`;
  await next();
};
