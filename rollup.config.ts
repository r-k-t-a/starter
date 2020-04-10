/* eslint-disable import/no-extraneous-dependencies */
import autoExternal from 'rollup-plugin-auto-external';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: './src/server/index.ts',
    output: [{ file: 'build/server.js', format: 'es' }],
    plugins: [commonjs(), typescript(), autoExternal()],
  },
];
