/* eslint-disable import/no-extraneous-dependencies */
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

const plugins = [commonjs(), typescript()];
const clentPlugins = [nodeResolve(), ...plugins];

export default [
  {
    input: 'src/App/index.tsx',
    output: [{ file: 'public/b-[hash].js', format: 'iife' }],
    plugins: clentPlugins,
  },
  {
    input: './src/server/index.ts',
    external: (id) => !['.', '/'].includes(id.substring(0, 1)),
    output: [{ file: 'build/server.js', format: 'es' }],
    plugins,
  },
];
