/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const moduleAlias = require('module-alias');

const srcDir = path.join(__dirname, 'src');
const srcDirList = fs.readdirSync(srcDir);

const staticAliases = {
  react: 'preact/compat',
  'react-dom/test-utils': 'preact/test-utils',
  'react-dom': 'preact/compat',
};

moduleAlias.addAliases(staticAliases);

module.exports = {
  addAliases: moduleAlias.addAliases,
  srcDirList,
  staticAliases,
};
