/* eslint-disable
  global-require, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies,
  import/no-unresolved, import/no-dynamic-require, @typescript-eslint/explicit-function-return-type,
  no-console
*/
import webpack, { Configuration } from 'webpack';
import { realpathSync } from 'fs';
import config from '../../webpack.config';

let koaApp = false;
const [, server] = config;

const deleteBundleCache = (...names: string[]): void =>
  names.forEach((name) => {
    const relativelePath = `.dev/${name}.js`;
    try {
      const realPath = realpathSync(relativelePath);
      delete require.cache[realPath];
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    } finally {
      delete require.cache[`../../../../.dev/${name}.js`];
    }
  });

webpack(server as Configuration).watch({ ignored: /node_modules/ }, (error, stats): void => {
  if (error) return console.error(error);
  if (stats.hasErrors()) return console.log(stats.toString());
  if (!koaApp) {
    koaApp = true;
    require('../../.dev/server');
  }

  deleteBundleCache('serverApp', 'template');
  return undefined;
});
