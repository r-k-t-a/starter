import fs from 'fs';
import path from 'path';
import { Context } from 'koa';
import flow from 'lodash/flow';

import { isDevelopment } from '../../dotenv';

const statsFilePath = path.join(__dirname, '../../build/stats.json');

export function getBundleName(ctx: Context): string {
  if (isDevelopment) {
    const { main } = ctx.state.webpackStats.toJson().assetsByChunkName;
    return typeof main === 'string' ? main : main[0];
  }
  const statsContent = fs.readFileSync(statsFilePath).toString();
  const bundleName = JSON.parse(statsContent).assetsByChunkName.main;
  return `/${bundleName}`;
}

const prefix = (bundleName: string): string => `${process.env.HTTP_BASE!}${bundleName}`;

export const getBundlePath = flow(getBundleName, prefix);
