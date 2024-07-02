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
      ecmaFeatures: { 
        jsx: true,
      },
    },
    plugins: ['import'],
    rules: {
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: ['**/*.test.js', '**/*.spec.js'], optionalDependencies: false, peerDependencies: false, packageDir: './',
      }],
    },
    settings: { 
      react: {
        version: 'detect',
      },
    },
    globals: {
      PropTypes: 'readonly',
    },
  };
  