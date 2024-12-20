module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    // TypeScript-specific rules
    // '@typescript-eslint/explicit-function-return-type': 'error',
    // '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // React-specific rules
    'react/prop-types': 'off',

    // General best practices
    eqeqeq: 'error',
    'no-console': 'warn',
    'no-unused-vars': 'off',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    indent: ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],

    // Custom rule from your original configuration
    'react/react-in-jsx-scope': 0,
  },
};
