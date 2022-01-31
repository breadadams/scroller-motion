module.exports = (api) => {
  const isTest = api.env('test')

  const plugins = [['@babel/plugin-proposal-optional-chaining']]

  if (isTest) {
    return {
      plugins,
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript'
      ]
    }
  }

  return { plugins }
}
