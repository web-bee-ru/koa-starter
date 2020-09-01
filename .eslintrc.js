//
// @README:
// Turn on "Automatic ESLint configuration" under Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint.
//

module.exports = {
  extends: ['airbnb-typescript'],
  root: true,
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }], // варны и эрроры - ок
  },
};
