const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'warn',
      'consistent-return': 'warn',
      'prefer-for-of': 'error',
    },
  },
];
