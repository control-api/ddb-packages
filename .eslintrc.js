module.exports = {
  'env': {
    'node': true,
  },
  'extends': [
    'google',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'ignorePatterns': ['lib/', 'node_modules/'],
  'rules': {
    'no-multi-spaces': ['error'],
    'require-jsdoc': ['off'],
    'no-empty-function': ['off'],
    'max-len': ['error', {'code': 100}],
    'no-multiple-empty-lines': ['error', {'max': 1}],
    'prefer-destructuring': [
      'error',
      {array: false, object: true},
      {enforceForRenamedProperties: false},
    ],
    'sort-imports': ['error', {
      'ignoreCase': false,
      'ignoreDeclarationSort': true,
      'ignoreMemberSort': false,
      'allowSeparatedGroups': false,
    }],
  },
};
