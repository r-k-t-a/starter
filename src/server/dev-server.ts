/* eslint-disable
  @typescript-eslint/camelcase, no-underscore-dangle, @typescript-eslint/no-explicit-any,
  global-require, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies,
  import/no-unresolved, import/no-dynamic-require, @typescript-eslint/explicit-function-return-type,
  no-console
*/
import webpack, { Configuration } from 'webpack';
import { realpathSync } from 'fs';

const [, server] = require('../../webpack.config');

let koaApp = false;

declare const __non_webpack_require__: any;
const directRequire = __non_webpack_require__;

const deleteBundleCache = (...names: string[]): void =>
  names.forEach((name) => {
    const relativelePath = `.dev/${name}.js`;
    try {
      const realPath = realpathSync(relativelePath);
      delete directRequire.cache[realPath];
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  });

webpack(server as Configuration).watch({ ignored: /node_modules/ }, (error, stats): void => {
  if (error) return console.error(error);
  if (stats.hasErrors()) return console.log(stats.toString());
  if (!koaApp) {
    koaApp = true;
    directRequire('./server');
  }

  deleteBundleCache('serverApp', 'template');
  return undefined;
});
