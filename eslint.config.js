import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import eslint from '@eslint/js'

export default tseslint.config({
  ignores: ['coverage', 'node_modules', 'build'],
  extends: [eslint.configs.recommended, ...tseslint.configs.recommended, importPlugin.flatConfigs.recommended],

  // files: ['**/*.{tsx,ts}'],

  plugins: {
    '@typescript-eslint': tseslint.plugin,
    prettier: prettierPlugin,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: './tsconfig.json',
    },
    globals: { ...globals.node, ...globals.es2025 },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    ...eslintConfigPrettier.rules,
    'consistent-return': 'error',
    'no-fallthrough': 'error',
    'no-unused-labels': 'error',
    'no-useless-catch': 'error',
    'no-unreachable': 'error',
    'prefer-const': 2,
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/extensions': 0,
    'import/no-mutable-exports': 0,
    'import/no-unresolved': 0,
    'import/order': 0,
    'import/no-cycle': 1,
    'import/first': 2,
    'import/newline-after-import': 1,
    'import/no-duplicates': 2,
    'import/no-empty-named-blocks': 2,
    'import/no-self-import': 2,
  },
})
