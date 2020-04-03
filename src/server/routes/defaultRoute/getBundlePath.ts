import fs from 'fs';
import path from 'path';
import { Context } from 'koa';
import { isDevelopment } from '../../dotenv';

const statsFilePath = path.join(__dirname, '../../build/stats.json');

export function getBundlePath(ctx: Context): string {
  if (isDevelopment) {
    const { main } = ctx.state.webpackStats.toJson().assetsByChunkName;
    return typeof main === 'string' ? main : main[0];
  }
  const statsContent = fs.readFileSync(statsFilePath).toString();
  return JSON.parse(statsContent).assetsByChunkName.main;
}
