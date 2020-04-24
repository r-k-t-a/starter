const moduleAlias = require('module-alias');

moduleAlias.addAliases({
  react: 'preact/compat',
  'react-dom/test-utils': 'preact/test-utils',
  'react-dom': 'preact/compat',
});

require('../build/server');
