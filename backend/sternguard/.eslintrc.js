module.exports = {
	env: {
		node: true,
		commonjs: true,
		es2021: true,
		jest: true,
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		indent: [
			'error',
			'tab',
			{ 'SwitchCase': 1, ignoredNodes: ['ConditionalExpression *']  }
		],
		'no-mixed-spaces-and-tabs': 0,
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single',
			{ 'avoidEscape': true}
		],
		'semi': [
			'error',
			'always'
		]
	}
};
