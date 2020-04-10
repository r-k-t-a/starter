/* eslint-disable import/no-extraneous-dependencies */
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import path from 'path';
import webpack from 'webpack';
import { isDevelopment } from './src/server/dotenv';

const publicEnvKeys = Object.keys(process.env).filter((key) => key.startsWith('CLIENT__'));

export const client: webpack.Configuration = {
  entry: {
    main: ['./src/App'],
  },
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
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
} as webpack.Configuration;

const server = {
  entry: './src/server',
  experiments: {
    outputModule: true,
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false, // TODO remove when bug is fixed
  },
  output: {
    ecmaVersion: 2017,
    filename: 'server.js',
    libraryTarget: 'module',
    module: true,
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [new webpack.EnvironmentPlugin(publicEnvKeys)],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'node',
  externals: [nodeExternals()],
};

export default [client, server];
