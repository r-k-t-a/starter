/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const webpack = require('webpack');
const mkdirp = require('mkdirp');
const config = require('../webpack.config').default;
const { koa } = require('../src/server/koa');

mkdirp.sync('build-dev');

let koaApp = null;

const compiler = webpack(config);

function changes(error, stats) {
  if (error) console.error(error);
  if (!koaApp) koaApp = koa();
}

const options = {
  ignored: /node_modules/,
};

compiler.watch(options, changes);
