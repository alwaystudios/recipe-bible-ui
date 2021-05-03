module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'functional', 'deprecation', 'import', 'react'],
	extends: [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	rules: {
		'react/prop-types': 'off',
		'import/no-anonymous-default-export': 'off',
		'array-bracket-spacing': [2, 'never'],
		'object-curly-spacing': [2, 'always'],
		'import/no-duplicates': 'error',
		'import/no-unresolved': 'error',
		'import/first': 'error',
		'import/no-mutable-exports': 'error',
		'functional/no-let': 'error',
		'functional/immutable-data': 'warn',
		'newline-before-return': 'error',
		'no-mixed-spaces-and-tabs': 'error',
		'no-multi-spaces': 'error',
		'no-multiple-empty-lines': ['error', { max: 1 }],
		'no-restricted-exports': ['error', { restrictedNamedExports: ['default'] }],
		'no-shadow': ['error', { builtinGlobals: true, hoist: 'functions', allow: [] }],
		'no-useless-escape': 1,
		'prefer-const': 'error',
		'prefer-destructuring': ['warn', { object: true, array: false }],
		quotes: ['error', 'single', { avoidEscape: true }],
		'@typescript-eslint/no-explicit-any': 1,
		'@typescript-eslint/no-non-null-assertion': 2,
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-extra-semi': 'error',
	},
	env: { node: true, jest: true },
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},
	overrides: [
		{
			files: ['*.test.ts'],
			rules: {
				'@typescript-eslint/no-explicit-any': 0,
				'@typescript-eslint/no-non-null-assertion': 0,
			},
		},
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
}
