const jsConfigs = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'import', 'jest'],
  rules: {
    'linebreak-style': 0,
    'import/no-unresolved': 'error',
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        endOfLine: 'auto',
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: true,
      },
      {
        usePrettierrc: false,
      },
    ],
  },
};

const tsOverride = {
  files: ['*.ts', '*.*.ts'],
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import', 'jest'],
  rules: {
    ...jsConfigs.rules,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
};

module.exports = {
  ...jsConfigs,
  overrides: [
    tsOverride,
  ],
};
