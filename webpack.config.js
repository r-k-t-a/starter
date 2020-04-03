/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
require('dotenv').config();

function pick(acc, [key, value]) {
  if (key.startsWith('CLIENT__')) return { ...acc, [key]: value };
  return acc;
}
const publicSettings = Object.entries(process.env).reduce(pick, {});

module.exports = {
  entry: {
    main: ['./src/react/app.tsx'],
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'b-[hash].js',
    hashDigestLength: 4,
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  plugins: [
    new EnvironmentPlugin(publicSettings),
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['b-*.js'] }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
