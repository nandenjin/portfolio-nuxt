module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint', 
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/@typescript-eslint',
  ],{
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    indent: 'off',
    'vue/script-indent': ['warn', 2, {
      baseIndent: 1
    }],
    'vue/no-v-html': 0,
    'prettier/prettier': ['error', 
      semi: false,
      arrowParens: 'avoid'
      singleQuote: true,
    }]
  }
}
