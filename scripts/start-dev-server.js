const chokidar = require('chokidar');
const debounce = require('lodash/debounce');

require('../src/server');

const clearCacheRaw = (event, path) => {
  const keys = Object.keys(require.cache).filter((key) => !/node_modules/gi.test(key) && /\/src\//gi.test(key));
  
  for(const key of keys) {
    delete require.cache[key];
  }
}

const clearCache = debounce(clearCacheRaw, 100);

chokidar.watch('./src').on('all', clearCache);
