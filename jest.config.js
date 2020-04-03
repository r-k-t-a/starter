module.exports = {
  coverageDirectory: 'build/coverage',
  coveragePathIgnorePatterns: ['build/', 'node_modules/', 'public/'],
  setupFilesAfterEnv: ['./src/jest/enzymeSetup.ts'],
  transform: {
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '.*': 'babel-jest',
  },
};
