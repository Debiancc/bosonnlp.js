module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "**/__tests__/*.spec.ts"
  ],
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/*.ts"
  ]
};