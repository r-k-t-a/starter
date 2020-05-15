/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const moduleAlias = require('module-alias');

const defaultSrcDir = path.join(__dirname, 'src');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (srcDir = defaultSrcDir) => {
  const staticAlias = {
    src: srcDir,
    react: 'preact/compat',
    'react-dom/test-utils': 'preact/test-utils',
    'react-dom': 'preact/compat',
  };

  moduleAlias.addAliases(staticAlias);

  return staticAlias;
};
