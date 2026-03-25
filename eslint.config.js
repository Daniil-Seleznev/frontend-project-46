// eslint.config.js
import stylisticPlugin from '@stylistic/eslint-plugin'
export default [
  {
    plugins: { stylistic: stylisticPlugin },
    rules: {
      // Stylistic fixes
      'stylistic/indent': ['error', 2],
      'stylistic/no-trailing-spaces': 'error',
      'stylistic/eol-last': 'error',
      'stylistic/quote-props': ['error', 'as-needed'],
      'stylistic/semi': ['error', 'never'], // удаляет лишние точки с запятой
      'stylistic/quotes': ['error', 'single'], // все строки в одинарных кавычках
      'stylistic/comma-dangle': ['error', 'always-multiline'], // следит за запятыми
      'stylistic/no-multiple-empty-lines': ['error', { max: 0 }],
      'stylistic/no-multi-spaces': 'error',
      'stylistic/arrow-parens': ['error', 'as-needed'],
      // General
      'no-undef': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // игнорировать _args
      'no-redeclare': 'error',
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
        console: 'readonly',
        test: 'readonly', // добавляем глобалы Vitest
        expect: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
  },
]
