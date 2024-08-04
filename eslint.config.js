import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import pluginJs from '@eslint/js'

export default [
  { ignores: ['coverage/*', 'node_modules/*', 'build/*'] },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 1,
      '@typescript-eslint/no-unused-vars': 1,
      '@typescript-eslint/no-var-requires': 1,
      'no-useless-catch': 1,
      'prefer-const': 2,
      'import/extensions': 0,
      'import/no-mutable-exports': 0,
      'import/no-unresolved': 0,
      'import/order': 0,
      'import/no-cycle': 1,
      'import/first': 2,
      'import/newline-after-import': 2,
      'import/no-duplicates': 2,
      'import/no-empty-named-blocks': 2,
      'import/no-self-import': 2,
    },
  },
]
