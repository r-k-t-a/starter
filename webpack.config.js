/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: ['./src/react/index.tsx']
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'b-[hash].js',
    hashDigestLength: 4,
    path: path.resolve(__dirname, 'public/bundle'),
    publicPath: '/bundle'
  },
  plugins: [new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['b-*.js'] })],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
