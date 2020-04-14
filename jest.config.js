module.exports = {
  coverageDirectory: 'build/coverage',
  coveragePathIgnorePatterns: ['build/', 'node_modules/', 'public/'],
  setupFilesAfterEnv: ['./src/jest/enzymeSetup.ts'],
  transform: {
    '.*': 'ts-jest',
  },
};
