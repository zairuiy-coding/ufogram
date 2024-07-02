const plugin = require("tailwindcss");

module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
      jest: true,
    },
    extends: 'airbnb',
    overrides: [
      {
        env: {
          node: true,
        },
        files: [
          '.eslintrc.{js,cjs}',
        ],
        parserOptions: {
          sourceType: 'script',
        },
      },
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: { // <-- Added ecmaFeatures to understand JSX
        jsx: true,
      },
    },
    plugins: ['import'],
    rules: {
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: ['**/*.test.js', '**/*.spec.js'], optionalDependencies: false, peerDependencies: false, packageDir: './',
      }],
    },
    settings: { // <-- Added settings to auto-detect React version
      react: {
        version: 'detect',
      },
    },
    globals: {
      PropTypes: 'readonly', // Define PropTypes as a global variable
    },
  };