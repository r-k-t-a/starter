require('./module-alias')();

module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
      },
    ],
    ['@emotion/babel-preset-css-prop', { inline: true }],
  ],
  plugins: [
    '@babel/proposal-class-properties',
    [
      'module-resolver',
      {
        root: ['./src'],
      },
    ],
  ],
};
