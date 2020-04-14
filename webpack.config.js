/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

const { NODE_ENV = null } = process.env;
const isDevelopment = NODE_ENV === 'development';

const publicEnvKeys = Object.keys(process.env).filter((key) => key.startsWith('CLIENT__'));

const client = {
  entry: {
    main: './src/App',
  },
  mode: isDevelopment ? 'development' : 'production',
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
    filename: 'b-[contenthash].js',
    hashDigestLength: 4,
    iife: true,
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  plugins: [
    new webpack.EnvironmentPlugin(publicEnvKeys),
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['b-*.js', 'b-*.txt'] }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

const server = {
  entry: './src/server/koa',
  experiments: {
    outputModule: true,
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules\/(?!@rkta)/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  output: {
    ecmaVersion: 2017,
    filename: 'server.js',
    libraryTarget: 'module',
    module: true,
    path: path.resolve(__dirname, isDevelopment ? 'build-dev' : 'build'),
  },
  plugins: [new webpack.EnvironmentPlugin(publicEnvKeys)],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: [/^@rkta\/.*/i],
    }),
  ],
};

module.exports = [client, server];
