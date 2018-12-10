module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec)?)\\.ts?$',
  testMatch: null,
  testPathIgnorePatterns: ["/node_modules/", "./__tests__/index.ts"],
  bail: true,
  collectCoverage: true
};