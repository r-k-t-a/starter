/* eslint-disable
  @typescript-eslint/camelcase, no-underscore-dangle, @typescript-eslint/no-explicit-any,
  global-require, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies,
  import/no-unresolved, import/no-dynamic-require, @typescript-eslint/explicit-function-return-type,
  no-console
*/

const webpack = require('webpack');
const { realpathSync } = require('fs');

const [, server] = require('../webpack.config');

let koaApp = false;

const deleteBundleCache = (...names) =>
  names.forEach((name) => {
    const relativelePath = `.dev/${name}.js`;
    try {
      const realPath = realpathSync(relativelePath);
      delete require.cache[realPath];
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  });

webpack(server).watch({ ignored: /node_modules/ }, (error, stats) => {
  if (error) return console.error(error);
  if (stats.hasErrors()) return console.log(stats.toString());
  if (!koaApp) {
    koaApp = true;
    require('../.dev/server');
  }

  deleteBundleCache('app');
  return undefined;
});
