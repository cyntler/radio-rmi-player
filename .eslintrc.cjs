require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: '@cyntler/eslint-config',
  parserOptions: { tsconfigRootDir: __dirname, project: ['./tsconfig.json'] },
  rules: {
    'no-param-reassign': 0,
  },
};
