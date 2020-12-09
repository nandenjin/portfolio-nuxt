module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/vue'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'import/order': 'error'
  }
}
