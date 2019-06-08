module.exports = {
  'root': true,
  'parserOptions': {
    'parser': 'babel-eslint',
    'sourceType': 'module'
  },
  'extends': [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  'rules': {
    'indent': 'off',
    'vue/script-indent': ['warn', 2, {
      'baseIndent': 1
    }]
  }
}
