module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:nuxt/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/vue',
  ],
  rules: {},
}
