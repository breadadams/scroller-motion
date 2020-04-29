const path = require('path')

module.exports = {
  addons: ['@storybook/preset-typescript', 'storybook-addon-jsx'],
  stories: ['../stories/**/*.stories.tsx'],
  webpackFinal: (config) => {
    config.resolve.alias = {
      '@': path.resolve('src')
    }

    return config
  }
}
