import fs from 'fs';
import path from 'path';
import flow from 'lodash/flow';

import { isDevelopment } from '../../dotenv';

const buildDir = isDevelopment ? 'build-dev' : 'build';
const statsFilePath = path.join(__dirname, `../${buildDir}/stats.json`);

export function getBundleName(): string {
  if (isDevelopment) {
    const statsContent = fs.readFileSync(statsFilePath).toString();
    const {
      children: [
        {
          assetsByChunkName: { main },
        },
      ],
    } = JSON.parse(statsContent);
    return typeof main === 'string' ? main : main[0];
  }
  const statsContent = fs.readFileSync(statsFilePath).toString();
  const fileName = JSON.parse(statsContent).children.shift().assetsByChunkName.main.shift();
  return fileName;
}

const prefix = (bundleName: string): string => `${process.env.HTTP_BASE!}${bundleName}`;

export const getBundlePath = flow(getBundleName, prefix);
