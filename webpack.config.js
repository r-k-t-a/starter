/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

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
  plugins: [new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['b-*.js'] })],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
