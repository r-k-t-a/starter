import fs from 'fs';
import path from 'path';
import flow from 'lodash/flow';
import { Context } from 'koa';

import { isDevelopment } from '../../dotenv';

const buildDir = isDevelopment ? '.dev' : 'build';
const statsFilePath = path.join(__dirname, `../../../../${buildDir}/stats.json`);

let productionMain = 'unknown.js';
if (!isDevelopment) {
  const statsContent = fs.readFileSync(statsFilePath).toString();
  const clientStats = JSON.parse(statsContent);
  const { main } = clientStats.assetsByChunkName;
  productionMain = typeof main === 'string' ? main : main[0];
}

export function getBundleName(ctx: Context): string {
  if (!isDevelopment) return productionMain;
  const { main } = ctx.state.webpackStats.toJson().assetsByChunkName;
  return typeof main === 'string' ? main : main.shift();
}

const prefix = (bundleName: string): string => `${process.env.CLIENT__HTTP_BASE!}${bundleName}`;

export const getBundlePath = flow(getBundleName, prefix);
