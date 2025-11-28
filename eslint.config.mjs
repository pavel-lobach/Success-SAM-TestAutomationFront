import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginStylistic from '@stylistic/eslint-plugin';
import pluginImport from 'eslint-plugin-import';

export default [
  {
    ignores: [
      '.aws-sam/',
      '**/tests/',
    ],
  },
  {
    files: ['**/*.mjs'],
    plugins: {
      '@stylistic': pluginStylistic,
      'import': pluginImport,
    },
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      'no-unused-vars': [
        'error', {
          args: 'none',
          vars: 'all',
          caughtErrors: 'none',
          ignoreRestSiblings: false,
        },
      ],
      'no-console': 'off',
      'consistent-return': 'error',
      'no-promise-executor-return': 'error',
      'prefer-promise-reject-errors': 'off',
      'arrow-body-style': [
        'error',
        'as-needed',
      ],
      'no-param-reassign': [
        'error',
        {
          'props': false,
        },
      ],
      'no-plusplus': 'off',
      'no-nested-ternary': 'off',
      'object-shorthand': [
        'error',
        'always',
      ],

      // @stylistics
      '@stylistic/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 'first',
          outerIIFEBody: 1,
          FunctionDeclaration: { parameters: 'first' },
          FunctionExpression: { parameters: 'first' },
        },
      ],
      '@stylistic/no-trailing-spaces': [
        'error',
        {
          skipBlankLines: false,
          ignoreComments: false,
        },
      ],
      '@stylistic/no-multi-spaces': [
        'error',
        {
          ignoreEOLComments: true,
        },
      ],
      '@stylistic/quotes': [
        'error',
        'single',
      ],
      '@stylistic/comma-dangle': [
        'error', {
          'arrays': 'always-multiline',
          'objects': 'always-multiline',
          'imports': 'always-multiline',
          'exports': 'always-multiline',
          'functions': 'always-multiline',
        },
      ],
      '@stylistic/object-curly-newline': [
        'error', {
          'ObjectExpression': {
            'consistent': true,
          },
          'ObjectPattern': {
            'consistent': true,
          },
          'ImportDeclaration': {
            'consistent': true,
          },
          'ExportDeclaration': {
            'multiline': true,
            'minProperties': 3,
          },
        },
      ],
      '@stylistic/object-property-newline': [
        'error', {
          'allowAllPropertiesOnSameLine': true,
        },
      ],
      '@stylistic/semi': [
        'error',
        'always',
      ],
      '@stylistic/eol-last': [
        'error',
        'always',
      ],
      '@stylistic/keyword-spacing': [
        'error', {
          'before': true,
          'after': true,
        },
      ],
      '@stylistic/space-before-function-paren': [
        'error', {
          'anonymous': 'never',
          'named': 'never',
          'asyncArrow': 'always',
          'catch': 'always',
        },
      ],
      '@stylistic/space-before-blocks': [
        'error',
        'always',
      ],

      // imports
      ...pluginImport.configs.recommended.rules,
      'import/order': [
        'error', {
          'groups': [
            // First builtins imports
            'builtin',
            // Then external imports
            'external',
            // Then internal imports
            'internal',
          ],
        },
      ],
      'import/no-unresolved': [
        'error', {
          'commonjs': true,
          'amd': true,
          ignore: ['^@aws-sdk/'],
        },
      ],
    },
  },
];
