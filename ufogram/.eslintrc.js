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
  rules: {
  },
  settings: { // <-- Added settings to auto-detect React version
    react: {
      version: 'detect',
    },
  },
};
