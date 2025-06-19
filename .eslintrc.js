module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['projects/angular-ui/**/*'],
  plugins: ['@angular-eslint', 'header'],
  env: {
    es6: true,
    node: true
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.json']
      },
      rules: {
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/adjacent-overload-signatures': 'off',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array'
          }
        ],
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/member-ordering': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
        '@typescript-eslint/unbound-method': 'warn',
        '@typescript-eslint/await-thenable': 'warn',
        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/no-unused-vars': 'error',
        'prefer-const': 'error',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-misused-promises': 'warn',
        '@typescript-eslint/no-empty-interface': 'warn',
        'no-console': 'warn',
        'max-lines-per-function': ['warn', 180],
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        'header/header': [
          2,
          'block',
          [
            `\n * Copyright (c) ${new Date().getFullYear()} Ville de Montreal. All rights reserved.\n * Licensed under the MIT license.\n * See LICENSE file in the project root for full license information.\n `
          ]
        ]
      }
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      parserOptions: {
        project: ['tsconfig.json']
      },
      rules: {}
    }
  ],
  extends: ['plugin:storybook/recommended', 'prettier']
};
