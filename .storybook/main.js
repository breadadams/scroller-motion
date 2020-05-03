const path = require('path')

module.exports = {
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-links/register',
    'storybook-addon-jsx'
  ],
  stories: ['../stories/**/*.stories.tsx'],
  webpackFinal: (config) => {
    config.resolve.alias = {
      '@': path.resolve('src')
    }

    return config
  }
}
