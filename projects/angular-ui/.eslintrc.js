module.exports = {
  extends: '../../.eslintrc.js',
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: [
          'projects/angular-ui/tsconfig.lib.json',
          'projects/angular-ui/tsconfig.spec.json'
        ],
        createDefaultProgram: true
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'prefer-const': 'error'
      }
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      parserOptions: {
        project: ['projects/angular-ui/tsconfig.lib.json']
      },
      rules: {
        'header/header': 'off'
      }
    },
    {
      files: ['*.spec.ts'],
      rules: {
        'max-lines-per-function': 'off'
      }
    }
  ]
};
