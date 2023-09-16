module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    // import
    'import/no-unresolved': 'off',
    'import/no-named-as-default-member': 'off', // React. 으로 사용 못해서 off
    'import/default': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'unknown',
        ],
        pathGroups: [
          {
            pattern: '{react*,react*/**}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '~/pages/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~/components/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~/hooks/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~/lib/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~/stores/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~/assets/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~/constants/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react*'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
