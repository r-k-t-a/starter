const fs = require('fs');
const path = require('path');
const aliasesMap = require('./src/server/aliases/map.json');

const srcDir = path.join(__dirname, 'src');
const srcAliases = fs.readdirSync(srcDir).join('|');

module.exports = {
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-env', {
      'targets': {'node': 'current'}
    }],
    ['@emotion/babel-preset-css-prop', { 'inline': true }]
  ],
  plugins: [
    '@babel/proposal-class-properties',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          ...aliasesMap,
          [`^(${srcAliases})(.*)`]: "./src/\\1\\2"
        }
      }
    ]
  ]
}
