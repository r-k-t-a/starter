const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
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
  },
  plugins: [new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['b-*.js'] })],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
