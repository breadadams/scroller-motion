module.exports = {
  addons: ['@storybook/addon-links/register', 'storybook-addon-jsx'],
  stories: ['../stories/**/*.stories.tsx'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    })

    return config
  }
}
