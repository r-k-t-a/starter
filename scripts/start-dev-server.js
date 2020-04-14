/* eslint-disable global-require, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const webpack = require('webpack');
const [, server] = require('../webpack.config');

let koaApp = null;

function changes(error) {
  console.log('HANDLE CHANGES');
  if (error) {
    console.error(error);
    return;
  }

  if (!koaApp) {
    koaApp = true;
    require('../.dev/server');
  }
}

webpack(server).watch({ ignored: /node_modules/ }, changes);
