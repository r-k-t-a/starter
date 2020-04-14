/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const webpack = require('webpack');
const mkdirp = require('mkdirp');
const config = require('../webpack.config').default;
const { koa } = require('../src/server/koa');

mkdirp.sync('build-dev');

let koaApp = null;

const compiler = webpack(config);

const watching = compiler.watch(
  {
    ignored: /node_modules/,
  },
  (error, stats) => {
    if (error) {
      console.error(error);
    }
    if (!koaApp) koaApp = koa();
  },
);
