module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**',
  ],
  coverageDirectory: '__tests__/coverage',
  testPathIgnorePatterns: [
    '__tests__/coverage/',
    'dist/',
  ],
};
