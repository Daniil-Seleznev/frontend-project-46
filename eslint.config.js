// eslint.config.js
import stylisticPlugin from '@stylistic/eslint-plugin';

export default [
  {
    plugins: { stylistic: stylisticPlugin },
    rules: {
      'stylistic/indent': ['error', 2],
      'stylistic/no-trailing-spaces': 'error',
      'stylistic/eol-last': 'error',
      'no-undef': 'error',
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
      },
    },
  },
];
