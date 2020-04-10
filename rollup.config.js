/* eslint-disable import/no-extraneous-dependencies */
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: './src/server/index.ts',
    external: (id) => !['.', '/'].includes(id.substring(0, 1)),
    output: [{ file: 'build/server.js', format: 'es' }],
    plugins: [commonjs(), typescript()],
  },
];
