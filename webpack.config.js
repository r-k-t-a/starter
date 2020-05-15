/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

const alias = require('./module-alias')();

dotenv.config();

const { NODE_ENV = null } = process.env;
const isProduction = NODE_ENV === 'production';

const publicEnvKeys = Object.keys(process.env).filter((key) => key.startsWith('CLIENT__'));

module.exports = {
  devtool: isProduction ? 'nosources-source-map' : 'eval',
  entry: ['./src'],
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(tsx?)$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    concatenateModules: false,
  },
  output: {
    filename: 'b-[hash].js',
    hashDigestLength: 4,
    // iife: true,
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  plugins: [
    new webpack.EnvironmentPlugin(publicEnvKeys),
    isProduction &&
      new WorkboxPlugin.GenerateSW({
        additionalManifestEntries: [
          {
            revision: Date.now().toString(),
            url: '/app-shell',
          },
        ],
        cacheId: 'rkta-starter',
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        exclude: [/\.map$/, /^manifest.*\.js(?:on)?$/],
        skipWaiting: true,
        swDest: './sw.js',
        navigateFallback: '/app-shell',
        navigateFallbackDenylist: [/^\/(b-.*|favicons|sw.js)/],
      }),
  ].filter(Boolean),
  resolve: {
    alias,
    extensions: ['.tsx', '.ts', '.js'],
  },
};
