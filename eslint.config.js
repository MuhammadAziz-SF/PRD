import { readFileSync } from 'fs';

import eslintPluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';

const prettierConfig = JSON.parse(readFileSync('./.prettierrc.json', 'utf8'));

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: true,
        process: true,
        __dirname: true,
      },
    },
    plugins: {
      import: eslintPluginImport,
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error', prettierConfig],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'always',
        },
      ],
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
