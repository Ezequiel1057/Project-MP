module.exports = {
    env: {
      node: true,
      jest: true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      'prefer-promise-reject-errors': 'off',
      'no-console': ['error', { allow: ['info'] }],
      'prettier/prettier': 'error',
      'class-methods-use-this': 'off',
      'no-param-reassign': 'off',
      camelcase: 'off',
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_|next', varsIgnorePattern: '^_' },
      ],
    },
  };