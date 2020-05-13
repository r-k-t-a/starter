/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const fs = require('fs');
const dotenv = require('dotenv');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

dotenv.config();

const { NODE_ENV = null } = process.env;
const isProduction = NODE_ENV === 'production';

const publicEnvKeys = Object.keys(process.env).filter((key) => key.startsWith('CLIENT__'));

const srcDir = path.join(__dirname, process.env.BUNDLE ? '../src' : './src');
const alias = fs
  .readdirSync(srcDir)
  .reduce((acc, key) => ({ ...acc, [key]: path.join(srcDir, key) }), {
    react: 'preact/compat',
    'react-dom/test-utils': 'preact/test-utils',
    'react-dom': 'preact/compat',
  });

const client = {
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

const server = {
  entry: {
    server: './src/server/index.ts',
    app: './src/App',
  },
  // experiments: {
  //   outputModule: true,
  // },
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        exclude: /node_modules\/(?!@rkta)/,
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              inlineSourceMap: true,
              target: 'es2017',
            },
            transpileOnly: true,
          },
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  output: {
    // ecmaVersion: 2017,
    filename: '[name].js',
    // module: true,
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, isProduction ? 'build' : '.dev'),
  },
  plugins: [
    new webpack.EnvironmentPlugin(publicEnvKeys),
    new webpack.DefinePlugin({
      'process.env.BUNDLE': true,
    }),
  ],
  resolve: {
    alias,
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [
    nodeExternals({
      whitelist: [/^@rkta(-starter)?\/.*/i],
    }),
    nodeExternals({
      modulesDir: '../node_modules',
      whitelist: [/^@rkta(-starter)?\/.*/i],
    }),
  ],
};

module.exports = [client, server];
