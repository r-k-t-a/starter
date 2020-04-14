/* eslint-disable global-require, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const mkdirp = require('mkdirp');
const config = require('../webpack.config');

mkdirp.sync('build-dev');

let koaApp = null;
const compiler = webpack(config);

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

  const stateFile = path.join(__dirname, '../build-dev/stats.json');
  const statsContent = JSON.stringify(stats.toJson());
  fs.writeFileSync(stateFile, statsContent);

  if (!koaApp) {
    koaApp = true;
    require('../build-dev/server');
  }
}

const options = {
  ignored: /node_modules/,
};

compiler.watch(options, changes);
