/* eslint-disable import/no-extraneous-dependencies */
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';
import { EnvironmentPlugin } from 'webpack';
import dotenv from 'dotenv';

dotenv.config();

const publicEnvKeys = Object.keys(process.env).filter((key) => key.startsWith('CLIENT__'));

export default {
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
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
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
