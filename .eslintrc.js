const path = require('path');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: [ path.join(__dirname, 'src')],
      },
    },
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 7,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    indent: [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    quotes: [
      'error',
      'single',
    ],
    'no-console': [
      'off',
    ],
    'max-len': [
      'error',
      {
        code: 1500,
        ignoreTrailingComments: true,
      },
    ],
    'no-param-reassign': [
      'error', 
      { 
        'props': false,
      }
    ],
    'react/jsx-one-expression-per-line': [
      'off',
    ],
    'jsx-a11y/click-events-have-key-events': [
      'off',
    ],
    'jsx-a11y/no-static-element-interactions': [
      'off',
    ],
    'no-restricted-syntax': [
      'off'
    ],
  },
};
