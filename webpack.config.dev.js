/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const [, server] = require('./webpack.config');

const buildDir = path.resolve(__dirname, '.dev');

module.exports = {
  ...server,
  entry: { devServer: './src/server/dev-server.ts' },
  output: { ...server.output, path: buildDir },
};
