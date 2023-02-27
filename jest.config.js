const { defaults } = require('jest-config')

module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',

  setupFilesAfterEnv: ['./jestSetup.ts'],

  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, './dist']
}
