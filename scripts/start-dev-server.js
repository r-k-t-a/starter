/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const chokidar = require('chokidar');
const debounce = require('lodash/debounce');
require('../module-alias')(path.join(__dirname, '../src'));

require('../src/koa');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const clearCacheRaw = () => {
  const keys = Object.keys(require.cache).filter(
    (key) => !/node_modules/gi.test(key) && /\/src\//gi.test(key),
  );

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    delete require.cache[key];
  }
};

const clearCache = debounce(clearCacheRaw, 100);

chokidar.watch('./src').on('all', clearCache);
