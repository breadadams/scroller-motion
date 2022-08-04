const { defaults } = require('jest-config')

module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',

  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, './dist']
}
