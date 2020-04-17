/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

const { NODE_ENV = null } = process.env;
const isProduction = NODE_ENV === 'production';

const publicEnvKeys = Object.keys(process.env).filter((key) => key.startsWith('CLIENT__'));

const client = {
  entry: ['./src/view'],
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  output: {
    filename: 'b-[hash].js',
    hashDigestLength: 4,
    // iife: true,
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  plugins: [new webpack.EnvironmentPlugin(publicEnvKeys)],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

const server = {
  entry: {
    server: './src/server/prod-server.ts',
    serverApp: './src/server/koa/routes/defaultRoute/serverApp',
    template: './src/server/koa/routes/defaultRoute/template',
  },
  // experiments: {
  //   outputModule: true,
  // },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules\/(?!@rkta)/,
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
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
  plugins: [new webpack.EnvironmentPlugin(publicEnvKeys)],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [
    nodeExternals({
      whitelist: [/^@rkta\/.*/i],
    }),
  ],
};

module.exports = [client, server];
