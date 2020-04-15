import fs from 'fs';
import path from 'path';
import flow from 'lodash/flow';
import { Context } from 'koa';

import { isDevelopment } from '../../dotenv';

const buildDir = isDevelopment ? '.dev' : 'build';
const statsFilePath = path.join(__dirname, `../${buildDir}/stats.json`);

export function getBundleName(ctx: Context): string {
  if (isDevelopment) {
    const { main } = ctx.state.webpackStats.toJson().assetsByChunkName;
    return typeof main === 'string' ? main : main.shift();
  }
  const statsContent = fs.readFileSync(statsFilePath).toString();
  return JSON.parse(statsContent).assetsByChunkName.main;
}

const prefix = (bundleName: string): string => `${process.env.HTTP_BASE!}${bundleName}`;

export const getBundlePath = flow(getBundleName, prefix);
