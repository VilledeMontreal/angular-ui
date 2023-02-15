module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['projects/angular-ui/**/*'],
  plugins: ['@angular-eslint', 'header'],
  overrides: [
    {
      files: ['*.ts'],
      extends:
        './node_modules/@villedemontreal/lint-config/rules/eslint-angular.json',
      parserOptions: {
        project: ['tsconfig.json']
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
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
  extends: ['plugin:storybook/recommended']
};
