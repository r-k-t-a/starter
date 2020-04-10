/* eslint-disable import/no-extraneous-dependencies */
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

const plugins = [
  commonjs({
    namedExports: {
      react: [
        'createFactory',
        'cloneElement',
        'Children',
        'Component',
        'useRef',
        'useContext',
        'useReducer',
        'useEffect',
        'useState',
        'createContext',
        'forwardRef',
        'createElement',
        'Fragment',
        'useMemo',
        'useCallback',
        'useLayoutEffect',
        'isValidElement',
      ],
      'react-is': ['isValidElementType'],
      'react-dom': ['createPortal', 'hydrate'],
    },
  }),
  typescript(),
];
const clentPlugins = [nodeResolve({ preferBuiltins: true }), ...plugins];

export default [
  {
    input: 'src/App/index.tsx',
    output: [
      {
        // dir: 'public',
        // entryFileNames: 'b-[hash].js',
        file: 'public/b-[hash].js',
        format: 'iife',
      },
    ],
    plugins: clentPlugins,
  },
  {
    input: './src/server/index.ts',
    external: (id) => !['.', '/'].includes(id.substring(0, 1)),
    output: [{ file: 'build/server.js', format: 'es' }],
    plugins,
  },
];
