/* eslint-disable
  global-require, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies,
  import/no-unresolved, import/no-dynamic-require, @typescript-eslint/explicit-function-return-type
*/
const webpack = require('webpack');
const { realpathSync } = require('fs');

const [, server] = require('../webpack.config');

let koaApp = null;

function deleteBundleCache(bundleName) {
  const relativelePath = `.dev/${bundleName}.js`;
  try {
    const realPath = realpathSync(relativelePath);
    delete require.cache[realPath];
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  } finally {
    delete require.cache[`../.dev/${bundleName}.js`];
  }
}

function changes(error, stats) {
  console.log('HANDLE CHANGES');

  if (error) {
    console.error(error);
    return;
  }

  if (stats.hasErrors()) {
    console.log(stats.toString());
    return;
  }

  if (!koaApp) {
    koaApp = true;
    require('../.dev/server');
  }

  deleteBundleCache('serverApp');
  deleteBundleCache('template');
}

webpack(server).watch({ ignored: /node_modules/ }, changes);
