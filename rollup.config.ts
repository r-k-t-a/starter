/* eslint-disable import/no-extraneous-dependencies */
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/server/index.ts',
  output: [{ file: 'build/server.js' }],
  plugins: [commonjs(), typescript()],
};
