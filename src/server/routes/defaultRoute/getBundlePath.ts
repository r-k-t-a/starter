import fs from 'fs';
import path from 'path';
import { Context } from 'koa';
import flow from 'lodash/flow';
import get from 'lodash/get';

import { isDevelopment } from '../../dotenv';

const statsFilePath = path.join(__dirname, '../build/stats.json');

export function getBundleName(ctx: Context): string {
  if (isDevelopment) {
    const stats = get(ctx, 'res.locals.webpack.devMiddleware.stats', {});
    const {
      assetsByChunkName: { main },
    } = stats.toJson();
    return typeof main === 'string' ? main : main[0];
  }
  const statsContent = fs.readFileSync(statsFilePath).toString();
  const fileName = JSON.parse(statsContent).children.shift().assetsByChunkName.main.shift();
  return fileName;
}

const prefix = (bundleName: string): string => `${process.env.HTTP_BASE!}${bundleName}`;

export const getBundlePath = flow(getBundleName, prefix);
