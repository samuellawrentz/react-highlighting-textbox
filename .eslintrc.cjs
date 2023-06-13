module.exports = {
  extends: ['react-app', 'react-app/jest', 'plugin:react/recommended', 'plugin:prettier/recommended', 'plugin:storybook/recommended'],
  plugins: ['react', 'prettier'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'newline-before-return': 'error',
    'react/prop-types': 'off',
    'import/no-anonymous-default-export': 0,
  },
};
