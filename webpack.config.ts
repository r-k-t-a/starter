/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import { StatsWriterPlugin } from 'webpack-stats-plugin';
import path from 'path';
import webpack, { Configuration } from 'webpack';
import dotenv from 'dotenv';

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
  plugins: [
    new webpack.EnvironmentPlugin(publicEnvKeys),
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['b-*.js', 'b-*.txt'] }),
    new StatsWriterPlugin({
      filename: '../build/stats.json',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

const buildDir = path.resolve(__dirname, isProduction ? 'build' : '.dev');

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
    path: buildDir,
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

export default [client, server] as Configuration[];
