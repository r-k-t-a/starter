/* eslint-disable @typescript-eslint/no-var-requires */
const aliases = require('./module-alias')();

module.exports = {
  coverageDirectory: 'build/coverage',
  coveragePathIgnorePatterns: ['build/', 'node_modules/', 'public/'],
  moduleNameMapper: {
    'src/(.*)$': `${aliases.src}/$1`,
  },
  setupFilesAfterEnv: ['./src/test/enzymeSetup.ts'],
};
