/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');

require('dotenv').config();

const publicEnvKeys = Object.keys(process.env).filter((key) => key.startsWith('CLIENT__'));

module.exports = {
  entry: {
    main: ['./src/App'],
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
    new EnvironmentPlugin(publicEnvKeys),
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['b-*.js'] }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
