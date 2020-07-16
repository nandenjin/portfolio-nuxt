module.exports = {
  'root': true,
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: [
    'prettier'
  ],
  'rules': {
    'prettier/prettier': ['error', {
      semi: false,
      singleQuote: true,
      arrowParens: 'avoid'
    }]
  }
}
