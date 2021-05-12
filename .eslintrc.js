module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'react', 'deprecation', 'functional'],
  extends: [
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
  ],
  rules: {
    'no-unused-vars': 1,
    'no-shadow': 0,
    'import/no-deprecated': 1,
    'functional/immutable-data': 'warn',
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'no-useless-escape': 0,
    '@typescript-eslint/camelcase': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
}
