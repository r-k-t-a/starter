module.exports = {
  coverageDirectory: 'build/coverage',
  coveragePathIgnorePatterns: ['build/', 'node_modules/', 'public/'],
  setupFilesAfterEnv: ['./src/test/enzymeSetup.ts'],
};
