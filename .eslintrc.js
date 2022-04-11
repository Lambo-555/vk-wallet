module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'function-paren-newline': 0,
    'react/prop-types': 0,
    'react/jsx-wrap-multilines': 0,
    'operator-linebreak': 0,
    'react/destructuring-assignment': 0,
    ImportDeclaration: 0,
    'react/jsx-filename-extension': 0,
    'react/function-component-definition': 0,
    'no-tabs': 0,
    indent: 0,
    'react/jsx-indent': 0,
    'no-param-reassign': 0,
    'react/jsx-indent-props': 0,
  },
};
