module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:nuxt/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/vue'
  ],
  rules: {
    'vue/script-indent': ['warn', 2, {
      'baseIndent': 1
    }],
    'vue/no-v-html': 0
  }
}
