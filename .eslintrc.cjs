module.exports = {
  extends: ['alloy', 'alloy/typescript', 'prettier'],
  env: {
    node: true,
  },
  'import/order': [
    'warn',
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
    },
  ],
};
