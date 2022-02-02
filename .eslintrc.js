module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',

  plugins: [
    'react',
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],


  settings: {
    react: {
      version: 'detect'
    }
  }
};
