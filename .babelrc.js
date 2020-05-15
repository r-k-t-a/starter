const { staticAlias, srcDirList } = require('./aliases');

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
          ...staticAlias,
          [`^(${srcDirList.join('|')})(.*)`]: "./src/\\1\\2"
        }
      }
    ]
  ]
}
